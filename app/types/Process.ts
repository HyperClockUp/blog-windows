import { Program } from "./Program";
export interface Process {
  name: string;
  id: number;
  parent: number | Process;
  programId: Program["id"];
}
