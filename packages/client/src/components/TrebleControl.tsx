import React, { useEffect } from "react";
import { Typography, Box, Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const TrebleControl = () => {
  const [treble, setTreble] = React.useState(0);

  const trebleChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.TREBLE,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set treble");
    });

    setTreble(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.TREBLE)
      .then(({ result }) => {
        setTreble(result);
      })
      .catch((err) => {
        throw new Error("Cannot get treble");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Treble {treble}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={treble}
          onChange={trebleChange}
        />
      </Box>
    </Box>
  );
};
