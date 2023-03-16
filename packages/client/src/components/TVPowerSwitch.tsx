import React from "react";
import { Typography, Box } from "@mui/material";
import { Switch } from "@rmwc/switch";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const TVPowerSwitch = () => {
  const [tvPowerState, settvPowerState] = React.useState(false);

  const tvPowerToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      await Client.sendControlRequest(
        Client.DeviceName.TV,
        Client.Command.POWER,
        "1"
      );
      settvPowerState(true);
    } else {
      await Client.sendControlRequest(
        Client.DeviceName.TV,
        Client.Command.POWER,
        "0"
      );
      settvPowerState(false);
    }
  };

  return (
    <Box sx={{ ml: 4 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Power
      </Typography>
      <Switch onChange={tvPowerToggle} checked={tvPowerState} />
    </Box>
  );
};
