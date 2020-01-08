import Vue from "vue";
import VuerdCore, { Command, Tree, TreeMove, TreeSave } from "vuerd-core";
import Summernote from "@/components";
import "vuerd-core/dist/vuerd-core.css";

const dataList: Array<{ path: string; value: string }> = [
  {
    path: "example/summernote editor.rich",
    value: "<h1>hellow</h1>"
  }
];

async function findFileByPath(path: string): Promise<string> {
  let value = "";
  for (const data of dataList) {
    if (data.path === path) {
      value = data.value;
      break;
    }
  }
  return value;
}

async function findTreeBy(): Promise<Tree> {
  return {
    name: "example",
    open: true,
    children: [
      {
        name: "summernote editor.rich"
      }
    ]
  } as Tree;
}

async function save(treeSaves: TreeSave[]): Promise<void> {}
async function deleteByPaths(paths: string[]): Promise<void> {}
async function move(treeMove: TreeMove): Promise<void> {}

VuerdCore.use({
  install(command: Command): void {
    command.remoteAdd({
      name: "vuerd",
      findTreeBy,
      findFileByPath,
      save,
      deleteByPaths,
      move
    });
  }
});

VuerdCore.use(Summernote);
Vue.use(VuerdCore);
