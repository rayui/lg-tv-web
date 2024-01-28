import * as dotenv from "dotenv";
import express, { NextFunction } from "express";
import { TV, HDMISwitch, Serial } from "./lib";

type Executor = (
  state: any
) => Promise<Serial.LGTVResult | HDMISwitch.HDMISwitchResult>;

interface JSONErr {
  json: (err: { err: string }) => void;
}

interface JSONResponse<T> {
  json: (data: T) => void;
  status: (code: number) => JSONErr;
}

dotenv.config();
const { env } = process;

const SERVER_PORT = env.PORT || 3000;

const execute = (
  fn: Executor,
  res: JSONResponse<Serial.LGTVResult | HDMISwitch.HDMISwitchResult>,
  next: NextFunction,
  val?: any
) => {
  return fn(val)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const app = express();
app.use(express.text());
app.use(express.static("../client/build"));

app.get("/switch/status", (req, res, next) => {
  execute(HDMISwitch.getVideoRouting, res, next);
});

app.post("/switch/lounge", (req, res, next) => {
  execute(HDMISwitch.routeVideoOutput, res, next, {
    input: parseInt(req.body, 10),
    output: 1,
  });
});

app.post("/switch/office", (req, res, next) => {
  execute(HDMISwitch.routeVideoOutput, res, next, {
    input: parseInt(req.body, 10),
    output: 2,
  });
});

app.get("/tv/power", (req, res, next) => {
  execute(TV.getPower, res, next);
});
app.get("/tv/volume", (req, res, next) => {
  execute(TV.getVolume, res, next);
});
app.get("/tv/vol-mute", (req, res, next) => {
  execute(TV.getVolMute, res, next);
});
app.get("/tv/screen-mute", (req, res, next) => {
  execute(TV.getScreenMute, res, next);
});
app.get("/tv/aspect", (req, res, next) => {
  execute(TV.getAspect, res, next);
});
app.get("/tv/contrast", (req, res, next) => {
  execute(TV.getContrast, res, next);
});
app.get("/tv/brightness", (req, res, next) => {
  execute(TV.getBrightness, res, next);
});
app.get("/tv/colour", (req, res, next) => {
  execute(TV.getColour, res, next);
});
app.get("/tv/tint", (req, res, next) => {
  execute(TV.getTint, res, next);
});
app.get("/tv/sharpness", (req, res, next) => {
  execute(TV.getSharpness, res, next);
});
app.get("/tv/osd", (req, res, next) => {
  execute(TV.getOsd, res, next);
});
app.get("/tv/lock", (req, res, next) => {
  execute(TV.getRemoteLock, res, next);
});
app.get("/tv/treble", (req, res, next) => {
  execute(TV.getTreble, res, next);
});
app.get("/tv/bass", (req, res, next) => {
  execute(TV.getBass, res, next);
});
app.get("/tv/balance", (req, res, next) => {
  execute(TV.getBalance, res, next);
});
app.get("/tv/temperature", (req, res, next) => {
  execute(TV.getTemperature, res, next);
});
app.get("/tv/ism", (req, res, next) => {
  execute(TV.getIsm, res, next);
});
app.get("/tv/energy", (req, res, next) => {
  execute(TV.getEnergy, res, next);
});
app.get("/tv/auto", (req, res, next) => {
  execute(TV.getAuto, res, next);
});
app.get("/tv/programme", (req, res, next) => {
  execute(TV.getProgramme, res, next);
});
app.get("/tv/key", (req, res, next) => {
  execute(TV.getKey, res, next);
});
app.get("/tv/backlight", (req, res, next) => {
  execute(TV.getBacklight, res, next);
});
app.get("/tv/input", (req, res, next) => {
  execute(TV.getInput, res, next);
});
app.post("/tv/power", (req, res, next) => {
  execute(TV.setPower, res, next, req.body);
});
app.post("/tv/volume", (req, res, next) => {
  execute(TV.setVolume, res, next, req.body);
});
app.post("/tv/vol-mute", (req, res, next) => {
  execute(TV.setVolMute, res, next, req.body);
});
app.post("/tv/screen-mute", (req, res, next) => {
  execute(TV.setScreenMute, res, next, req.body);
});
app.post("/tv/aspect", (req, res, next) => {
  execute(TV.setAspect, res, next, req.body);
});
app.post("/tv/contrast", (req, res, next) => {
  execute(TV.setContrast, res, next, req.body);
});
app.post("/tv/brightness", (req, res, next) => {
  execute(TV.setBrightness, res, next, req.body);
});
app.post("/tv/colour", (req, res, next) => {
  execute(TV.setColour, res, next, req.body);
});
app.post("/tv/tint", (req, res, next) => {
  execute(TV.setTint, res, next, req.body);
});
app.post("/tv/sharpness", (req, res, next) => {
  execute(TV.setSharpness, res, next, req.body);
});
app.post("/tv/osd", (req, res, next) => {
  execute(TV.setOsd, res, next, req.body);
});
app.post("/tv/lock", (req, res, next) => {
  execute(TV.setRemoteLock, res, next, req.body);
});
app.post("/tv/treble", (req, res, next) => {
  execute(TV.setTreble, res, next, req.body);
});
app.post("/tv/bass", (req, res, next) => {
  execute(TV.setBass, res, next, req.body);
});
app.post("/tv/balance", (req, res, next) => {
  execute(TV.setBalance, res, next, req.body);
});
app.post("/tv/temperature", (req, res, next) => {
  execute(TV.setTemperature, res, next, req.body);
});
app.post("/tv/ism", (req, res, next) => {
  execute(TV.setIsm, res, next, req.body);
});
app.post("/tv/energy", (req, res, next) => {
  execute(TV.setEnergy, res, next, req.body);
});
app.post("/tv/auto", (req, res, next) => {
  execute(TV.setAuto, res, next, req.body);
});
app.post("/tv/programme", (req, res, next) => {
  execute(TV.setProgramme, res, next, req.body);
});
app.post("/tv/key", (req, res, next) => {
  execute(TV.setKey, res, next, req.body);
});
app.post("/tv/backlight", (req, res, next) => {
  execute(TV.setBacklight, res, next, req.body);
});
app.post("/tv/input", (req, res, next) => {
  execute(TV.setInput, res, next, req.body);
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
