import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";

export const makeRequest = async (
  method: Method,
  url: string,
  body: any = undefined,
  headers: Record<string, string> = {},
  resolveWithFullResponse: boolean = false,
  customOptions: object = {}
): Promise<any> => {
  const fnName = "ApiUtil/makeRequest";
  console.info(`${fnName} - start`);
  console.info(`${fnName} - input params:`, {
    url,
    body,
    headers,
    resolveWithFullResponse,
    customOptions,
  });

  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options: AxiosRequestConfig = {
    method,
    url,
    headers: requestHeaders,
    data: body,
    ...customOptions,
  };

  try {
    console.info(`${fnName} - calling axios`);
    const response: AxiosResponse = await axios(options);
    console.info(
      `${fnName} - end`,
      resolveWithFullResponse ? response : response.data
    );
    return resolveWithFullResponse ? response : response.data;
  } catch (err) {
    console.error(`${fnName} - error`, err);
    return Promise.reject(err);
  }
};
