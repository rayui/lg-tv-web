import React from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const TVInputSelector = () => {
  const switchInput = (input: number, port: number = 0) => {
    return async (event: React.MouseEvent<HTMLAnchorElement>) => {
      await Client.sendControlRequest(
        Client.DeviceName.TV,
        Client.Command.INPUT,
        `${input}`,
        `${port}`
      );
    };
  };

  return (
    <Box sx={{ ml: 4 }}>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={switchInput(0)} href="#">
          DTV
        </Button>
        <Button onClick={switchInput(1)} href="#">
          Analogue
        </Button>
        <Button onClick={switchInput(2)} href="#">
          AV
        </Button>
        <Button onClick={switchInput(4)} href="#">
          Component
        </Button>
        <Button onClick={switchInput(6)} href="#">
          RGB
        </Button>
        <Button onClick={switchInput(7, 0)} href="#">
          HDMI 1
        </Button>
        <Button onClick={switchInput(7, 1)} href="#">
          HDMI 2
        </Button>
        <Button onClick={switchInput(7, 2)} href="#">
          HDMI 3
        </Button>
        <Button onClick={switchInput(7, 3)} href="#">
          HDMI 4
        </Button>
      </ButtonGroup>
    </Box>
  );
};
