import { RequestParams } from "../types/Request";
import { queryString } from "../utils/format";

export const post = (url: string, data?: RequestParams) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  }).then((res) => res.json());
};

export const get = (url: string, data?: RequestParams) => {
  const reqUrl = data ? `${url}?${queryString(data)}` : url;
  return fetch(reqUrl, {
    method: "GET",
    mode: "cors",
  }).then((res) => res.json());
};
