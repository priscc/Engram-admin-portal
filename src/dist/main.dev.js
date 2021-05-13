"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _vuetify = _interopRequireDefault(require("./plugins/vuetify"));

var _vuefire = require("vuefire");

var _router = _interopRequireDefault(require("./router"));

var _firebase = _interopRequireDefault(require("firebase"));

require("./firebase/db");

var _store = _interopRequireDefault(require("./store"));

var _vueYoutubeEmbed = _interopRequireDefault(require("vue-youtube-embed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuefire.firestorePlugin);

_vue["default"].use(_vueYoutubeEmbed["default"]);

_vue["default"].config.productionTip = false;
var app;

_firebase["default"].auth().onAuthStateChanged(function () {
  if (!app) {
    app = new _vue["default"]({
      vuetify: _vuetify["default"],
      router: _router["default"],
      store: _store["default"],
      render: function render(h) {
        return h(_App["default"]);
      }
    }).$mount("#app"); // app = new Vue({
    //   el: '#app',
    //   vuetify,
    //   router,
    //   template: '<App/>',
    //   components: { App }
    // });
  }
});