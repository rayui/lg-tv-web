import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

type AvailableInput = [string, number];

const enum Output {
  LOUNGE = 0,
  OFFICE = 1,
}

const availableInputs: AvailableInput[] = [
  ["Chromecast", 1],
  ["Lounge Computer", 2],
  ["Nintendo Switch", 3],
  ["Info", 4],
];

export const HDMISwitchInputSelector = () => {
  const [selectedInputs, setSelectedInputs] = useState([
    Output.LOUNGE,
    Output.LOUNGE,
  ]);

  const setInputs = ({ result }: { result: number }) => {
    return setSelectedInputs([Math.floor(result / 10), result % 10]);
  };

  const getInputs = () => {
    Client.getControlRequest(
      Client.DeviceName.HDMI_SWITCH,
      Client.Command.HDMI_STATUS
    )
      .then(setInputs)
      .catch((err) => {
        throw new Error("Cannot get selected input");
      });
  };

  const switchInput = (input: number, output: Output) => {
    return async (event: React.MouseEvent<HTMLAnchorElement>) => {
      return await Client.sendControlRequest(
        Client.DeviceName.HDMI_SWITCH,
        output === Output.LOUNGE
          ? Client.Command.LOUNGE
          : Client.Command.OFFICE,
        input
      )
        .then(setInputs)
        .catch((err) => {
          throw new Error("Cannot set selected input");
        });
    };
  };

  const createButtons = (availableInput: AvailableInput, output: Output) => {
    const variant =
      availableInput[1] === selectedInputs[output] ? "contained" : "outlined";

    return (
      <Button
        onClick={switchInput(availableInput[1], output)}
        href="#"
        variant={variant}
      >
        {availableInput[0]}
      </Button>
    );
  };

  useEffect(getInputs, []);

  return (
    <Box sx={{ ml: 4, pt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="button" sx={{ mr: 2 }}>
          Lounge
        </Typography>

        <ButtonGroup variant="text" aria-label="text button group">
          {availableInputs.map((availableInput) =>
            createButtons(availableInput, Output.LOUNGE)
          )}
        </ButtonGroup>
      </Box>
      <Box>
        <Typography variant="button" sx={{ mr: 2 }}>
          Office
        </Typography>
        <ButtonGroup variant="text" aria-label="text button group">
          {availableInputs.map((availableInput) =>
            createButtons(availableInput, Output.OFFICE)
          )}
        </ButtonGroup>
      </Box>
    </Box>
  );
};
