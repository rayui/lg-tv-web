import { Box } from "@mui/material";
import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
} from "@rmwc/top-app-bar";
import "@rmwc/top-app-bar/styles";

export interface TopBarProps {
  contents?: React.ReactElement;
}

export function TopBar(props: TopBarProps) {
  return (
    <Box>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>{props.contents}</TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </Box>
  );
}
