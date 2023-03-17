import * as dotenv from "dotenv";
import { LGTV } from "./lgtv-ts-serial";

export type LGTVResult = {
  status: string;
  result: string;
};

const FIELD_SEPARATOR = String.fromCharCode(0x20); //space
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

const validateHighAndLowWords = (state: string) => {
  const [highWord, lowWord] = state
    .split(FIELD_SEPARATOR)
    .map((value) => parseInt(value, 10));

  if (isNaN(highWord)) throw new Error(INVALID_STATE_MESSAGE);
  if (isNaN(lowWord)) throw new Error(INVALID_STATE_MESSAGE);

  return (highWord << 4) + lowWord;
};

const validateBoolean = (state: string) => {
  const inputState = parseInt(state, 10);
  if (isNaN(inputState) || (inputState !== 1 && inputState !== 0))
    throw new Error(INVALID_STATE_MESSAGE);
  return inputState !== 0;
};

export const getPower = (state: string): Promise<LGTVResult> => {
  return lgtv.get("power");
};

export const getVolume = (state: string): Promise<LGTVResult> => {
  return lgtv.get("volume_control");
};

export const getVolMute = (state: string): Promise<LGTVResult> => {
  return lgtv.get("volume_mute");
};

export const getScreenMute = (state: string): Promise<LGTVResult> => {
  return lgtv.get("screen_mute");
};

export const getAspect = (state: string): Promise<LGTVResult> => {
  return lgtv.get("aspect");
};

export const getContrast = (state: string): Promise<LGTVResult> => {
  return lgtv.get("contrast");
};

export const getBrightness = (state: string): Promise<LGTVResult> => {
  return lgtv.get("brightness");
};

export const getColour = (state: string): Promise<LGTVResult> => {
  return lgtv.get("colour");
};

export const getTint = (state: string): Promise<LGTVResult> => {
  return lgtv.get("tint");
};

export const getSharpness = (state: string): Promise<LGTVResult> => {
  return lgtv.get("sharpness");
};

export const getOsd = (state: string): Promise<LGTVResult> => {
  return lgtv.get("osd");
};

export const getRemoteLock = (state: string): Promise<LGTVResult> => {
  return lgtv.get("remote");
};

export const getTreble = (state: string): Promise<LGTVResult> => {
  return lgtv.get("treble");
};

export const getBass = (state: string): Promise<LGTVResult> => {
  return lgtv.get("bass");
};

export const getBalance = (state: string): Promise<LGTVResult> => {
  return lgtv.get("balance");
};

export const getTemperature = (state: string): Promise<LGTVResult> => {
  return lgtv.get("temperature");
};

export const getIsm = (state: string): Promise<LGTVResult> => {
  return lgtv.get("ism");
};

export const getEnergy = (state: string): Promise<LGTVResult> => {
  return lgtv.get("energy");
};

//tune later?

export const getAuto = (state: string): Promise<LGTVResult> => {
  return lgtv.get("auto", null);
};

export const getProgramme = (state: string): Promise<LGTVResult> => {
  return lgtv.get("programme");
};

export const getKey = (state: string): Promise<LGTVResult> => {
  return lgtv.get("key");
};

export const getBacklight = (state: string): Promise<LGTVResult> => {
  return lgtv.get("backlight");
};

export const getInput = (state: string): Promise<LGTVResult> => {
  return lgtv.get("input");
};

//3d later?
//extended 3d later?

export const setPower = (state: string): Promise<LGTVResult> => {
  return lgtv.set("power", validateBoolean(state));
};

export const setVolume = (state: string): Promise<LGTVResult> => {
  return lgtv.set("volume_control", validateNumber(state));
};

export const setVolMute = (state: string): Promise<LGTVResult> => {
  return lgtv.set("volume_mute", validateBoolean(state));
};

export const setScreenMute = (state: string): Promise<LGTVResult> => {
  return lgtv.set("screen_mute", validateBoolean(state));
};

export const setAspect = (state: string): Promise<LGTVResult> => {
  return lgtv.set("aspect", validateNumber(state));
};

export const setContrast = (state: string): Promise<LGTVResult> => {
  return lgtv.set("contrast", validateNumber(state));
};

export const setBrightness = (state: string): Promise<LGTVResult> => {
  return lgtv.set("brightness", validateNumber(state));
};

export const setColour = (state: string): Promise<LGTVResult> => {
  return lgtv.set("colour", validateNumber(state));
};

export const setTint = (state: string): Promise<LGTVResult> => {
  return lgtv.set("tint", validateNumber(state));
};

export const setSharpness = (state: string): Promise<LGTVResult> => {
  return lgtv.set("sharpness", validateNumber(state));
};

export const setOsd = (state: string): Promise<LGTVResult> => {
  return lgtv.set("osd", validateBoolean(state));
};

export const setRemoteLock = (state: string): Promise<LGTVResult> => {
  return lgtv.set("remote", validateBoolean(state));
};

export const setTreble = (state: string): Promise<LGTVResult> => {
  return lgtv.set("treble", validateNumber(state));
};

export const setBass = (state: string): Promise<LGTVResult> => {
  return lgtv.set("bass", validateNumber(state));
};

export const setBalance = (state: string): Promise<LGTVResult> => {
  return lgtv.set("balance", validateNumber(state));
};

export const setTemperature = (state: string): Promise<LGTVResult> => {
  return lgtv.set("temperature", validateNumber(state));
};

export const setIsm = (state: string): Promise<LGTVResult> => {
  return lgtv.set("ism", validateNumber(state));
};

export const setEnergy = (state: string): Promise<LGTVResult> => {
  return lgtv.set("energy", validateNumber(state));
};

//tune later?

export const setAuto = (state: string): Promise<LGTVResult> => {
  return lgtv.set("auto", null);
};

export const setProgramme = (state: string): Promise<LGTVResult> => {
  return lgtv.set("programme", validateBoolean(state));
};

export const setKey = (state: string): Promise<LGTVResult> => {
  return lgtv.set("key", validateNumber(state));
};

export const setBacklight = (state: string): Promise<LGTVResult> => {
  return lgtv.set("backlight", validateNumber(state));
};

export const setInput = (state: string): Promise<LGTVResult> => {
  return lgtv.set("input", validateHighAndLowWords(state));
};

//3d later?
//extended 3d later?
