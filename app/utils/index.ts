import { Fn } from "../types/Common";

export const classNameJoiner = (...classList: unknown[]) => {
  return classList.filter((className) => !!className).join(" ");
};

export const checkIfChildren = (
  child: HTMLElement | null,
  parent: HTMLElement | null
) => {
  if (!child || !parent) return false;
  const allChildren: HTMLElement[] = [];
  const collectChildren = (DOM: HTMLElement) => {
    allChildren.push(DOM);
    [...DOM.children].forEach((child) => {
      collectChildren(child as HTMLElement);
    });
  };
  collectChildren(parent);
  return allChildren.includes(child);
};

export const debounce = (fn: Fn, timeout = 200) => {
  let flag = NaN;
  return () => {
    if (!isNaN(flag)) {
      return;
    }
    fn();
    flag = window.setTimeout(() => {
      flag = NaN;
    }, timeout);
  };
};
