import * as dotenv from "dotenv";
import express from "express";
import { TV, HDMISwitch } from "./lib";

type Executor = (
  state: string
) => Promise<TV.LGTVResult | HDMISwitch.HDMISwitchResult>;

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

app.post("/switch/lounge", async (req, res) => {
  await execute(HDMISwitch.routeVideoOutput1, req.body, res);
});

app.post("/switch/office", async (req, res) => {
  await execute(HDMISwitch.routeVideoOutput2, req.body, res);
});

app.post("/tv/power", async (req, res) => {
  await execute(TV.power, req.body, res);
});

app.post("/tv/volume", async (req, res) => {
  await execute(TV.volume, req.body, res);
});

app.post("/tv/input", async (req, res) => {
  await execute(TV.input, req.body, res);
});

app.post("/tv/energy", async (req, res) => {
  await execute(TV.energy, req.body, res);
});

app.post("/tv/vol-mute", async (req, res) => {
  await execute(TV.volMute, req.body, res);
});

app.post("/tv/screen-mute", async (req, res) => {
  await execute(TV.screenMute, req.body, res);
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
