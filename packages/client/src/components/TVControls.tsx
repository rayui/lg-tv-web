import { ChangeEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "@rmwc/switch/styles";

import {
  TVPowerSwitch,
  TVInputSelector,
  PowerState,
  TV_EDGE_TIME,
  VolumeControl,
  EnergySavingControl,
  BrightnessControl,
  ContrastControl,
  ColourControl,
  TintControl,
  TrebleControl,
  BassControl,
  BalanceControl,
  TemperatureControl,
  OSDControl,
  RemoteLockControl,
  AutoAdjustControl,
} from ".";

import { Client } from "../lib";

export const TVControls = () => {
  const [powerState, setPowerState] = useState(PowerState.OFF);

  const getPowerState = () => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.POWER)
      .then(({ result }) => {
        setPowerState(result === 1 ? PowerState.ON : PowerState.OFF);
      })
      .catch((err) => {
        throw new Error(`Cannot get power state. ${err}`);
      });
  };

  const powerToggle = async (event: ChangeEvent<HTMLInputElement>) => {
    if (powerState === PowerState.EDGE) return;

    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.POWER,
      powerState === PowerState.OFF ? "1" : "0"
    )
      .then(({ result }) => {
        if (result === 1) {
          setTimeout(getPowerState, TV_EDGE_TIME);
          setPowerState(PowerState.EDGE);
          return;
        }
        setPowerState(PowerState.OFF);
      })
      .catch((err) => {
        throw new Error(`Cannot set power state. ${err}`);
      });
  };

  useEffect(getPowerState, []);

  return (
    <Box sx={{ pt: 2 }}>
      <TVPowerSwitch powerToggle={powerToggle} powerState={powerState} />
      {powerState === PowerState.EDGE && (
        <Box sx={{ pt: 2 }}>
          <Typography variant="body1">Turning on...</Typography>
        </Box>
      )}
      {powerState === PowerState.ON && (
        <Box sx={{ pt: 2 }}>
          <VolumeControl />
          <Box>
            <TrebleControl />
            <BassControl />
            <BalanceControl />
          </Box>
          <EnergySavingControl />
          <Box>
            <BrightnessControl />
            <ContrastControl />
            <ColourControl />
            <TintControl />
            <TemperatureControl />
          </Box>
          <TVInputSelector />
          <Box>
            <OSDControl />
            <RemoteLockControl />
            <AutoAdjustControl />
          </Box>
        </Box>
      )}
    </Box>
  );
};
