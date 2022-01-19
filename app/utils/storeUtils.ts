import { Process } from "./../types/Process";
import { store } from "./../store";
import { Program } from "./../types/Program";
import { CoreState } from "../features/core/CoreSlice";
import { Draft } from "@reduxjs/toolkit";

export const getProgramById = (id: Program["id"], state?: Draft<CoreState>) => {
  const core = state || store.getState().core;
  return core.programs[id] || null;
};

export const getProgramsByName = (
  name: Program["name"],
  state?: Draft<CoreState>
) => {
  const core = state || store.getState().core;
  return Object.values(core.programs).filter(
    (program) => program.name === name
  );
};

export const getProcessById = (id: Process["id"], state?: Draft<CoreState>) => {
  const core = state || store.getState().core;
  return core.processes.find((process) => process.id === id) || null;
};

export const getProcessesByName = (
  name: Program["name"],
  state?: Draft<CoreState>
) => {
  const core = state || store.getState().core;
  return core.processes.filter(
    (process) => process.name === name
  );
};
