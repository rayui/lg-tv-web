import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const TemperatureControl = () => {
  const [temperature, setTemperature] = React.useState(0);

  const temperatureChange = async (
    event: Event,
    newValue: number | number[]
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.TEMPERATURE,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set temperature");
    });

    setTemperature(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.TEMPERATURE)
      .then(({ result }) => {
        setTemperature(result);
      })
      .catch((err) => {
        throw new Error("Cannot get temperature");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Temperature {temperature}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={temperature}
          onChange={temperatureChange}
        />
      </Box>
    </Box>
  );
};
