import * as dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";

export type HDMISwitchResult = AxiosResponse<any, any>;

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
  const data = constructCommand(state, 1);

  return axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data: data,
  });
};

export const routeVideoOutput2 = async (
  state: string
): Promise<HDMISwitchResult> => {
  const data = constructCommand(state, 2);

  return axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data: data,
  });
};
