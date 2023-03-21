import { Container } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

import {
  TopBar,
  TVPowerSwitch,
  HDMISwitchInputSelector,
  TVInputSelector,
  VolumeControl,
  EnergySavingControl,
} from "./components";
import { Client } from "./lib";

function App() {
  const [powerState, setPowerState] = useState(false);

  const powerToggle = async (event: ChangeEvent<HTMLInputElement>) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.POWER,
      !powerState ? "1" : "0"
    )
      .then(({ result }) => {
        setPowerState(parseInt(result, 10) === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error(`Cannot set selected input. ${err}`);
      });
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.POWER)
      .then(({ result }) => {
        setPowerState(parseInt(result, 10) === 1 ? true : false);
      })
      .catch((err) => {
        throw new Error(`Cannot get selected input. ${err}`);
      });
  }, []);

  return (
    <Container disableGutters sx={{ p: 0 }}>
      <TopBar
        contents={
          <>
            <TVPowerSwitch powerToggle={powerToggle} powerState={powerState} />
          </>
        }
      />
      {powerState && (
        <>
          <HDMISwitchInputSelector />
          <TVInputSelector />
          <VolumeControl />
          <EnergySavingControl />
        </>
      )}
    </Container>
  );
}

export default App;
