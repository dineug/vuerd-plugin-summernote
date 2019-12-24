import Summernote from "./Summernote.vue";
import { Command, Editor } from "vuerd-core";
import { Option } from "@/types";

export default {
  install(command: Command, option?: Option) {
    const editor: Editor = {
      name: "summernote",
      component: Summernote,
      scope: ["rich"],
      option: {
        readme: {
          owner: "vuerd",
          repo: "vuerd-plugin-summernote"
        }
      }
    };
    if (option) {
      if (typeof option.imageUpload === "function") {
        Summernote.prototype.imageUpload = option.imageUpload;
      }
      if (option.scope !== undefined) {
        editor.scope = option.scope;
      }
      if (option.exclude !== undefined) {
        editor.exclude = option.exclude;
      }
    }
    command.editorAdd(editor);
  }
};
