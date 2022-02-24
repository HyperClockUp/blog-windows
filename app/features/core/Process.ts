import { getProcessById } from './../../utils/storeUtils';
import { Program } from './../../types/Program';
import { Process } from "../../types/Process";
import { getProgramById } from '../../utils/storeUtils';
import { systemProgram } from './Program';

export default class ProcessClass implements Process {
  public name = '';
  public id = 0;
  public parent: number | Process = this;
  public programId: Program['id'];

  constructor(programId: Program['id'], processId: Process['id'], parentId: Process['id'] = 0) {
    const targetProgram = getProgramById(programId);
    this.name = targetProgram.name;
    this.id = processId;
    const parentProcess = getProcessById(parentId);
    this.parent = parentProcess || this;
    this.programId = programId;
  }
}

export const rootProcess: Process = {
  id: 0,
  name: 'root',
  parent: 0,
  programId: systemProgram.id,
};

rootProcess.parent = rootProcess;

Object.setPrototypeOf(rootProcess, ProcessClass.prototype);

