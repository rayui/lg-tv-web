import { SerialPort, ReadlineParser } from "serialport";
import Queue from "promise-queue";

const DEFAULT_TV_ID = "00";
const BAUD_RATE = 9600;
const GET_BYTE = "FF";
const RESPONSE_LINE_DELIM = "x";
const TRUE_BYTE = "01";
const FALSE_BYTE = "00";
const LINE_END = "\r";
const FIELD_SEPARATOR = String.fromCharCode(0x20); //space

const INVALID_STATE_MESSAGE = "Invalid state";

const MAX_CONCURRENT = 1;
const MAX_QUEUE = Infinity;

const enum CTYPE {
  "BOOL",
  "NUMBER",
  "DBL_WORD",
  "NULL",
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

type TVId = number | null;

const commands: Commands = {
  power: { cmd: CMD.power, type: CTYPE.BOOL },
  aspect_ratio: { cmd: CMD.aspect_ratio, type: CTYPE.NULL },
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
  auto: { cmd: CMD.auto, type: CTYPE.NULL },
  tune: { cmd: CMD.tune, type: CTYPE.NULL },
  programme: { cmd: CMD.programme, type: CTYPE.BOOL },
  key: { cmd: CMD.key, type: CTYPE.NULL },
  backlight: { cmd: CMD.backlight, type: CTYPE.NUMBER },
  input: { cmd: CMD.input, type: CTYPE.NUMBER },
  ism: { cmd: CMD.ism, type: CTYPE.NUMBER },
};

const getTVID = (tvID: TVId) => {
  return tvID ? tvID.toString(16) : DEFAULT_TV_ID;
};

const createLineBoolean = (tv: TVId, command: CMD, value: string): string => {
  const validateBoolean = (state: string) => {
    const inputState = parseInt(state, 10);
    if (isNaN(inputState) || (inputState !== 1 && inputState !== 0))
      throw new Error(INVALID_STATE_MESSAGE);

    return inputState !== 0 ? TRUE_BYTE : FALSE_BYTE;
  };

  return `${command} ${getTVID(tv)} ${validateBoolean(value)}`;
};

const createLineNumber = (tv: TVId, command: CMD, value: string): string => {
  const validateNumber = (state: string) => {
    const inputState = parseInt(state, 10);
    if (isNaN(inputState)) throw new Error(INVALID_STATE_MESSAGE);
    return inputState.toString(16);
  };

  return `${command} ${getTVID(tv)} ${validateNumber(value)}`;
};

const createLineDoubleWord = (
  tv: TVId,
  command: CMD,
  value: string
): string => {
  const validateHighAndLowWords = (state: string) => {
    const [highWord, lowWord] = state
      .split(FIELD_SEPARATOR)
      .map((value) => parseInt(value, 10));

    if (isNaN(highWord)) throw new Error(INVALID_STATE_MESSAGE);
    if (isNaN(lowWord)) throw new Error(INVALID_STATE_MESSAGE);

    return (highWord << 4) + lowWord;
  };

  return `${command} ${getTVID(tv)} ${validateHighAndLowWords(value)}`;
};

const createLineNull = (tv: TVId, command: CMD): string => {
  if (command === CMD.auto) {
    return `${command} ${getTVID(tv)} ${TRUE_BYTE}`;
  }

  //aspect ratio
  //tune
  //key
  //etc

  return "";
};

const createLineRead = (tv: TVId, command: CNM): string => {
  return `${command} ${getTVID(tv)} ${GET_BYTE}`;
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
    case CTYPE.DBL_WORD:
      line = createLineDoubleWord(tvID, cmd, value);
      break;
    default:
      line = createLineNull(tvID, cmd);
  }

  return line;
};

const send = (port: SerialPort, parser: ReadlineParser, str: string) => {
  return new Promise<string>((resolve: Function, reject: Function) => {
    parser.once("data", (data) => {
      resolve(data);
    });
    port.write(str + LINE_END, (err: Error | null | undefined) => {
      if (err) {
        reject(err);
        return;
      }
      port.drain();
    });
  });
};

const processTVResponse = (response: string) => {
  const regex = /. \d+ (..)(.*)/;

  const found = response.match(regex);
  if (found) {
    return { status: found[1], result: found[2] };
  } else {
    throw new Error(`Unexpected Response [${response}]`);
  }
};

export class LGTV {
  serialPort: SerialPort;
  parser: ReadlineParser;
  queue: Queue = new Queue(MAX_CONCURRENT, MAX_QUEUE);

  constructor(path: string) {
    this.serialPort = new SerialPort({ path: path, baudRate: BAUD_RATE });
    this.parser = this.serialPort.pipe(
      new ReadlineParser({ delimiter: RESPONSE_LINE_DELIM })
    );
  }

  enqueue(line: string) {
    return this.queue
      .add(() => {
        return send(this.serialPort, this.parser, line);
      })
      .then((response: string) => {
        return processTVResponse(response);
      });
  }

  set(command: CNM, value: string, tvID: TVId = null) {
    const line = createLine(tvID, command, value);

    if (line) return this.enqueue(line);

    throw new Error(`Invalid command and value ${command} ${value}`);
  }

  get(command: CNM, tvID: TVId = null) {
    const line = createLineRead(tvID, command);

    if (line) return this.enqueue(line);

    throw new Error(`Invalid command ${command}`);
  }
}
