import React, { ChangeEventHandler } from "react";
import { Typography, Box, Switch } from "@mui/material";
import "@rmwc/switch/styles";

export const TV_EDGE_TIME = 7000;

export const enum PowerState {
  "ON",
  "EDGE",
  "OFF",
}

export type TVPowerSwitchProps = {
  powerToggle: ChangeEventHandler<HTMLInputElement>;
  powerState: PowerState;
};

export const TVPowerSwitch = ({
  powerToggle,
  powerState,
}: TVPowerSwitchProps) => {
  return (
    <Box sx={{ ml: 4 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Power
      </Typography>
      <Switch onChange={powerToggle} checked={powerState !== PowerState.OFF} />
    </Box>
  );
};
