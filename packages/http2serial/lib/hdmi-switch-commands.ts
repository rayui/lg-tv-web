import * as dotenv from "dotenv";
import axios, { Axios, AxiosResponse } from "axios";

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

const decodeResult = (response: AxiosResponse<any, any>) => {
  const { status, data } = response;
  return {
    status: status === 200 ? "OK" : "NG",
    result: data.result,
  };
};

export const routeVideoOutput1 = async (
  state: string
): Promise<HDMISwitchResult> => {
  const input = constructCommand(state, 1);

  const response = await axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data: input,
  });

  return decodeResult(response);
};

export const routeVideoOutput2 = async (
  state: string
): Promise<HDMISwitchResult> => {
  const input = constructCommand(state, 2);

  const response = await axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data: input,
  });

  return decodeResult(response);
};
