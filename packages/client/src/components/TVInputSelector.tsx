import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

type AvailableInput = [string, number];

const availableInputs: AvailableInput[] = [
  ["DTV", 0x0],
  ["Analogue", 0x10],
  ["AV", 0x20],
  ["Component", 0x40],
  ["RGB", 0x60],
  ["HDMI 1", 0x90],
  ["HDMI 2", 0x91],
  ["HDMI 3", 0x92],
  ["HDMI 4", 0x93],
];

export const TVInputSelector = () => {
  const [selectedInput, setSelectedInput] = useState(availableInputs[0][1]);

  const switchInput = (input: number) => {
    return async (event: React.MouseEvent<HTMLAnchorElement>) => {
      Client.sendControlRequest(
        Client.DeviceName.TV,
        Client.Command.INPUT,
        input.toString(10)
      )
        .then(({ result }) => {
          setSelectedInput(result);
        })
        .catch((err) => {
          throw new Error("Cannot set selected input");
        });
    };
  };

  const createButtons = (availableInput: AvailableInput) => {
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
        {availableInputs.slice(0, 5).map(createButtons)}
      </ButtonGroup>
      <ButtonGroup variant="text" aria-label="text button group">
        {availableInputs.slice(5).map(createButtons)}
      </ButtonGroup>
    </Box>
  );
};
