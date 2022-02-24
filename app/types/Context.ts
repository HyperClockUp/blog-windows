export interface ContextItem {
  icon?: string;
  title: string;
  handler: () => void;
}

export type Context = ContextItem[];