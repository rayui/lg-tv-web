import * as dotenv from "dotenv";
import express from "express";
import axios from "axios";
import { LGTV } from "./lib/lgtv-ts-serial";

dotenv.config();
const { env } = process;

const SERVER_PORT = env.API_PORT || 3000;
const HDMI_ROUTER_URI = env.HDMI_ROUTER_URI || "http://hdmi/cgi-bin/instr";
const TV_SERIAL_DEVICE = env.TV_SERIAL_DEVICE || "/dev/ttyUSB0";

type VideoRouterCommand = {
  input: number;
  output: number;
};

const routeVideo = (command: VideoRouterCommand) => {
  const data = JSON.stringify({
    comhead: "video switch",
    source: [command.input, command.output],
  });

  return axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data: data,
  });
};

const lgtv = new LGTV(TV_SERIAL_DEVICE);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/switch", async (req, res) => {
  await routeVideo(req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err: Error) => {
      res.status(500).end(err.message);
    });
});

app.post("/tv", async (req, res) => {
  await lgtv
    .set(req.body.commandId, req.body.value)
    .then((result) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.status(500).end(err.message);
    });
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
