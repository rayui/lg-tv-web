import React, { useEffect } from "react";
import { Typography, Box, Switch } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const EnergySavingControl = () => {
  const [energySaving, setenergySaving] = React.useState(0);
  const [screenMuted, setScreenMuted] = React.useState(false);

  const energySavingChange = async (
    event: Event,
    newValue: number | number[]
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.ENERGY,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set energy saving");
    });

    setenergySaving(newValue as number);
  };

  const screenMuteToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.SCR_MUTE,
      !screenMuted ? "1" : "0"
    )
      .then(({ result }) => {
        setScreenMuted(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot set screen mute");
      });
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.ENERGY)
      .then(({ result }) => {
        setenergySaving(result);
      })
      .catch((err) => {
        throw new Error("Cannot get energy saving");
      });

    Client.getControlRequest(Client.DeviceName.TV, Client.Command.SCR_MUTE)
      .then(({ result }) => {
        setScreenMuted(result === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error("Cannot get screen mute");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Switch onChange={screenMuteToggle} checked={screenMuted} />
      <Typography variant="button" sx={{ mr: 2 }}>
        Energy saving {energySaving}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={4}
          step={1}
          value={energySaving}
          onChange={energySavingChange}
        />
      </Box>
    </Box>
  );
};
