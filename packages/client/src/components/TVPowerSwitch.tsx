import React from "react";
import { Typography, Box } from "@mui/material";
import { Switch } from "@rmwc/switch";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const TVPowerSwitch = () => {
  const [powerState, setPowerState] = React.useState(false);

  const powerToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.POWER,
      !powerState ? "1" : "0"
    );
    setPowerState(!powerState);
  };

  return (
    <Box sx={{ ml: 4 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Power
      </Typography>
      <Switch onChange={powerToggle} checked={powerState} />
    </Box>
  );
};
