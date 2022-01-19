import { Application } from "./Application";

export interface Program {
  name: string;
  title: string;
  id: number;
  icon?: string;
  app?: Application;
}