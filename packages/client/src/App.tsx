import { Container } from "@mui/material";

import { TopBar, TVPowerSwitch, InputSelector } from "./components";

function App() {
  return (
    <Container>
      <TopBar
        contents={
          <>
            <TVPowerSwitch />
          </>
        }
      />
      <InputSelector />
    </Container>
  );
}

export default App;
