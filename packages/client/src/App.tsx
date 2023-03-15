import React, { MouseEventHandler } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from "@rmwc/top-app-bar";
import { Switch } from "@rmwc/switch";
import axios from "axios";

import "./App.css";
import "@fontsource/roboto/500.css";
import "@rmwc/top-app-bar/styles";
import "@rmwc/switch/styles";
import { Button, ButtonGroup, Typography } from "@mui/material";

const enum DeviceName {
  TV = "tv",
  HDMI_SWITCH = "switch",
}

const enum Command {
  POWER = "power",
  VOLUME = "volume",
  INPUT = "input",
  ENERGY = "energy",
  VOL_MUTE = "vol-mute",
  SCR_MUTE = "screen-mute",
  LOUNGE = "lounge",
  OFFICE = "office",
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

const switchLoungeInput1 = async (
  event: React.MouseEvent<HTMLAnchorElement>
) => {
  await sendControlRequest(DeviceName.HDMI_SWITCH, Command.LOUNGE, "1");
};

const switchLoungeInput2 = async (
  event: React.MouseEvent<HTMLAnchorElement>
) => {
  await sendControlRequest(DeviceName.HDMI_SWITCH, Command.LOUNGE, "2");
};

function App() {
  const [tvPowerState, settvPowerState] = React.useState(false);

  const tvPowerToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      await sendControlRequest(DeviceName.TV, Command.POWER, "1");
      settvPowerState(true);
    } else {
      await sendControlRequest(DeviceName.TV, Command.POWER, "0");
      settvPowerState(false);
    }
  };

  return (
    <Container>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <Box>
              <Typography variant="button" sx={{ mr: 2 }}>
                Power
              </Typography>
              <Switch onChange={tvPowerToggle} />
            </Box>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <Box>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={switchLoungeInput1} href="#">
            Chromecast
          </Button>
          <Button onClick={switchLoungeInput2} href="#">
            Lounge Computer
          </Button>
        </ButtonGroup>
      </Box>
      <Box id="tv"></Box>
    </Container>
  );
}

export default App;
