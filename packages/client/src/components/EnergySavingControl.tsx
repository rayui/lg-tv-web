import React from "react";
import { Typography, Box, Switch } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const EnergySavingControl = () => {
  const [energySaving, setenergySaving] = React.useState(0);
  const [screenMuted, setScreenMuted] = React.useState(false);

  const energySavingChange = async (
    event: Event,
    newValue: number | number[]
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.ENERGY,
      `${newValue as number}`
    );
    setenergySaving(newValue as number);
  };

  const volumeMuteToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.SCR_MUTE,
      !screenMuted ? "1" : "0"
    );

    setScreenMuted(!screenMuted);
  };

  return (
    <Box sx={{ ml: 5 }}>
      <Switch onChange={volumeMuteToggle} checked={screenMuted} />
      <Typography variant="button" sx={{ mr: 2 }}>
        Energy saving {energySaving}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={3}
          step={1}
          value={energySaving}
          onChange={energySavingChange}
        />
      </Box>
    </Box>
  );
};
