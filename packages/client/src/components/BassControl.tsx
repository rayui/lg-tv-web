import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const BassControl = () => {
  const [bass, setBass] = React.useState(0);

  const bassChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.BASS,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set bass");
    });

    setBass(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.BASS)
      .then(({ result }) => {
        setBass(result);
      })
      .catch((err) => {
        throw new Error("Cannot get bass");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Bass {bass}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={bass}
          onChange={bassChange}
        />
      </Box>
    </Box>
  );
};
