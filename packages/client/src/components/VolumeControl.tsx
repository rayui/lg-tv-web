import React from "react";
import { Typography, Box } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const VolumeControl = () => {
  const [tvVolume, settvVolume] = React.useState(0);

  const tvVolumeChange = async (event: Event, newValue: number | number[]) => {
    await Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.VOLUME,
      `${newValue as number}`
    );
    settvVolume(newValue as number);
  };

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Volume {tvVolume}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={tvVolume}
          onChange={tvVolumeChange}
        />
      </Box>
    </Box>
  );
};