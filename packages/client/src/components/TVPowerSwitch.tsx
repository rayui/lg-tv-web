import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Switch } from "@rmwc/switch";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const TVPowerSwitch = () => {
  const [powerState, setPowerState] = React.useState(false);

  const powerToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.POWER,
      !powerState ? "1" : "0"
    )
      .then(({ result }) => {
        setPowerState(result === "01" ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot set selected input");
      });
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.POWER)
      .then(({ result }) => {
        setPowerState(result === "01" ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot get selected input");
      });
  }, []);

  return (
    <Box sx={{ ml: 4 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Power
      </Typography>
      <Switch onChange={powerToggle} checked={powerState} />
    </Box>
  );
};
