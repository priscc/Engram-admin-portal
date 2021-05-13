"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFirebase = initFirebase;
Object.defineProperty(exports, "firebase", {
  enumerable: true,
  get: function get() {
    return _app.firebase;
  }
});

var _app = require("@firebase/app");

require("firebase/firestore");

// import * as Firebase from 'firebase/app'
function initFirebase() {
  _app.firebase.initializeApp({
    /* your Firebase config */
  });

  return new Promise(function (resolve, reject) {
    _app.firebase.firestore().enablePersistence().then(resolve)["catch"](function (err) {
      if (err.code === 'failed-precondition') {
        reject(err); // Multiple tabs open, persistence can only be
        // enabled in one tab at a a time.
      } else if (err.code === 'unimplemented') {
        reject(err); // The current browser does not support all of
        // the features required to enable persistence
      }
    });
  });
}