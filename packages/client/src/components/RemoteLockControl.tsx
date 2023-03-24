import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const RemoteLockControl = () => {
  const [remoteLock, setRemoteLock] = React.useState(false);

  const remoteLockToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.REMOTE_LOCK,
      !remoteLock ? "1" : "0"
    )
      .then(({ result }) => {
        setRemoteLock(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot set remoteLock");
      });
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.REMOTE_LOCK)
      .then(({ result }) => {
        setRemoteLock(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot get remoteLock");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Switch onChange={remoteLockToggle} checked={remoteLock} />
      <Typography variant="button" sx={{ mr: 2 }}>
        Remote lock {remoteLock}
      </Typography>
    </Box>
  );
};
