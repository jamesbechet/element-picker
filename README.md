# Element Picker – JavaScript HTML Element Picker Library

![CI](https://github.com/jamesbechet/element-picker/actions/workflows/ci.yml/badge.svg)
[![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/element-picker.svg
[npm-url]: https://npmjs.org/package/element-picker
[downloads-image]: https://img.shields.io/npm/dm/element-picker.svg
[downloads-url]: https://npmjs.org/package/element-picker

A lightweight JavaScript element picker library that lets developers visually select, inspect, and retrieve any hovered HTML element on a web page using point-and-click interaction. Ideal for building developer tools, browser extensions, page builders, QA tools, visual editors, and debugging utilities.

## What is Element Picker?

Element Picker is a vanilla JavaScript utility that allows users to hover over elements on a page, visually highlight them, and select a target element via mouse click. Once selected, the library returns the underlying DOM element for inspection or further processing.

Common use cases include:
- HTML element inspection tools
- No-code and low-code editors
- Web page builders
- Visual QA and testing tools
- Browser extensions
- Debugging and developer utilities

## How This Element Picker Differs From Browser DevTools and uBlock

Unlike browser developer tools or ad-blocker element pickers, this library is designed to be embedded directly into your own web applications.

- No browser extension required
- Works inside any JavaScript application
- Fully customizable hover styles
- Returns raw DOM elements for programmatic use
- Suitable for production tools, not just inspection

## Install

`npm install --save element-picker`

## Usage – Pick and Retrieve Any HTML Element

The element picker initializes a hover listener on the page. When the user clicks an element, the selected DOM node is returned via the onClick callback.

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

## Keywords

JavaScript element picker, HTML element picker, DOM picker, hover element selector, visual element selector, JavaScript DOM inspector, UI element picker, page element selector

## License

MIT. Copyright (C) James Bechet (https://jamesbechet.github.io/jamesbechet/).
