import * as dotenv from "dotenv";
import express from "express";
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
  val?: any
) => {
  return fn(val)
    .then((result) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.status(500).json({
        err: err.message,
      });
    });
};

const app = express();
app.use(express.text());
app.use(express.static("../client/build"));

app.get("/switch/status", (req, res) => {
  execute(HDMISwitch.getVideoRouting, res);
});

app.post("/switch/lounge", (req, res) => {
  execute(HDMISwitch.routeVideoOutput, res, {
    input: parseInt(req.body, 10),
    output: 1,
  });
});

app.post("/switch/office", (req, res) => {
  execute(HDMISwitch.routeVideoOutput, res, {
    input: parseInt(req.body, 10),
    output: 2,
  });
});

app.get("/tv/power", (req, res) => {
  execute(TV.getPower, res);
});

app.get("/tv/volume", (req, res) => {
  execute(TV.getVolume, res);
});

app.get("/tv/vol-mute", (req, res) => {
  execute(TV.getVolMute, res);
});

app.get("/tv/screen-mute", (req, res) => {
  execute(TV.getScreenMute, res);
});

app.get("/tv/aspect", (req, res) => {
  execute(TV.getAspect, res);
});

app.get("/tv/contrast", (req, res) => {
  execute(TV.getContrast, res);
});

app.get("/tv/brightness", (req, res) => {
  execute(TV.getBrightness, res);
});

app.get("/tv/colour", (req, res) => {
  execute(TV.getColour, res);
});

app.get("/tv/tint", (req, res) => {
  execute(TV.getTint, res);
});

app.get("/tv/sharpness", (req, res) => {
  execute(TV.getSharpness, res);
});

app.get("/tv/osd", (req, res) => {
  execute(TV.getOsd, res);
});

app.get("/tv/lock", (req, res) => {
  execute(TV.getRemoteLock, res);
});

app.get("/tv/treble", (req, res) => {
  execute(TV.getTreble, res);
});

app.get("/tv/bass", (req, res) => {
  execute(TV.getBass, res);
});

app.get("/tv/balance", (req, res) => {
  execute(TV.getBalance, res);
});

app.get("/tv/temperature", (req, res) => {
  execute(TV.getTemperature, res);
});

app.get("/tv/ism", (req, res) => {
  execute(TV.getIsm, res);
});

app.get("/tv/energy", (req, res) => {
  execute(TV.getEnergy, res);
});

app.get("/tv/auto", (req, res) => {
  execute(TV.getAuto, res);
});

app.get("/tv/programme", (req, res) => {
  execute(TV.getProgramme, res);
});

app.get("/tv/key", (req, res) => {
  execute(TV.getKey, res);
});

app.get("/tv/backlight", (req, res) => {
  execute(TV.getBacklight, res);
});

app.get("/tv/input", (req, res) => {
  execute(TV.getInput, res);
});

app.post("/tv/power", (req, res) => {
  execute(TV.setPower, res, req.body);
});

app.post("/tv/volume", (req, res) => {
  execute(TV.setVolume, res, req.body);
});

app.post("/tv/vol-mute", (req, res) => {
  execute(TV.setVolMute, res, req.body);
});

app.post("/tv/screen-mute", (req, res) => {
  execute(TV.setScreenMute, res, req.body);
});

app.post("/tv/aspect", (req, res) => {
  execute(TV.setAspect, res, req.body);
});

app.post("/tv/contrast", (req, res) => {
  execute(TV.setContrast, res, req.body);
});

app.post("/tv/brightness", (req, res) => {
  execute(TV.setBrightness, res, req.body);
});

app.post("/tv/colour", (req, res) => {
  execute(TV.setColour, res, req.body);
});

app.post("/tv/tint", (req, res) => {
  execute(TV.setTint, res, req.body);
});

app.post("/tv/sharpness", (req, res) => {
  execute(TV.setSharpness, res, req.body);
});

app.post("/tv/osd", (req, res) => {
  execute(TV.setOsd, res, req.body);
});

app.post("/tv/lock", (req, res) => {
  execute(TV.setRemoteLock, res, req.body);
});

app.post("/tv/treble", (req, res) => {
  execute(TV.setTreble, res, req.body);
});

app.post("/tv/bass", (req, res) => {
  execute(TV.setBass, res, req.body);
});

app.post("/tv/balance", (req, res) => {
  execute(TV.setBalance, res, req.body);
});

app.post("/tv/temperature", (req, res) => {
  execute(TV.setTemperature, res, req.body);
});

app.post("/tv/ism", (req, res) => {
  execute(TV.setIsm, res, req.body);
});

app.post("/tv/energy", (req, res) => {
  execute(TV.setEnergy, res, req.body);
});

app.post("/tv/auto", (req, res) => {
  execute(TV.setAuto, res, req.body);
});

app.post("/tv/programme", (req, res) => {
  execute(TV.setProgramme, res, req.body);
});

app.post("/tv/key", (req, res) => {
  execute(TV.setKey, res, req.body);
});

app.post("/tv/backlight", (req, res) => {
  execute(TV.setBacklight, res, req.body);
});

app.post("/tv/input", (req, res) => {
  execute(TV.setInput, res, req.body);
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
