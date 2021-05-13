"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var requireModule = require.context(".", false, /\.js$/); //extract js files inside modules folder


var modules = {};
requireModule.keys().forEach(function (fileName) {
  if (fileName === "./index.js") return; //reject the index.js file

  var moduleName = (0, _camelCase["default"])(fileName.replace(/(\.\/|\.js)/g, "")); //

  modules[moduleName] = requireModule(fileName)["default"];
});
var _default = modules;
exports["default"] = _default;