"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _firebase = _interopRequireDefault(require("firebase"));

var _AddContent = _interopRequireDefault(require("@/components/AddContent.vue"));

var _AddTopicForm = _interopRequireDefault(require("@/components/AddTopic/AddTopicForm.vue"));

var _TopicList = _interopRequireDefault(require("@/components/ModifyTopic/TopicList.vue"));

var _General = _interopRequireDefault(require("@/components/ModifyTopic/Forms/General.vue"));

var _Text = _interopRequireDefault(require("@/components/ModifyTopic//Forms/Text.vue"));

var _Resources = _interopRequireDefault(require("@/components/ModifyTopic//Forms/Resources.vue"));

var _ModifyContent = _interopRequireDefault(require("@/components/ModifyContent/ModifyContent.vue"));

var _Events = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/Events/Events.vue"));

var _EventGeneral = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/Events/Forms/EventGeneral.vue"));

var _EventText = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/Events/Forms/EventText.vue"));

var _EventResources = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/Events/Forms/EventResources.vue"));

var _HistoricalPeople = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/HistoricalPeople/HistoricalPeople.vue"));

var _HistPeopleGeneral = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/HistoricalPeople/Forms/HistPeopleGeneral.vue"));

var _HistPeopleText = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/HistoricalPeople/Forms/HistPeopleText.vue"));

var _HistPeopleResources = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/HistoricalPeople/Forms/HistPeopleResources.vue"));

var _Terminology = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/Terminology/Terminology.vue"));

var _PrimarySources = _interopRequireDefault(require("@/components/ModifyContent/ContentDetails/PrimarySources/PrimarySources.vue"));

var _Login = _interopRequireDefault(require("@/components/auth/Login.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  routes: [{
    path: "/login",
    name: "login",
    component: _Login["default"],
    meta: {
      requiresGuest: true
    }
  }, {
    path: "/",
    redirect: '/login',
    meta: {
      requiresGuest: true
    }
  }, {
    path: '/addcontent',
    name: 'Add Content',
    component: _AddContent["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/addtopicform',
    name: 'AddTopicForm',
    component: _AddTopicForm["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/topiclist',
    name: 'TopicList',
    component: _TopicList["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/topiclist/general',
    name: 'General',
    component: _General["default"],
    props: true,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/topiclist/text',
    name: 'Text',
    component: _Text["default"],
    props: true,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/topiclist/resources',
    name: 'Resources',
    component: _Resources["default"],
    props: true,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent',
    name: 'ModifyContent',
    component: _ModifyContent["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/events',
    name: 'Events',
    component: _Events["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/events/general',
    name: 'EventGeneral',
    component: _EventGeneral["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/events/text',
    name: 'EventText',
    component: _EventText["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/events/resources',
    name: 'EventResources',
    component: _EventResources["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/historicalpeople',
    name: 'HistoricalPeople',
    component: _HistoricalPeople["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/historicalpeople/general',
    name: 'HistPeopleGeneral',
    component: _HistPeopleGeneral["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/historicalpeople/text',
    name: 'HistPeopleText',
    component: _HistPeopleText["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/historicalpeople/resources',
    name: 'HistPeopleResources',
    component: _HistPeopleResources["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/terminology',
    name: 'Terminology',
    component: _Terminology["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/addcontent/modifycontent/primarysources',
    name: 'PrimarySources',
    component: _PrimarySources["default"],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/About.vue'));
      });
    }
  }]
});
router.beforeEach(function (to, from, next) {
  // Check for requiresAuth guard
  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  })) {
    // Check if NO logged user
    if (!_firebase["default"].auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(function (record) {
    return record.meta.requiresGuest;
  })) {
    // Check if NO logged user
    if (_firebase["default"].auth().currentUser) {
      // Go to login
      next({
        path: "/addcontent",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});
var _default = router;
exports["default"] = _default;