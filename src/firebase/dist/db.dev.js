"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.GeoPoint = exports.TimeStamp = exports.db = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import firebase from "firebase";
// import "firebase/firestore";
// // Your web app's Firebase configuration
// var firebaseConfig = {
// apiKey: "AIzaSyBYzz_YlFwSpC_gaFhz-CvQ_2YFATE49NQ",
// authDomain: "study-bites-1.firebaseapp.com",
// databaseURL: "https://study-bites-1.firebaseio.com",
// projectId: "study-bites-1",
// storageBucket: "study-bites-1.appspot.com",
// messagingSenderId: "1082808406479",
// appId: "1:1082808406479:web:532d872fa941eb7aba42ba"
// };
// // Initialize Firebase
// // export const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const db = firebase.initializeApp(firebaseConfig).firestore();
// Vuexfire setup
// Get a Firestore instance
var db = _app["default"].initializeApp({
  apiKey: "AIzaSyBYzz_YlFwSpC_gaFhz-CvQ_2YFATE49NQ",
  authDomain: "study-bites-1.firebaseapp.com",
  databaseURL: "https://study-bites-1.firebaseio.com",
  projectId: "study-bites-1",
  storageBucket: "study-bites-1.appspot.com",
  messagingSenderId: "1082808406479",
  appId: "1:1082808406479:web:532d872fa941eb7aba42ba"
}).firestore(); // Export types that exists in Firestore
// This is not always necessary, but it's used in other examples


exports.db = db;
var _firebase$firestore = _app["default"].firestore,
    TimeStamp = _firebase$firestore.TimeStamp,
    GeoPoint = _firebase$firestore.GeoPoint;
exports.GeoPoint = GeoPoint;
exports.TimeStamp = TimeStamp;
// if using Firebase JS SDK < 5.8.0
db.settings({
  timestampsInSnapshots: true
}); // AuthState Persistence settings

var auth = _app["default"].auth();

exports.auth = auth;
auth.setPersistence(_app["default"].auth.Auth.Persistence.SESSION);