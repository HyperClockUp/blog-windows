// process center, to manager all process here
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProgramById, getProcessById } from "../../utils/storeUtils";
import { Process } from "../../types/Process";
import { Program } from "../../types/Program";
import { processMsg } from "../message/process";
import { programMsg } from "../message/program";
import { rootProcess } from "./Process";
import ProgramClass from "./Program";
import { WindowsState } from "../../types/Windows";

const zIndex = (() => {
  let _zIndex = 0;
  return () => {
    _zIndex += 1;
    return _zIndex;
  };
})();

export interface CoreState {
  processes: Process[];
  processId: number;
  programs: Record<Program["id"], ProgramClass>;
  windows: Record<Process["id"], WindowsState>;
}

const initialCoreState: CoreState = {
  processes: [],
  processId: 0,
  programs: {},
  windows: {},
};

export const coreSlice = createSlice({
  name: "core",
  initialState: initialCoreState,
  reducers: {
    createParentProcess(state, action: PayloadAction<Program["id"]>) {
      const programId = action.payload;
      const targetProgram = getProgramById(programId, state);
      state.processId += 1;
      const newProcess: Process = {
        programId,
        name: targetProgram.name,
        id: state.processId,
        parent: rootProcess,
      };
      state.processes.push(newProcess);
    },
    createChildProcess(state, action: PayloadAction<Process["id"]>) {
      const parentProcessId = action.payload;
      const parentProcess = getProcessById(parentProcessId);
      if (!parentProcess) {
        throw new Error(processMsg["PARENT_PROCESS_NOT_FOUND"]);
      }
      state.processId += 1;
      const newProcess: Process = {
        programId: parentProcess.programId,
        name: parentProcess.name,
        id: state.processId,
        parent: parentProcess,
      };
      state.processes.push(newProcess);
    },
    killProcess(state, action: PayloadAction<Process["id"]>) {
      const processId = action.payload;
      const targetProcess = getProcessById(processId, state);
      if (!targetProcess) {
        throw new Error(processMsg["PROCESS_NOT_FOUND"]);
      }
      state.processes = state.processes.filter((process) => {
        if (process.parent instanceof ProgramClass) {
          return process.parent.id !== processId;
        }
        return process.id !== processId && process.parent !== processId;
      });
    },
    moveWindowToTop(state, action: PayloadAction<Process["id"]>) {
      const processId = action.payload;
      state.windows[processId].zIndex = zIndex();
    },
    installProgram(state, action: PayloadAction<Program>) {
      const program = action.payload;
      state.programs[program.id] = program;
    },
    uninstallProgram(state, action: PayloadAction<Program["id"]>) {
      const programId = action.payload;
      if (!programId) {
        throw new Error(programMsg["PROGRAM_NOT_INSTALL"]);
      }
      Reflect.deleteProperty(state, programId);
    },
    batchInstallProgram(state, action: PayloadAction<Program[]>) {
      const programs = action.payload;
      programs.forEach((program) => {
        state.programs[program.id] = program;
      });
    },
    batchUninstallProgram(state, action: PayloadAction<Program["id"][]>) {
      const programIds = action.payload;
      programIds.forEach((programId) => {
        if (!programId) {
          throw new Error(programMsg["PROGRAM_NOT_INSTALL"]);
        }
        Reflect.deleteProperty(state, programId);
      });
    },
  },
});

export const {
  createParentProcess,
  createChildProcess,
  killProcess,
  moveWindowToTop,
  installProgram,
  uninstallProgram,
  batchInstallProgram,
  batchUninstallProgram,
} = coreSlice.actions;

export default coreSlice.reducer;
