import axios from "axios";

const FIELD_SEPARATOR = String.fromCharCode(0x20); //space

export const enum DeviceName {
  TV = "tv",
  HDMI_SWITCH = "switch",
}

export const enum Command {
  POWER = "power",
  VOLUME = "volume",
  INPUT = "input",
  ENERGY = "energy",
  VOL_MUTE = "vol-mute",
  SCR_MUTE = "screen-mute",
  LOUNGE = "lounge",
  OFFICE = "office",
}

const constructURI = (device: DeviceName, command: Command) => {
  return [device, command].join("/");
};

export const sendControlRequest = async (
  device: DeviceName,
  command: Command,
  value: string,
  qualifier?: string
) => {
  const uri = constructURI(device, command);
  const response = await axios.post(
    uri,
    qualifier ? [value, qualifier].join(FIELD_SEPARATOR) : value,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );

  return response.data;
};
