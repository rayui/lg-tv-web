import React, { ChangeEventHandler } from "react";
import { Typography, Box } from "@mui/material";
import { Switch } from "@rmwc/switch";
import "@rmwc/switch/styles";

export type TVPowerSwitchProps = {
  powerToggle: ChangeEventHandler<HTMLInputElement>;
  powerState: boolean;
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
      <Switch onChange={powerToggle} checked={powerState} />
    </Box>
  );
};
