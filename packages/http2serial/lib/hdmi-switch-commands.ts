import * as dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";

export type HDMISwitchResult = {
  status: string;
  result: string;
};

dotenv.config();
const { env } = process;
const HDMI_ROUTER_URI = env.HDMI_ROUTER_URI || "http://hdmi/cgi-bin/instr";

const constructCommand = (input: string, output: number) => {
  return JSON.stringify({
    comhead: "video switch",
    source: [parseInt(input, 10), output],
  });
};

export const routeVideoOutput1 = async (
  state: string
): Promise<HDMISwitchResult> => {
  const input = constructCommand(state, 1);

  const { data, status } = await axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data: input,
  });

  return {
    status: status + "",
    result: data,
  };
};

export const routeVideoOutput2 = async (
  state: string
): Promise<HDMISwitchResult> => {
  const input = constructCommand(state, 2);

  const { data, status } = await axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data: input,
  });

  return {
    status: status + "",
    result: data,
  };
};
