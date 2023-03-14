import React, { MouseEventHandler } from "react";
import axios from "axios";
import "./App.css";

interface ButtonProps {
  title: string;
  callback: MouseEventHandler<HTMLDivElement>;
}

const enum DeviceName {
  TV = "tv",
  HDMI_SWITCH = "switch",
}

const enum Command {
  "power",
  "volume",
  "input",
  "energy",
  "vol-mute",
  "screen-mute",
  "lounge",
  "office",
}

const constructURI = (device: DeviceName, command: Command) => {
  return [device, command].join("/");
};

const sendControlRequest = async (
  device: DeviceName,
  command: Command,
  value: string
) => {
  const uri = constructURI(device, command);
  const response = await axios.post(uri, value, {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response.data;
};

const switchLoungeInput1 = async (event: React.MouseEvent<HTMLDivElement>) => {
  return await sendControlRequest(DeviceName.HDMI_SWITCH, Command.lounge, "1");
};

const switchLoungeInput2 = async (event: React.MouseEvent<HTMLDivElement>) => {
  return await sendControlRequest(DeviceName.HDMI_SWITCH, Command.lounge, "2");
};

const tvPowerOn = async (event: React.MouseEvent<HTMLDivElement>) => {
  return await sendControlRequest(DeviceName.TV, Command.power, "1");
};

const tvPowerOff = async (event: React.MouseEvent<HTMLDivElement>) => {
  return await sendControlRequest(DeviceName.TV, Command.power, "0");
};

const Button = ({ title, callback }: ButtonProps) => {
  return (
    <div onClick={callback}>
      <p>{title}</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <section id="switch">
        <Button title="Chromecast" callback={switchLoungeInput1} />
        <Button title="Lounge computer" callback={switchLoungeInput2} />
      </section>
      <section id="tv">
        <Button title="TV on" callback={tvPowerOn} />
        <Button title="TV off" callback={tvPowerOff} />
      </section>
      <section id="tv"></section>
    </div>
  );
}

export default App;
