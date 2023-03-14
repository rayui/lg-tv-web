import { SerialPort, ReadlineParser } from "serialport";

const DEFAULT_ID = 1;

const enum CommandValueType {
  boolean = "BOOL",
  number = "NUMBER",
  null = "NULL",
}

type Commands = { [index: string]: string[] };
type CommandId = string;
type CommandValue = boolean | number | null;

type TVId = number | null;

const _commands: Commands = {
  power: ["k", "a", CommandValueType.boolean],
  aspect_ratio: ["k", "c", CommandValueType.null],
  screen_mute: ["k", "d", CommandValueType.boolean],
  volume_mute: ["k", "e", CommandValueType.boolean],
  volume_control: ["k", "f", CommandValueType.number],
  contrast: ["k", "g", CommandValueType.number],
  brightness: ["k", "h", CommandValueType.number],
  colour: ["k", "i", CommandValueType.number],
  tint: ["k", "j", CommandValueType.number],
  sharpness: ["k", "k", CommandValueType.number],
  osd: ["k", "l", CommandValueType.boolean],
  remote: ["k", "m", CommandValueType.boolean],
  treble: ["k", "r", CommandValueType.number],
  bass: ["k", "s", CommandValueType.number],
  balance: ["k", "t", CommandValueType.number],
  temperature: ["x", "u", CommandValueType.number],
  energy: ["j", "q", CommandValueType.number],
  auto: ["j", "u", CommandValueType.null],
  tune: ["m", "a", CommandValueType.null],
  programme: ["m", "b", CommandValueType.boolean],
  key: ["m", "c", CommandValueType.null],
  backlight: ["m", "g", CommandValueType.number],
  input: ["x", "b", CommandValueType.number],
};

export class LGTV {
  serialPort: SerialPort;
  parser: ReadlineParser;
  buffer: string = "";

  constructor(path: string) {
    this.serialPort = new SerialPort({ path: path, baudRate: 9600 });
    this.parser = this.serialPort.pipe(
      new ReadlineParser({ delimiter: "\r\n" })
    );
    this.parser.on("data", (data) => {
      this.buffer = String.prototype.concat(this.buffer, data);
    });
  }

  resetBuffer() {
    this.buffer = "";
  }

  send(str: string) {
    return new Promise<string>((resolve: Function, reject: Function) => {
      this.serialPort.write(str + "\r", (err: Error | null | undefined) => {
        if (err) {
          reject(err);
          return;
        }
        this.serialPort.drain(() => {
          resolve(this.buffer);
          this.resetBuffer();
        });
      });
    });
  }
  tvID(tvID: TVId) {
    const int_tvID = tvID ? tvID : DEFAULT_ID;
    if (String(int_tvID).length === 1) {
      return "0" + String(int_tvID);
    }
    return String(int_tvID);
  }
  processTVResponse(response: string) {
    // a 01 OK01x
    const regex = /. \d+ (..)(.*)x/;

    const found = response.match(regex);
    if (found) {
      return { status: found[1], result: found[2] };
    } else {
      throw new Error(`Unexpected Response [${response}]`);
    }
  }
  async set(command: CommandId, value: CommandValue, tvID = null) {
    if (!_commands.hasOwnProperty(command)) {
      throw new Error(`Unknown command ${command}`);
    }

    const c = _commands[command];
    let line: string | null = null;

    if (c[2] === CommandValueType.boolean) {
      let v: string | null = null;
      if (typeof value === "boolean") {
        v = value ? "01" : "00";
      } else if (typeof value === "number") {
        v = value === 0 ? "00" : "01";
      } else {
        throw new Error(
          `Cannot convert type from [${typeof value}] for [${command}]`
        );
      }
      line = `${c[0]}${c[1]} ${this.tvID(tvID)} ${v}`;
    } else if (c[2] === CommandValueType.number) {
      line = `${c[0]}${c[1]} ${this.tvID(tvID)} ${value}`;
    } else {
      if (c[0] === "aspect_ratio") {
      } else if (c[0] === "auto") {
        line = `${c[0]}${c[1]} ${this.tvID(tvID)} 01`;
      } else if (c[0] === "tune") {
      } else if (c[0] === "key") {
      } else if (c[0] === "input") {
      }
    }
    if (line)
      return await this.send(line).then((response) => {
        return this.processTVResponse(response);
      });
    throw new Error(`Unknown command ${command}`);
  }
  async get(command: string, tvID: TVId = null) {
    if (!_commands.hasOwnProperty(command)) {
      throw new Error(`Unknown command ${command}`);
    }

    const c = _commands[command];
    let line: string | null = null;
    if (c[2] === CommandValueType.boolean) {
      line = `${c[0]}${c[1]} ${this.tvID(tvID)} FF`;
    }

    if (line)
      return await this.send(line).then((response) => {
        return this.processTVResponse(response);
      });
  }
}
