import * as dotenv from "dotenv";
import { LGTV } from "./lgtv-ts-serial";

export type LGTVResult = {
  status: string;
  result: string;
} | null;

const INVALID_STATE_MESSAGE = "Invalid state";

dotenv.config();
const { env } = process;
const TV_SERIAL_DEVICE = env.TV_SERIAL_DEVICE || "/dev/ttyUSB0";
const lgtv = new LGTV(TV_SERIAL_DEVICE);

const validateNumber = (state: string) => {
  const inputState = parseInt(state, 10);
  if (isNaN(inputState)) throw new Error(INVALID_STATE_MESSAGE);
  return inputState;
};

const validateBoolean = (state: string) => {
  const inputState = parseInt(state, 10);
  if (isNaN(inputState) || (inputState !== 1 && inputState !== 0))
    throw new Error(INVALID_STATE_MESSAGE);
  return inputState !== 0;
};

export const power = async (state: string): Promise<LGTVResult> => {
  return lgtv.set("power", validateBoolean(state));
};

export const volume = async (state: string): Promise<LGTVResult> => {
  return lgtv.set("volume", validateNumber(state));
};

export const energy = async (state: string): Promise<LGTVResult> => {
  return lgtv.set("energy", validateNumber(state));
};

export const input = async (state: string): Promise<LGTVResult> => {
  return lgtv.set("volume", validateNumber(state));
};

export const volMute = async (state: string): Promise<LGTVResult> => {
  return lgtv.set("volume_mute", validateBoolean(state));
};

export const screenMute = async (state: string): Promise<LGTVResult> => {
  return lgtv.set("screen_mute", validateBoolean(state));
};
