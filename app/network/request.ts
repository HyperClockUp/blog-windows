import { RequestParams } from "../types/Request";
import { queryString } from "../utils/format";

export const post = async (url: string, data?: RequestParams) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  const json = await res.json();
  return json;
};

export const get = async (url: string, data?: RequestParams) => {
  const reqUrl = data ? `${url}?${queryString(data)}` : url;
  const res = await fetch(reqUrl, {
    method: "GET",
    mode: "cors",
  });
  const json = await res.json();
  return json;
};
