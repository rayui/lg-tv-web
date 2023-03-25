import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const AutoAdjustControl = () => {
  const [autoAdjust, setAutoAdjust] = React.useState(false);

  const autoAdjustToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    Client.sendControlRequest(Client.DeviceName.TV, Client.Command.AUTO_ADJUST)
      .then(({ result }) => {
        setAutoAdjust(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot set autoAdjust");
      });
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.AUTO_ADJUST)
      .then(({ result }) => {
        setAutoAdjust(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot get autoAdjust");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Switch onChange={autoAdjustToggle} checked={autoAdjust} />
      <Typography variant="button" sx={{ mr: 2 }}>
        Auto adjust {autoAdjust}
      </Typography>
    </Box>
  );
};
