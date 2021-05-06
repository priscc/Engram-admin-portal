"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByValue = void 0;

var filterByValue = function filterByValue(array, string) {
  return array.filter(function (o) {
    return Object.keys(o).some(function (k) {
      return o[k].toLowerCase().includes(string.toLowerCase());
    });
  });
};

exports.filterByValue = filterByValue;