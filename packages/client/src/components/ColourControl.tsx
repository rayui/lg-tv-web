import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const ColourControl = () => {
  const [colour, setColour] = React.useState(0);

  const colourChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.COLOUR,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set colour");
    });

    setColour(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.COLOUR)
      .then(({ result }) => {
        setColour(result);
      })
      .catch((err) => {
        throw new Error("Cannot get colour");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Colour {colour}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={colour}
          onChange={colourChange}
        />
      </Box>
    </Box>
  );
};
