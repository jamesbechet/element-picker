# Element Picker [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/jamesbechet/element-picker/master.svg
[travis-url]: https://travis-ci.org/jamesbechet/element-picker
[npm-image]: https://img.shields.io/npm/v/element-picker.svg
[npm-url]: https://npmjs.org/package/element-picker
[downloads-image]: https://img.shields.io/npm/dm/element-picker.svg
[downloads-url]: https://npmjs.org/package/element-picker

## A JavaScript library to help you point and click to get the hovered element.

### Install

```bash
npm install --save element-picker
```

### Usage

```js
var elementPicker = require('element-picker')

function onClick(element) {
  console.log(element)
}

elementPicker.init({ onClick })
```

### Options
#### `backgroundColor` `{String}` `optional` `default='rgba(0, 0, 0, 0.1)'`
The background color used when an element is being hovered.

### License
MIT. Copyright (C) [James Bechet](http://jamesbechet.com).