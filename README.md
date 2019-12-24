# vuerd-plugin-summernote

> [vuerd-core](https://github.com/vuerd/vuerd-core) plugin [summernote](https://github.com/summernote/summernote)

[![npm version](https://img.shields.io/npm/v/vuerd-plugin-summernote.svg)](https://www.npmjs.com/package/vuerd-plugin-summernote) [![Build Status](https://travis-ci.com/vuerd/vuerd-plugin-summernote.svg?branch=master)](https://travis-ci.com/vuerd/vuerd-plugin-summernote)

## Document
[Storybook](https://vuerd.github.io/vuerd-docs/)   
[Live Demo](https://vuerd.github.io/vuerd-docs/iframe.html?id=demo-live--vuerd-core)

## Install
```bash
$ yarn add vuerd-core
$ yarn add vuerd-plugin-summernote
or
$ npm install vuerd-core
$ npm install vuerd-plugin-summernote
```
## Usage
```js
// main.js or main.ts
import Vue from 'vue';
import VuerdCore from 'vuerd-core';
import Summernote from 'vuerd-plugin-summernote';
import 'vuerd-core/dist/vuerd-core.css';
import 'vuerd-plugin-summernote/dist/vuerd-plugin-summernote.css';

VuerdCore.use(
  Summernote,
/*
  {
    imageUpload(files, callback) {
      // upload
      callback("URL");
    }
  }
*/
);

Vue.use(VuerdCore);
```
```html
<vuerd-core />
```
## CDN Quick Start
```html
<!DOCTYPE html>
<html>
<head>
  <title>vuerd-core demo</title>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/vuerd-core/dist/vuerd-core.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/vuerd-plugin-summernote/dist/vuerd-plugin-summernote.css">
</head>
<body>
  <div id="app">
    <vuerd-core />
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuerd-core/dist/vuerd-core.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuerd-plugin-summernote/dist/vuerd-plugin-summernote.umd.min.js"></script>
  <script>
    const VuerdCore = window['vuerd-core'].default
    const Summernote = window['vuerd-plugin-summernote'].default
    VuerdCore.use(Summernote)
    Vue.use(VuerdCore)
    new Vue({
      el: '#app'
    })
  </script>
</body>
</html>
```
## Option interface
```typescript
export interface Option {
  imageUpload?: (files: File[], callback: (url: string) => void) => void;
  scope?: string[] | RegExp[];
  exclude?: string[] | RegExp[];
}
```
## Option
| Name | Type | Default | Describe |
| --- | --- | --- | --- |
| imageUpload | function | base64 | image upload |
| scope | [String \| RegExp] | ["rich"] | file designation(string extension) |
| exclude | [String \| RegExp] |  | exception file designation(string extension) |

## License
[MIT](https://github.com/vuerd/vuerd-plugin-summernote/blob/master/LICENSE)
