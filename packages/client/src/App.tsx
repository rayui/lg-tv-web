import { Container } from "@mui/material";

import {
  TopBar,
  TVPowerSwitch,
  InputSelector,
  VolumeControl,
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
      <InputSelector />
      <VolumeControl />
    </Container>
  );
}

export default App;
