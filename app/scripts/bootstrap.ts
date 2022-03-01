import { TodoProgram } from "./../AppList";
import { createParentProcess } from "../features/core/CoreSlice";
import { store } from "./../store";

export const bootstrap = () => {
  store.dispatch(
    createParentProcess(TodoProgram.id)
  );
};