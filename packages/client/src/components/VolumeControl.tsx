import React from "react";
import { Typography, Box, Switch } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const VolumeControl = () => {
  const [volume, setVolume] = React.useState(0);
  const [volumeMuted, setVolumeMuted] = React.useState(false);

  const volumeChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.VOLUME,
      `${newValue as number}`
    );
    setVolume(newValue as number);
  };

  const volumeMuteToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.VOL_MUTE,
      !volumeMuted ? "1" : "0"
    );

    setVolumeMuted(!volumeMuted);
  };

  return (
    <Box sx={{ ml: 5 }}>
      <Switch onChange={volumeMuteToggle} checked={volumeMuted} />
      <Typography variant="button" sx={{ mr: 2 }}>
        Volume {volume}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={volumeChange}
        />
      </Box>
    </Box>
  );
};
