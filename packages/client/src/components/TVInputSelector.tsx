import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

const availableInputs = [
  ["DTV", 0, 0],
  ["Analogue", 1, 0],
  ["AV", 2, 0],
  ["Component", 4, 0],
  ["RGB", 6, 0],
  ["HDMI 1", 9, 0],
  ["HDMI 2", 9, 1],
  ["HDMI 3", 9, 2],
  ["HDMI 4", 9, 3],
];

const switchInput = (input: number, port: number = 0) => {
  return async (event: React.MouseEvent<HTMLAnchorElement>) => {
    await Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.INPUT,
      `${input}`,
      `${port}`
    );
  };
};

const getSelectedInput = () => {
  return Client.getControlRequest(Client.DeviceName.TV, Client.Command.INPUT);
};

export const TVInputSelector = () => {
  const [selectedInput, setSelectedInput] = useState(0);

  useEffect(() => {
    getSelectedInput()
      .then(({ result }) => {
        setSelectedInput(parseInt(result, 16));
      })
      .catch((err) => {
        throw new Error("Cannot get selected input");
      });
  }, []);

  return (
    <Box sx={{ ml: 4 }}>
      <ButtonGroup variant="text" aria-label="text button group">
        {availableInputs.map((availableInput) => {
          const input = availableInput[1] as number;
          const port = availableInput[2] as number;
          const variant =
            input * 10 + port === selectedInput ? "contained" : "outlined";

          return (
            <Button
              onClick={switchInput(input, port)}
              href="#"
              variant={variant}
            >
              {availableInput[0]}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};
