import { Container } from "@mui/material";

import {
  TopBar,
  TVPowerSwitch,
  HDMISwitchInputSelector,
  TVInputSelector,
  VolumeControl,
  EnergySavingControl,
} from "./components";

function App() {
  return (
    <Container disableGutters sx={{ p: 0 }}>
      <TopBar
        contents={
          <>
            <TVPowerSwitch />
          </>
        }
      />
      <HDMISwitchInputSelector />
      <TVInputSelector />
      <VolumeControl />
      <EnergySavingControl />
    </Container>
  );
}

export default App;
