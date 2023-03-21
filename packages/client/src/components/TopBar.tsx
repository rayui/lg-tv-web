import { Box, Button, ButtonGroup } from "@mui/material";
import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
} from "@rmwc/top-app-bar";
import "@rmwc/top-app-bar/styles";
import { Dispatch, SetStateAction } from "react";

export interface TopBarProps {
  pane: number;
  setPane: Dispatch<SetStateAction<Pane>>;
}

export const enum Pane {
  HDMI_SWITCH,
  TV_CONTROLS,
  TV_REMOTE,
}

const getVariant = (pane: Pane, target: Pane) => {
  return pane === target ? "contained" : "outlined";
};

export function TopBar({ pane, setPane }: TopBarProps) {
  return (
    <Box>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <ButtonGroup variant="text" aria-label="text button group">
              <Button
                onClick={() => {
                  setPane(Pane.HDMI_SWITCH);
                }}
                href="#"
                variant={getVariant(pane, Pane.HDMI_SWITCH)}
              >
                HDMI Switch
              </Button>
              <Button
                onClick={() => {
                  setPane(Pane.TV_CONTROLS);
                }}
                href="#"
                variant={getVariant(pane, Pane.TV_CONTROLS)}
              >
                TV Controls
              </Button>
            </ButtonGroup>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </Box>
  );
}
