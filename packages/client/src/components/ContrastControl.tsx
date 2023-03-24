import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const ContrastControl = () => {
  const [contrast, setContrast] = React.useState(0);

  const contrastChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.CONTRAST,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set contrast");
    });

    setContrast(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.CONTRAST)
      .then(({ result }) => {
        setContrast(result);
      })
      .catch((err) => {
        throw new Error("Cannot get contrast");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Contrast {contrast}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={contrast}
          onChange={contrastChange}
        />
      </Box>
    </Box>
  );
};
