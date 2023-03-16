import React from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const InputSelector = () => {
  const switchLoungeInput1 = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    await Client.sendControlRequest(
      Client.DeviceName.HDMI_SWITCH,
      Client.Command.LOUNGE,
      "1"
    );
  };

  const switchLoungeInput2 = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    await Client.sendControlRequest(
      Client.DeviceName.HDMI_SWITCH,
      Client.Command.LOUNGE,
      "2"
    );
  };

  return (
    <Box sx={{ ml: 4 }}>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={switchLoungeInput1} href="#">
          Chromecast
        </Button>
        <Button onClick={switchLoungeInput2} href="#">
          Lounge Computer
        </Button>
      </ButtonGroup>
    </Box>
  );
};