import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const BacklightControl = () => {
  const [backlight, setBacklight] = React.useState(0);

  const backlightChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.BACKLIGHT,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set backlight");
    });

    setBacklight(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.BACKLIGHT)
      .then(({ result }) => {
        setBacklight(result);
      })
      .catch((err) => {
        throw new Error("Cannot get backlight");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Backlight {backlight}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={backlight}
          onChange={backlightChange}
        />
      </Box>
    </Box>
  );
};
