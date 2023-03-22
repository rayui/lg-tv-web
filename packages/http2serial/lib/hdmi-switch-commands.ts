import * as dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";

export type HDMISwitchResult = {
  status: string;
  result: number;
};

export type RouteVideoOutputParams = {
  input: number;
  output: number;
};

dotenv.config();
const { env } = process;
const HDMI_ROUTER_URI = env.HDMI_ROUTER_URI || "http://hdmi/cgi-bin/instr";

const createSwitchCommand = (input: number, output: number) => {
  return {
    comhead: "video switch",
    source: [input, output],
  };
};

const createGetCommand = () => {
  return { comhead: "get video status" };
};

const decodeRouting = (response: AxiosResponse<any, any>) => {
  const { status, data } = response;

  return {
    status: status === 200 ? "OK" : "NG",
    result: parseInt(data.allsource.join(""), 10),
  };
};

export const routeVideoOutput = async ({
  input,
  output,
}: RouteVideoOutputParams): Promise<HDMISwitchResult> => {
  const data = createSwitchCommand(input, output);

  console.log(`Set routing`);
  console.log(
    JSON.stringify({
      method: "post",
      url: HDMI_ROUTER_URI,
      data,
    })
  );

  return await axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data,
  }).then(getVideoRouting);
};

export const getVideoRouting = async (): Promise<HDMISwitchResult> => {
  const data = createGetCommand();

  console.log(`Get routing`);
  console.log(
    JSON.stringify({
      method: "post",
      url: HDMI_ROUTER_URI,
      data,
    })
  );

  const response = await axios({
    method: "post",
    url: HDMI_ROUTER_URI,
    data,
  });

  return decodeRouting(response);
};
