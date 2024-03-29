import axios from "axios";

export type APIResponse = {
  status: string;
  result: number;
};

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
  BRIGHTNESS = "brightness",
  CONTRAST = "contrast",
  COLOUR = "colour",
  TINT = "tint",
  TEMPERATURE = "temperature",
  SHARPNESS = "sharpness",
  BACKLIGHT = "backlight",
  TREBLE = "treble",
  BASS = "bass",
  BALANCE = "balance",
  OSD = "osd",
  REMOTE_LOCK = "lock",
  AUTO_ADJUST = "auto",
  LOUNGE = "lounge",
  OFFICE = "office",
  HDMI_STATUS = "status",
}

const constructURI = (device: DeviceName, command: Command) => {
  return [device, command].join("/");
};

export const sendControlRequest = async (
  device: DeviceName,
  command: Command,
  value?: number | string
): Promise<APIResponse> => {
  const uri = constructURI(device, command);
  const response = await axios.post(uri, value, {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response.data;
};

export const getControlRequest = async (
  device: DeviceName,
  command: Command
): Promise<APIResponse> => {
  const uri = constructURI(device, command);
  const response = await axios.get(uri, {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response.data;
};
