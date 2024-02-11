import { SerialPort, ReadlineParser } from "serialport";
import Queue from "promise-queue";

const DEFAULT_TV_ID = 0;
const BAUD_RATE = 9600;
const GET_BYTE = "FF";
const RESPONSE_LINE_DELIM = "x";
const TRUE_BYTE = "01";
const FALSE_BYTE = "00";
const LINE_END = "\r";
const QUEUE_TIMEOUT = 10 * 1000;
const KEEPALIVE_INTERVAL = 60 * 1000;
const RETRY_OPEN_INTERVAL = 10 * 1000;

const MSG_INVALID_INPUT = "Invalid input";
const MSG_UNEXPECTED_RESPONSE = "Unexpected response";
const MSG_TIMEOUT_REJECT = "Command timeout: no response from TV";
const MSG_UNKNOWN = "Unknown error";

const MAX_CONCURRENT = 1;
const MAX_QUEUE = Infinity;

const enum CTYPE {
  "BOOL",
  "NUMBER",
  "KEY",
  "DOUBLE",
  "TRIPLE",
  "QUAD",
}

export const enum CNM {
  power = "power",
  aspect_ratio = "aspect_ratio",
  screen_mute = "screen_mute",
  volume_mute = "volume_mute",
  volume_control = "volume_control",
  contrast = "contrast",
  brightness = "brightness",
  colour = "colour",
  tint = "tint",
  sharpness = "sharpness",
  osd = "osd",
  remote = "remote",
  treble = "treble",
  bass = "bass",
  balance = "balance",
  temperature = "temperature",
  energy = "energy",
  auto = "auto",
  tune = "tune",
  programme = "programme",
  key = "key",
  backlight = "backlight",
  input = "input",
  ism = "ism",
}

const enum CMD {
  power = "ka",
  aspect_ratio = "kc",
  screen_mute = "kd",
  volume_mute = "ke",
  volume_control = "kf",
  contrast = "kg",
  brightness = "kh",
  colour = "ki",
  tint = "kj",
  sharpness = "kk",
  osd = "kl",
  remote = "km",
  treble = "kr",
  bass = "ks",
  balance = "kt",
  temperature = "xu",
  energy = "jq",
  auto = "ju",
  tune = "ma",
  programme = "mb",
  key = "mc",
  backlight = "mg",
  input = "xb",
  ism = "jp",
}

type Command = { cmd: CMD; type: CTYPE };
type Commands = { [key in CNM]: Command };

type TVId = number;

export type LGTVResult = {
  status: string;
  result: number;
};

const commands: Commands = {
  power: { cmd: CMD.power, type: CTYPE.BOOL },
  aspect_ratio: { cmd: CMD.aspect_ratio, type: CTYPE.NUMBER },
  screen_mute: { cmd: CMD.screen_mute, type: CTYPE.BOOL },
  volume_mute: { cmd: CMD.volume_mute, type: CTYPE.BOOL },
  volume_control: { cmd: CMD.volume_control, type: CTYPE.NUMBER },
  contrast: { cmd: CMD.contrast, type: CTYPE.NUMBER },
  brightness: { cmd: CMD.brightness, type: CTYPE.NUMBER },
  colour: { cmd: CMD.colour, type: CTYPE.NUMBER },
  tint: { cmd: CMD.tint, type: CTYPE.NUMBER },
  sharpness: { cmd: CMD.sharpness, type: CTYPE.NUMBER },
  osd: { cmd: CMD.osd, type: CTYPE.BOOL },
  remote: { cmd: CMD.remote, type: CTYPE.BOOL },
  treble: { cmd: CMD.treble, type: CTYPE.NUMBER },
  bass: { cmd: CMD.bass, type: CTYPE.NUMBER },
  balance: { cmd: CMD.balance, type: CTYPE.NUMBER },
  temperature: { cmd: CMD.temperature, type: CTYPE.NUMBER },
  energy: { cmd: CMD.energy, type: CTYPE.NUMBER },
  auto: { cmd: CMD.auto, type: CTYPE.BOOL },
  tune: { cmd: CMD.tune, type: CTYPE.TRIPLE },
  programme: { cmd: CMD.programme, type: CTYPE.BOOL },
  key: { cmd: CMD.key, type: CTYPE.KEY },
  backlight: { cmd: CMD.backlight, type: CTYPE.NUMBER },
  input: { cmd: CMD.input, type: CTYPE.NUMBER },
  ism: { cmd: CMD.ism, type: CTYPE.NUMBER },
};

const getTVID = (tvID: TVId) => {
  return tvID.toString(16);
};

const createLineBoolean = (tv: TVId, command: CMD, value: string): string => {
  const validateBoolean = (state: string) => {
    const inputState = parseInt(state, 10);
    if (isNaN(inputState) || (inputState !== 1 && inputState !== 0))
      throw new Error(MSG_INVALID_INPUT);

    return inputState !== 0 ? TRUE_BYTE : FALSE_BYTE;
  };

  return `${command} ${getTVID(tv)} ${validateBoolean(value)}`;
};

const createLineNumber = (tv: TVId, command: CMD, value: string): string => {
  const validateNumber = (state: string) => {
    const inputState = parseInt(state, 10);
    if (isNaN(inputState)) throw new Error(MSG_INVALID_INPUT);
    return inputState.toString(16);
  };

  return `${command} ${getTVID(tv)} ${validateNumber(value)}`;
};

const createLineRead = (tv: TVId, command: CNM): string => {
  return `${commands[command].cmd} ${getTVID(tv)} ${GET_BYTE}`;
};

const createLine = (tvID: TVId, command: CNM, value: string) => {
  const { type, cmd } = commands[command];
  let line = "";

  switch (type) {
    case CTYPE.BOOL:
      line = createLineBoolean(tvID, cmd, value);
      break;
    case CTYPE.NUMBER:
      line = createLineNumber(tvID, cmd, value);
      break;
  }

  return line;
};

const send = (port: SerialPort, parser: ReadlineParser, str: string) => {
  return new Promise<string>((resolve: Function, reject: Function) => {
    console.log(`Sending command: ${str}`);

    const resolver = (data: string) => {
      try {
        console.log(`Received data: ${data}`);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };

    if (port.isOpen) {
      port.flush((err) => {
        if (err) {
          reject(err);
        } else {
          parser.once("data", resolver);

          port.write(str + LINE_END, (err: Error | null | undefined) => {
            if (err) {
              reject(err);
            } else {
              port.drain((err) => {
                if (err) {
                  reject(err);
                }
              });
            }
          });
        }
      });
    } else {
      reject(new Error("Serial port not open!"));
    }
  });
};

const processTVResponse = (response: string): LGTVResult => {
  const regex = /. \d+ (..)(.*)/;

  const found = response.match(regex);
  if (found) {
    return { status: found[1], result: parseInt(found[2], 16) };
  } else {
    throw new Error(`${MSG_UNEXPECTED_RESPONSE} [${response}]`);
  }
};

const createSerialPort = (path: string) => {
  return new SerialPort({ path: path, baudRate: BAUD_RATE }, (err) => {
    if (err) {
      console.log(new Error(`Serial port at ${path} cannot be opened`));
    }
  });
};

const createParser = (serialPort: SerialPort | undefined) => {
  return serialPort
    ? serialPort.pipe(new ReadlineParser({ delimiter: RESPONSE_LINE_DELIM }))
    : undefined;
};

const enqueue = (
  serialPort: SerialPort | undefined,
  parser: ReadlineParser | undefined,
  queue: Queue,
  line: string
) => {
  return new Promise<LGTVResult>((resolve, reject) => {
    if (!serialPort || !serialPort.isOpen) {
      reject(new Error("Cannot enqueue command; serial port is not open"));
    } else if (!parser) {
      reject(new Error("Cannot enqueue command; parser is not ready"));
    } else {
      return queue.add(() => {
        console.log(`Enqueing command: ${line}`);

        const timer = new Promise((_, rejectInner) => {
          setTimeout(() => {
            rejectInner(new Error(MSG_TIMEOUT_REJECT));
          }, QUEUE_TIMEOUT);
        });

        return Promise.race([timer, send(serialPort, parser, line)])
          .then((response: string | unknown) => {
            if (typeof response !== "string") {
              throw new Error(MSG_UNKNOWN);
            }
            const data = processTVResponse(response);
            console.log(`Returning data: ${JSON.stringify(data)}`);
            resolve(data);
          })
          .catch((err) => {
            console.log(`Send command failed!: ${line}`);
            reject(err);
          });
      });
    }
  });
};

const serialPortClosedHandler = () => {};

export class LGTV {
  serialPort: SerialPort | undefined;
  parser: ReadlineParser | undefined;
  keepAliveInterval: NodeJS.Timer | undefined = undefined;
  queue: Queue;
  path: string;

  constructor(path: string) {
    this.path = path;
    this.setupSerialPort();
    this.queue = new Queue(MAX_CONCURRENT, MAX_QUEUE);
  }

  setupSerialPort() {
    if (!this.serialPort || !this.serialPort.isOpen) {
      //programatically reset the usb device

      this.serialPort = createSerialPort(this.path);

      if (this.serialPort) {
        this.serialPort.on("open", () => {
          console.log(`Serial port opened!`);
          console.log(`Creating parser`);
          this.parser = createParser(this.serialPort);

          console.log(`Creating keepAlive poller`);
          this.keepAliveInterval = setInterval(
            this.keepAlive.bind(this),
            KEEPALIVE_INTERVAL
          );
        });

        this.serialPort.on("close", () => {
          console.log(`Serial port closed, destroying!`);
          this.serialPort = undefined;
          console.log(`Destroying parser`);
          this.parser = undefined;
          console.log(`Destroying keepalive`);
          clearInterval(this.keepAliveInterval);

          throw new Error("Serial port closed, exiting app");
        });

        this.serialPort.on("error", (err) => {
          console.log(`Serial port error! ${err}`);
        });
      } else {
        console.log(
          `Serial port could not be opened! Trying to reopen in ${
            RETRY_OPEN_INTERVAL / 1000
          } seconds...`
        );
        this.serialPort = undefined;
      }
    }
  }

  keepAlive() {
    enqueue(
      this.serialPort,
      this.parser,
      this.queue,
      createLineRead(DEFAULT_TV_ID, CNM.power)
    ).catch((err) => {
      console.error(err);
    });
  }

  set(command: CNM, value: string, tvID: TVId = DEFAULT_TV_ID) {
    return enqueue(
      this.serialPort,
      this.parser,
      this.queue,
      createLine(tvID, command, value)
    );
  }

  get(command: CNM, tvID: TVId = DEFAULT_TV_ID) {
    return enqueue(
      this.serialPort,
      this.parser,
      this.queue,
      createLineRead(tvID, command)
    );
  }
}
