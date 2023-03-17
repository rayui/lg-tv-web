import { SerialPort, ReadlineParser } from "serialport";

const DEFAULT_TV_ID = "00";
const BAUD_RATE = 9600;
const GET_BYTE = "FF";
const RESPONSE_LINE_DELIM = "x";
const TRUE_BYTE = "01";
const FALSE_BYTE = "00";
const LINE_END = "\r";

type Commands = { [index: string]: any[] };
type CommandId = string;
type CommandValue = boolean | number | null;

type TVId = number | null;

const getTVID = (tvID: TVId) => {
  return tvID ? tvID.toString(16) : DEFAULT_TV_ID;
};

const createLineBoolean = (
  tv: TVId,
  command: CommandId,
  value: boolean
): string => {
  const c = _commands[command];

  return `${c[0]}${c[1]} ${getTVID(tv)} ${value ? TRUE_BYTE : FALSE_BYTE}`;
};

const createLineNumber = (
  tv: TVId,
  command: CommandId,
  value: number
): string => {
  const c = _commands[command];
  return `${c[0]}${c[1]} ${getTVID(tv)} ${value.toString(16)}`;
};

const createLineNull = (tv: TVId, command: CommandId, _value: any): string => {
  const c = _commands[command];
  if (command === "auto") {
    return `${c[0]}${c[1]} ${getTVID(tv)} ${TRUE_BYTE}`;
  }

  //aspect ratio
  //tune
  //key
  //etc

  return "";
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

const _commands: Commands = {
  power: ["k", "a", createLineBoolean],
  aspect_ratio: ["k", "c", createLineNull],
  screen_mute: ["k", "d", createLineBoolean],
  volume_mute: ["k", "e", createLineBoolean],
  volume_control: ["k", "f", createLineNumber],
  contrast: ["k", "g", createLineNumber],
  brightness: ["k", "h", createLineNumber],
  colour: ["k", "i", createLineNumber],
  tint: ["k", "j", createLineNumber],
  sharpness: ["k", "k", createLineNumber],
  osd: ["k", "l", createLineBoolean],
  remote: ["k", "m", createLineBoolean],
  treble: ["k", "r", createLineNumber],
  bass: ["k", "s", createLineNumber],
  balance: ["k", "t", createLineNumber],
  temperature: ["x", "u", createLineNumber],
  energy: ["j", "q", createLineNumber],
  auto: ["j", "u", createLineNull],
  tune: ["m", "a", createLineNull],
  programme: ["m", "b", createLineBoolean],
  key: ["m", "c", createLineNull],
  backlight: ["m", "g", createLineNumber],
  input: ["x", "b", createLineNumber],
};

export class LGTV {
  serialPort: SerialPort;
  parser: ReadlineParser;

  constructor(path: string) {
    this.serialPort = new SerialPort({ path: path, baudRate: BAUD_RATE });
    this.parser = this.serialPort.pipe(
      new ReadlineParser({ delimiter: RESPONSE_LINE_DELIM })
    );
  }

  send(str: string) {
    return new Promise<string>((resolve: Function, reject: Function) => {
      this.serialPort.write(str + LINE_END, (err: Error | null | undefined) => {
        if (err) {
          reject(err);
          return;
        }
        this.parser.once("data", (data) => {
          resolve(data);
        });
        this.serialPort.drain();
      });
    });
  }

  set(command: CommandId, value: CommandValue, tvID: TVId = null) {
    if (!_commands.hasOwnProperty(command)) {
      throw new Error(`Unknown command ${command}`);
    }

    const line = _commands[command][2](tvID, command, value);

    if (line)
      return this.send(line).then((response) => {
        return processTVResponse(response);
      });

    throw new Error(`Invalid command and value ${command} ${value}`);
  }

  get(command: string, tvID: TVId = null) {
    if (!_commands.hasOwnProperty(command)) {
      throw new Error(`Unknown command ${command}`);
    }

    const line = _commands[command][2](tvID, command, GET_BYTE);

    return this.send(line).then((response) => {
      return processTVResponse(response);
    });
  }
}
