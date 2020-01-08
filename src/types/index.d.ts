import { Command } from "vuerd-core";

export interface Option {
  imageUpload?: (files: File[], callback: (url: string) => void) => void;
  scope?: string[] | RegExp[];
  exclude?: string[] | RegExp[];
  editorOption?: EditorOption;
}

export interface EditorOption {
  tabsize?: number;
  toolbar?: [string, Toolbar[]][] | boolean;
}

export type Toolbar =
  | "style"
  | "bold"
  | "underline"
  | "clear"
  | "fontname"
  | "color"
  | "ul"
  | "ol"
  | "paragraph"
  | "table"
  | "link"
  | "picture"
  | "video"
  | "fullscreen"
  | "codeview"
  | "help";

export declare function install(command: Command, option?: Option): void;
declare const _default: {
  install: typeof install;
};

export default _default;
