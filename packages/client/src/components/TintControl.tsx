import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const TintControl = () => {
  const [tint, setTint] = React.useState(0);

  const tintChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.TINT,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set tint");
    });

    setTint(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.TINT)
      .then(({ result }) => {
        setTint(result);
      })
      .catch((err) => {
        throw new Error("Cannot get tint");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Tint {tint}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={tint}
          onChange={tintChange}
        />
      </Box>
    </Box>
  );
};
