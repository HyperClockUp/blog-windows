export enum WindowsShowMode{
  NORMAL = 'normal',
  MAXIMIZED = 'maximized',
  MINIMIZED = 'minimized',
}

export interface WindowsState {
  showMode: WindowsShowMode;
  visible: boolean;
  zIndex: number;
}
