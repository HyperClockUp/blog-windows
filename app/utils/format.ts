import { RequestParams } from "../types/Request";

export const queryString = (obj: RequestParams) => {
  const str = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
  return str;
};

export const toFixed = (num: number, fixed = 2) => {
  return (num | 0).toString().padStart(fixed, "0");
};
