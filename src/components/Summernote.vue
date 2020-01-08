<template>
  <div ref="editor"></div>
</template>

<script lang="ts">
import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.min";
import $ from "jquery";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { EditorOption } from "@/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

const TOOLBAR_HEIGHT = 43;

interface Callbacks {
  onChange(value: string): void;
  onImageUpload?(files: File[]): void;
}

const optionKeys = ["tabsize", "toolbar"];

let emojis: string[] = [];
let emojiUrls: any = [];

@Component({
  name: "Summernote"
})
export default class Summernote extends Vue {
  @Prop({ type: Number, default: 0 })
  private height!: number;
  @Prop({ type: String, default: "" })
  private value!: string;

  private $editor!: any;
  private currentValue: string = "";
  public imageUpload?: (files: File[], callback: (url: string) => void) => void;
  public option?: EditorOption;

  private height$: Subject<void> = new Subject();
  private subHeight!: Subscription;

  @Watch("height")
  private watchHeight() {
    this.height$.next();
  }

  @Watch("value")
  private watchValue(value: string) {
    if (this.currentValue !== value) {
      this.currentValue = value;
      this.$editor.summernote("code", value);
    }
  }

  private setupEditor() {
    this.$editor.summernote("destroy");
    const callbacks: Callbacks = {
      onChange: (value: string) => {
        this.currentValue = value;
        this.$emit("input", value);
      }
    };
    if (this.imageUpload && typeof this.imageUpload === "function") {
      callbacks.onImageUpload = (files: File[]) => {
        if (this.imageUpload) {
          this.imageUpload(Array.from(files), url => {
            this.$editor.summernote("editor.insertImage", url);
          });
        }
      };
    }
    const editorOption = {
      height: this.height - TOOLBAR_HEIGHT,
      tabsize: 2,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["fontname", ["fontname"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview", "help"]]
      ],
      hint: {
        match: /:([\-+\w]+)$/,
        search(keyword: string, callback: (fn: any) => void) {
          callback(
            $.grep(emojis, function(item) {
              return item.indexOf(keyword) === 0;
            })
          );
        },
        template(item: string) {
          const content = emojiUrls[item];
          return '<img src="' + content + '" width="20" /> :' + item + ":";
        },
        content(item: string) {
          const url = emojiUrls[item];
          if (url) {
            return $("<img />")
              .attr("src", url)
              .css("width", 20)[0];
          }
          return "";
        }
      },
      callbacks
    } as any;
    if (this.option) {
      optionKeys.forEach(key => {
        const option = this.option as any;
        if (option[key] !== undefined) {
          editorOption[key] = option[key];
        }
      });
    }
    this.$editor.summernote(editorOption);
    this.$editor.summernote("code", this.value);
  }

  private onHeight() {
    this.$editor.summernote("destroy");
    this.setupEditor();
  }

  private created() {
    if (emojis.length === 0) {
      $.ajax({
        url: "https://api.github.com/emojis",
        async: false
      }).then(function(data) {
        emojis = Object.keys(data);
        emojiUrls = data;
      });
    }
    this.subHeight = this.height$
      .pipe(debounceTime(100))
      .subscribe(this.onHeight);
  }

  private mounted() {
    this.$editor = $(this.$refs.editor as HTMLElement);
    this.setupEditor();
  }

  private destroyed() {
    this.$editor.summernote("destroy");
    this.subHeight.unsubscribe();
  }
}
</script>

<style scoped lang="scss"></style>
