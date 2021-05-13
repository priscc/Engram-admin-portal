"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _db = require("../firebase/db.js");

var _vuexPersistedstate = _interopRequireDefault(require("vuex-persistedstate"));

var _topics = _interopRequireDefault(require("./modules/topics"));

var _events = _interopRequireDefault(require("./modules/events"));

var _people = _interopRequireDefault(require("./modules/people"));

var _terminology = _interopRequireDefault(require("./modules/terminology"));

var _works = _interopRequireDefault(require("./modules/works"));

var _videos = _interopRequireDefault(require("./modules/videos"));

var _articles = _interopRequireDefault(require("./modules/articles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

_vue["default"].use(_db.db);

var _default = new _vuex["default"].Store({
  strict: true,
  modules: {
    events: _events["default"],
    topics: _topics["default"],
    people: _people["default"],
    terminology: _terminology["default"],
    works: _works["default"],
    videos: _videos["default"],
    articles: _articles["default"]
  },
  plugins: [(0, _vuexPersistedstate["default"])({
    paths: ["events", "topics", "people", "terminology", "works", "videos", "articles"]
  })]
});

exports["default"] = _default;