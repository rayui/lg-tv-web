import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

const availableInputs = [
  ["DTV", "00"],
  ["Analogue", "10"],
  ["AV", "20"],
  ["Component", "40"],
  ["RGB", "60"],
  ["HDMI 1", "90"],
  ["HDMI 2", "91"],
  ["HDMI 3", "92"],
  ["HDMI 4", "93"],
];

export const TVInputSelector = () => {
  const [selectedInput, setSelectedInput] = useState(availableInputs[0][1]);

  const switchInput = (input: string) => {
    return async (event: React.MouseEvent<HTMLAnchorElement>) => {
      Client.sendControlRequest(
        Client.DeviceName.TV,
        Client.Command.INPUT,
        input[0],
        input[1]
      )
        .then(({ result }) => {
          setSelectedInput(result);
        })
        .catch((err) => {
          throw new Error("Cannot set selected input");
        });
    };
  };

  const createButtons = (availableInput: string[]) => {
    const variant =
      availableInput[1] === selectedInput ? "contained" : "outlined";

    return (
      <Button
        onClick={switchInput(availableInput[1])}
        href="#"
        variant={variant}
      >
        {availableInput[0]}
      </Button>
    );
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.INPUT)
      .then(({ result }) => {
        setSelectedInput(result);
      })
      .catch((err) => {
        throw new Error("Cannot get selected input");
      });
  }, []);

  return (
    <Box sx={{ ml: 4 }}>
      <ButtonGroup variant="text" aria-label="text button group">
        {availableInputs.slice(0, 4).map(createButtons)}
      </ButtonGroup>
      <ButtonGroup variant="text" aria-label="text button group">
        {availableInputs.slice(5).map(createButtons)}
      </ButtonGroup>
    </Box>
  );
};
