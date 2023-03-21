import { Container } from "@mui/material";
import { useState } from "react";

import {
  TopBar,
  TVControls,
  HDMISwitchInputSelector,
  Pane,
} from "./components";

function App() {
  const [pane, setPane] = useState(Pane.HDMI_SWITCH);

  return (
    <Container disableGutters sx={{ p: 0 }}>
      <TopBar pane={pane} setPane={setPane} />
      {pane === Pane.HDMI_SWITCH && <HDMISwitchInputSelector />}
      {pane === Pane.TV_CONTROLS && <TVControls />}
    </Container>
  );
}

export default App;
