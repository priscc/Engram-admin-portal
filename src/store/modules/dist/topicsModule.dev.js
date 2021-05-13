"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var topicsModule = {
  firestorePath: 'myDocs',
  firestoreRefType: 'collection',
  // or 'doc'
  moduleName: 'topicsModule',
  statePropName: 'data',
  namespaced: true,
  // automatically added
  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};
var _default = topicsModule;
exports["default"] = _default;