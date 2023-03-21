import * as dotenv from "dotenv";
import { LGTV, CNM, LGTVResult } from "./lgtv-ts-serial";

dotenv.config();
const { env } = process;
const TV_SERIAL_DEVICE = env.TV_SERIAL_DEVICE || "/dev/ttyUSB0";
const lgtv = new LGTV(TV_SERIAL_DEVICE);

export const getPower = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.power);
};

export const getVolume = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.volume_control);
};

export const getVolMute = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.volume_mute);
};

export const getScreenMute = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.screen_mute);
};

export const getAspect = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.aspect_ratio);
};

export const getContrast = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.contrast);
};

export const getBrightness = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.brightness);
};

export const getColour = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.colour);
};

export const getTint = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.tint);
};

export const getSharpness = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.sharpness);
};

export const getOsd = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.osd);
};

export const getRemoteLock = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.remote);
};

export const getTreble = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.treble);
};

export const getBass = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.bass);
};

export const getBalance = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.balance);
};

export const getTemperature = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.temperature);
};

export const getIsm = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.ism);
};

export const getEnergy = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.energy);
};

//tune later?

export const getAuto = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.auto, null);
};

export const getProgramme = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.programme);
};

export const getKey = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.key);
};

export const getBacklight = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.backlight);
};

export const getInput = (state: string): Promise<LGTVResult> => {
  return lgtv.get(CNM.input);
};

//3d later?
//extended 3d later?

export const setPower = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.power, state);
};

export const setVolume = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.volume_control, state);
};

export const setVolMute = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.volume_mute, state);
};

export const setScreenMute = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.screen_mute, state);
};

export const setAspect = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.aspect_ratio, state);
};

export const setContrast = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.contrast, state);
};

export const setBrightness = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.brightness, state);
};

export const setColour = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.colour, state);
};

export const setTint = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.tint, state);
};

export const setSharpness = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.sharpness, state);
};

export const setOsd = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.osd, state);
};

export const setRemoteLock = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.remote, state);
};

export const setTreble = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.treble, state);
};

export const setBass = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.bass, state);
};

export const setBalance = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.balance, state);
};

export const setTemperature = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.temperature, state);
};

export const setIsm = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.ism, state);
};

export const setEnergy = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.energy, state);
};

//tune later?

export const setAuto = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.auto, "");
};

export const setProgramme = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.programme, state);
};

export const setKey = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.key, state);
};

export const setBacklight = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.backlight, state);
};

export const setInput = (state: string): Promise<LGTVResult> => {
  return lgtv.set(CNM.input, state);
};

//3d later?
//extended 3d later?
