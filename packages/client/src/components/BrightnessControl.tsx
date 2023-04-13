import React, { useEffect } from "react";
import { Typography, Box, Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const BrightnessControl = () => {
  const [brightness, setBrightness] = React.useState(0);

  const brightnessChange = async (
    event: Event,
    newValue: number | number[]
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.BRIGHTNESS,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set brightness");
    });

    setBrightness(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.BRIGHTNESS)
      .then(({ result }) => {
        setBrightness(result);
      })
      .catch((err) => {
        throw new Error("Cannot get brightness");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Brightness {brightness}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={brightness}
          onChange={brightnessChange}
        />
      </Box>
    </Box>
  );
};
