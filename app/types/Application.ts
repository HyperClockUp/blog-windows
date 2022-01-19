import { Context } from "./Context";

export type ApplicationEventType =
  | "onCreated"
  | "onFocus"
  | "onBlur"
  | "onMaximized"
  | "onMinimized"
  | "onRestored"
  | "onClosed";

export type ApplicationEventHandler = (event: ApplicationEventType) => void;

export interface Application {
  app: () => JSX.Element | null;
  context: Context;
  handler: ApplicationEventHandler;
}
