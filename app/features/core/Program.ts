import { Program } from "../../types/Program";
import { Application } from '../../types/Application';

export default class ProgramClass implements Program {
  public name = 'init';
  public id = 0;
  public app?: Application;
  public title = 'init';

  constructor(name: Program['name'], id: Program['id'], title: Program['title'], app?: Program['app']) {
    this.id = id;
    this.name = name;
    this.app = app;
    this.title = title;
  }
}

export const systemProgram: Program = {
  id: 0,
  name: 'system',
  title: "系统进程",
};

Object.setPrototypeOf(systemProgram, ProgramClass.prototype);
