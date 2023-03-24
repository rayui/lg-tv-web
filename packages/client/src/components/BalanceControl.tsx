import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Slider } from "@mui/material";
import "@rmwc/switch/styles";

import { Client } from "../lib";

export const BalanceControl = () => {
  const [balance, setBalance] = React.useState(0);

  const balanceChange = async (event: Event, newValue: number | number[]) => {
    Client.sendControlRequest(
      Client.DeviceName.TV,
      Client.Command.BALANCE,
      `${newValue as number}`
    ).catch((err) => {
      throw new Error("Cannot set balance");
    });

    setBalance(newValue as number);
  };

  useEffect(() => {
    Client.getControlRequest(Client.DeviceName.TV, Client.Command.BALANCE)
      .then(({ result }) => {
        setBalance(result);
      })
      .catch((err) => {
        throw new Error("Cannot get balance");
      });
  }, []);

  return (
    <Box sx={{ ml: 5 }}>
      <Typography variant="button" sx={{ mr: 2 }}>
        Balance {balance}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          sx={{ width: `80%` }}
          min={0}
          max={100}
          step={1}
          value={balance}
          onChange={balanceChange}
        />
      </Box>
    </Box>
  );
};
