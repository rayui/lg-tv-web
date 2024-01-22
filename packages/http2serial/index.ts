import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { TV, HDMISwitch, Serial } from "./lib";

interface JSONErr {
  json: (err: { err: string }) => void;
}

dotenv.config();
const { env } = process;

const SERVER_PORT = env.PORT || 3000;

const app = express();
app.use(express.text());
app.use(express.static("../client/build"));

app.get("/switch/status", (req, res, next) => {
  HDMISwitch.getVideoRouting().then(res.json).catch(next);
});

app.post("/switch/lounge", (req, res, next) => {
  HDMISwitch.routeVideoOutput({
    input: parseInt(req.body, 10),
    output: 1,
  })
    .then(res.json)
    .catch(next);
});

app.post("/switch/office", (req, res, next) => {
  HDMISwitch.routeVideoOutput({
    input: parseInt(req.body, 10),
    output: 2,
  })
    .then(res.json)
    .catch(next);
});

app.get("/tv/power", (req, res, next) => {
  TV.getPower().then(res.json).catch(next);
});

app.get("/tv/volume", (req, res, next) => {
  TV.getVolume().then(res.json).catch(next);
});

app.get("/tv/vol-mute", (req, res, next) => {
  TV.getVolMute().then(res.json).catch(next);
});

app.get("/tv/screen-mute", (req, res, next) => {
  TV.getScreenMute().then(res.json).catch(next);
});

app.get("/tv/aspect", (req, res, next) => {
  TV.getAspect().then(res.json).catch(next);
});

app.get("/tv/contrast", (req, res, next) => {
  TV.getContrast().then(res.json).catch(next);
});

app.get("/tv/brightness", (req, res, next) => {
  TV.getBrightness().then(res.json).catch(next);
});

app.get("/tv/colour", (req, res, next) => {
  TV.getColour().then(res.json).catch(next);
});

app.get("/tv/tint", (req, res, next) => {
  TV.getTint().then(res.json).catch(next);
});

app.get("/tv/sharpness", (req, res, next) => {
  TV.getSharpness().then(res.json).catch(next);
});

app.get("/tv/osd", (req, res, next) => {
  TV.getOsd().then(res.json).catch(next);
});

app.get("/tv/lock", (req, res, next) => {
  TV.getRemoteLock().then(res.json).catch(next);
});

app.get("/tv/treble", (req, res, next) => {
  TV.getTreble().then(res.json).catch(next);
});

app.get("/tv/bass", (req, res, next) => {
  TV.getBass().then(res.json).catch(next);
});

app.get("/tv/balance", (req, res, next) => {
  TV.getBalance().then(res.json).catch(next);
});

app.get("/tv/temperature", (req, res, next) => {
  TV.getTemperature().then(res.json).catch(next);
});

app.get("/tv/ism", (req, res, next) => {
  TV.getIsm().then(res.json).catch(next);
});

app.get("/tv/energy", (req, res, next) => {
  TV.getEnergy().then(res.json).catch(next);
});

app.get("/tv/auto", (req, res, next) => {
  TV.getAuto().then(res.json).catch(next);
});

app.get("/tv/programme", (req, res, next) => {
  TV.getProgramme().then(res.json).catch(next);
});

app.get("/tv/key", (req, res, next) => {
  TV.getKey().then(res.json).catch(next);
});

app.get("/tv/backlight", (req, res, next) => {
  TV.getBacklight().then(res.json).catch(next);
});

app.get("/tv/input", (req, res, next) => {
  TV.getInput().then(res.json).catch(next);
});

app.post("/tv/power", (req, res, next) => {
  TV.setPower(req.body).then(res.json).catch(next);
});

app.post("/tv/volume", (req, res, next) => {
  TV.setVolume(req.body).then(res.json).catch(next);
});

app.post("/tv/vol-mute", (req, res, next) => {
  TV.setVolMute(req.body).then(res.json).catch(next);
});

app.post("/tv/screen-mute", (req, res, next) => {
  TV.setScreenMute(req.body).then(res.json).catch(next);
});

app.post("/tv/aspect", (req, res, next) => {
  TV.setAspect(req.body).then(res.json).catch(next);
});

app.post("/tv/contrast", (req, res, next) => {
  TV.setContrast(req.body).then(res.json).catch(next);
});

app.post("/tv/brightness", (req, res, next) => {
  TV.setBrightness(req.body).then(res.json).catch(next);
});

app.post("/tv/colour", (req, res, next) => {
  TV.setColour(req.body).then(res.json).catch(next);
});

app.post("/tv/tint", (req, res, next) => {
  TV.setTint(req.body).then(res.json).catch(next);
});

app.post("/tv/sharpness", (req, res, next) => {
  TV.setSharpness(req.body).then(res.json).catch(next);
});

app.post("/tv/osd", (req, res, next) => {
  TV.setOsd(req.body).then(res.json).catch(next);
});

app.post("/tv/lock", (req, res, next) => {
  TV.setRemoteLock(req.body).then(res.json).catch(next);
});

app.post("/tv/treble", (req, res, next) => {
  TV.setTreble(req.body).then(res.json).catch(next);
});

app.post("/tv/bass", (req, res, next) => {
  TV.setBass(req.body).then(res.json).catch(next);
});

app.post("/tv/balance", (req, res, next) => {
  TV.setBalance(req.body).then(res.json).catch(next);
});

app.post("/tv/temperature", (req, res, next) => {
  TV.setTemperature(req.body).then(res.json).catch(next);
});

app.post("/tv/ism", (req, res, next) => {
  TV.setIsm(req.body).then(res.json).catch(next);
});

app.post("/tv/energy", (req, res, next) => {
  TV.setEnergy(req.body).then(res.json).catch(next);
});

app.post("/tv/auto", (req, res, next) => {
  TV.setAuto().then(res.json).catch(next);
});

app.post("/tv/programme", (req, res, next) => {
  TV.setProgramme(req.body).then(res.json).catch(next);
});

app.post("/tv/key", (req, res, next) => {
  TV.setKey(req.body).then(res.json).catch(next);
});

app.post("/tv/backlight", (req, res, next) => {
  TV.setBacklight(req.body).then(res.json).catch(next);
});

app.post("/tv/input", (req, res, next) => {
  TV.setInput(req.body).then(res.json).catch(next);
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});

app.use((err: any, _req: Request, res: Response) => {
  console.log(err);
  res.status(500).end(err);
});
