import React, { useEffect } from "react";
import { Typography, Box, Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const SharpnessControl = () => {
  const [sharpness, setSharpness] = React.useState(0);

  const sharpnessChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.SHARPNESS,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set sharpness");
    });

    setSharpness(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.SHARPNESS)
      .then(({ result }) => {
        setSharpness(result);
      })
      .catch((err) => {
        throw new Error("Cannot get sharpness");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Sharpness {sharpness}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={sharpness}
          onChange={sharpnessChange}
        />
      </Box>
    </Box>
  );
};
