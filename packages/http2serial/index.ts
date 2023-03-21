import * as dotenv from "dotenv";
import express from "express";
import { TV, HDMISwitch, Serial } from "./lib";

type Executor = (
  state: string
) => Promise<Serial.LGTVResult | HDMISwitch.HDMISwitchResult>;

dotenv.config();
const { env } = process;

const SERVER_PORT = env.API_PORT || 3000;

const execute = (fn: Executor, val: string, res: any) => {
  return fn(val)
    .then((result) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.status(500).end(err.message);
    });
};

const app = express();
app.use(express.text());
app.use(express.static("../client/build"));

app.get("/switch/routing", (req, res) => {
  execute(HDMISwitch.getVideoRouting, req.body, res);
});

app.get("/tv/power", (req, res) => {
  execute(TV.getPower, req.body, res);
});

app.get("/tv/volume", (req, res) => {
  execute(TV.getVolume, req.body, res);
});

app.get("/tv/vol-mute", (req, res) => {
  execute(TV.getVolMute, req.body, res);
});

app.get("/tv/screen-mute", (req, res) => {
  execute(TV.getScreenMute, req.body, res);
});

app.get("/tv/aspect", (req, res) => {
  execute(TV.getAspect, req.body, res);
});

app.get("/tv/contrast", (req, res) => {
  execute(TV.getContrast, req.body, res);
});

app.get("/tv/brightness", (req, res) => {
  execute(TV.getBrightness, req.body, res);
});

app.get("/tv/colour", (req, res) => {
  execute(TV.getColour, req.body, res);
});

app.get("/tv/tint", (req, res) => {
  execute(TV.getTint, req.body, res);
});

app.get("/tv/sharpness", (req, res) => {
  execute(TV.getSharpness, req.body, res);
});

app.get("/tv/osd", (req, res) => {
  execute(TV.getOsd, req.body, res);
});

app.get("/tv/lock", (req, res) => {
  execute(TV.getRemoteLock, req.body, res);
});

app.get("/tv/treble", (req, res) => {
  execute(TV.getTreble, req.body, res);
});

app.get("/tv/bass", (req, res) => {
  execute(TV.getBass, req.body, res);
});

app.get("/tv/balance", (req, res) => {
  execute(TV.getBalance, req.body, res);
});

app.get("/tv/temperature", (req, res) => {
  execute(TV.getTemperature, req.body, res);
});

app.get("/tv/ism", (req, res) => {
  execute(TV.getIsm, req.body, res);
});

app.get("/tv/energy", (req, res) => {
  execute(TV.getEnergy, req.body, res);
});

app.get("/tv/auto", (req, res) => {
  execute(TV.getAuto, req.body, res);
});

app.get("/tv/programme", (req, res) => {
  execute(TV.getProgramme, req.body, res);
});

app.get("/tv/key", (req, res) => {
  execute(TV.getKey, req.body, res);
});

app.get("/tv/backlight", (req, res) => {
  execute(TV.getBacklight, req.body, res);
});

app.get("/tv/input", (req, res) => {
  execute(TV.getInput, req.body, res);
});

app.post("/switch/lounge", (req, res) => {
  execute(HDMISwitch.routeVideoOutput1, req.body, res);
});

app.post("/switch/office", (req, res) => {
  execute(HDMISwitch.routeVideoOutput2, req.body, res);
});

app.post("/tv/power", (req, res) => {
  execute(TV.setPower, req.body, res);
});

app.post("/tv/volume", (req, res) => {
  execute(TV.setVolume, req.body, res);
});

app.post("/tv/vol-mute", (req, res) => {
  execute(TV.setVolMute, req.body, res);
});

app.post("/tv/screen-mute", (req, res) => {
  execute(TV.setScreenMute, req.body, res);
});

app.post("/tv/aspect", (req, res) => {
  execute(TV.setAspect, req.body, res);
});

app.post("/tv/contrast", (req, res) => {
  execute(TV.setContrast, req.body, res);
});

app.post("/tv/brightness", (req, res) => {
  execute(TV.setBrightness, req.body, res);
});

app.post("/tv/colour", (req, res) => {
  execute(TV.setColour, req.body, res);
});

app.post("/tv/tint", (req, res) => {
  execute(TV.setTint, req.body, res);
});

app.post("/tv/sharpness", (req, res) => {
  execute(TV.setSharpness, req.body, res);
});

app.post("/tv/osd", (req, res) => {
  execute(TV.setOsd, req.body, res);
});

app.post("/tv/lock", (req, res) => {
  execute(TV.setRemoteLock, req.body, res);
});

app.post("/tv/treble", (req, res) => {
  execute(TV.setTreble, req.body, res);
});

app.post("/tv/bass", (req, res) => {
  execute(TV.setBass, req.body, res);
});

app.post("/tv/balance", (req, res) => {
  execute(TV.setBalance, req.body, res);
});

app.post("/tv/temperature", (req, res) => {
  execute(TV.setTemperature, req.body, res);
});

app.post("/tv/ism", (req, res) => {
  execute(TV.setIsm, req.body, res);
});

app.post("/tv/energy", (req, res) => {
  execute(TV.setEnergy, req.body, res);
});

app.post("/tv/auto", (req, res) => {
  execute(TV.setAuto, req.body, res);
});

app.post("/tv/programme", (req, res) => {
  execute(TV.setProgramme, req.body, res);
});

app.post("/tv/key", (req, res) => {
  execute(TV.setKey, req.body, res);
});

app.post("/tv/backlight", (req, res) => {
  execute(TV.setBacklight, req.body, res);
});

app.post("/tv/input", (req, res) => {
  execute(TV.setInput, req.body, res);
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
