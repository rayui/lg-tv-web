import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const OSDControl = () => {
  const [osd, setOSD] = React.useState(false);

  const osdToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.OSD,
      !osd ? "1" : "0"
    )
      .then(({ result }) => {
        setOSD(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot set osd");
      });
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.OSD)
      .then(({ result }) => {
        setOSD(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot get osd");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Switch onChange={osdToggle} checked={osd} />
      <Typography variant="button" sx={{ mr: 2 }}>
        Onscreen display {osd}
      </Typography>
    </Box>
  );
};
