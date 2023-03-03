import express from "express";
import axios from "axios";
const LGTV = require("lgtv-serial");

const SERVER_PORT = 3001;
const HDMI_ROUTER_URI = "http://hdmi/cgi-bin/instr";
const TV_SERIAL_DEVICE = "/dev/ttyUSB0";

type VideoRouterCommand = {
  input: number;
  output: number;
};

type TVCommand = {
  command: string;
  value: number;
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

const tvControl = (tv: any, command: TVCommand) => {
  return tv.set(command.command, command.value);
};

const lgtv = new LGTV(TV_SERIAL_DEVICE);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/switch", (req, res) => {
  routeVideo(req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch(() => {
      res.status(500).end();
    });
});

app.post("/tv", (req, res) => {
  tvControl(lgtv, req.body)
    .then((response: string) => {
      res.json(response);
    })
    .catch(() => {
      res.status(500).end();
    });
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
