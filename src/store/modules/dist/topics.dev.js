"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuexfire = require("vuexfire");

var _db = require("../../firebase/db");

var _vuexMapFields = require("vuex-map-fields");

var _router = _interopRequireDefault(require("../../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var topicsRef = _db.db.collection("topics");

var resourcesRef = _db.db.collection("resources");

var _default = {
  namespaced: true,
  state: {
    topics: [],
    topicID: null,
    currentTopic: {
      title: "",
      introMD: "",
      intro_thumbFile: "",
      intro_thumbURL: "",
      topic_thumbFile: "",
      topic_thumbURL: "",
      disabled: true,
      timePeriod: null,
      searchArray: []
    },
    videoID: null,
    videoURL: null,
    resources: [],
    articles: [],
    videos: []
  },
  getters: {
    allTopics: function allTopics(state) {
      return state.topics;
    },
    currentId: function currentId(state) {
      return state.topicID;
    },
    currentTopic: function currentTopic(state) {
      return state.currentTopic;
    },
    currentResources: function currentResources(state) {
      return state.resources;
    },
    currentArticles: function currentArticles(state) {
      return state.articles;
    },
    getField: _vuexMapFields.getField
  },
  actions: {
    bindTopics: (0, _vuexfire.firestoreAction)(function (_ref) {
      var bindFirestoreRef = _ref.bindFirestoreRef;
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("topics", _db.db.collection("topics"));
    }),
    //* add topic
    addTopicForm: function addTopicForm(_ref2) {
      var state, commit, fields;
      return regeneratorRuntime.async(function addTopicForm$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit;
              fields = {
                title: "",
                introMD: "",
                intro_thumbFile: "",
                intro_thumbURL: "",
                topic_thumbFile: "",
                topic_thumbURL: "",
                disabled: true,
                timePeriod: null,
                searchArray: []
              };
              _context.next = 4;
              return regeneratorRuntime.awrap(commit("SET_CURRENT_TOPIC", fields));

            case 4:
              console.log(state.currentTopic);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    //* submit new topic
    submitNewTopic: function submitNewTopic(_ref3) {
      var state, commit;
      return regeneratorRuntime.async(function submitNewTopic$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref3.state, commit = _ref3.commit;
              commit("SET_SEARCH_ARRAY", state.currentTopic.title);
              _context2.next = 4;
              return regeneratorRuntime.awrap(topicsRef.add(state.currentTopic).then(function () {
                console.log("Submitted New Topic");

                _router["default"].replace({
                  path: "/addcontent"
                });

                alert("Successfully added a topic");
              })["catch"](function (err) {
                console.log(err);
                return false;
              }));

            case 4:
              console.log(state.currentTopic);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //* fetches all topics from firestore
    fetchTopics: function fetchTopics(_ref4) {
      var commit, documents;
      return regeneratorRuntime.async(function fetchTopics$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref4.commit;
              documents = [];
              _context3.next = 4;
              return regeneratorRuntime.awrap(topicsRef.get().then(function (querySnapshot) {
                querySnapshot.docs.map(function (doc) {
                  var topicItemData = doc.data(); //* gets the unique topic id and appends it in each topic

                  documents.push(_objectSpread({}, topicItemData, {
                    id: doc.id
                  }));
                }); //* sorts the topics according to its time period

                var result = documents.reduce(function (r, a) {
                  r[a.timePeriod] = r[a.timePeriod] || [];
                  r[a.timePeriod].push(a);
                  return r;
                }, Object.create(null));
                commit("SET_TOPICS", result);
              }));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //* topic id gets stored to the state and used in querying the specific topic
    editTopic: function editTopic(_ref5, topic) {
      var state, commit, period, timePeriod, topicList, index, currentTopic;
      return regeneratorRuntime.async(function editTopic$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit;
              _context4.next = 3;
              return regeneratorRuntime.awrap(commit("SET_ID", topic.id));

            case 3:
              //* identifies the time period of the topic for edit
              period = Object.keys(state.topics).filter(function (time) {
                return time == topic.timePeriod;
              });
              timePeriod = parseInt(period[0]); //* sets the list of array under one time period

              topicList = state.topics[timePeriod];
              index = topicList.findIndex(function (e) {
                return e.id == topic.id;
              }); //* identifies the current topic for edit

              currentTopic = topicList[index];
              commit("SET_CURRENT_TOPIC", currentTopic);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //* handles submit for edit topic
    submitEditTopic: function submitEditTopic(_ref6) {
      var state, commit;
      return regeneratorRuntime.async(function submitEditTopic$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit;
              commit("UPDATE_SEARCH_ARRAY", state.currentTopic.title);
              _context5.next = 4;
              return regeneratorRuntime.awrap(topicsRef.doc(state.topicID).set(state.currentTopic, {
                merge: true
              }).then(function () {
                console.log("Submitted Edited Topic");
                alert("Successfully edited topic");
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    //* gets all articles for a topic
    fetchArticles: function fetchArticles(_ref7) {
      var state, commit, articlesList;
      return regeneratorRuntime.async(function fetchArticles$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit;
              articlesList = [];
              _context6.next = 4;
              return regeneratorRuntime.awrap(resourcesRef.where("topicID", "array-contains-any", [state.topicID]).where("parentType", "==", "topic").where("resourceType", "==", "article").get().then(function (querySnapshot) {
                querySnapshot.docs.map(function (doc) {
                  var articleItem = doc.data(); //* appends unique article id to each article

                  articlesList.push(_objectSpread({}, articleItem, {
                    id: doc.id
                  }));
                });
                commit("SET_ARTICLES", articlesList);
              }));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  },
  mutations: _objectSpread({}, _vuexfire.vuexfireMutations, {
    SET_TOPICS: function SET_TOPICS(state, topics) {
      return state.topics = topics;
    },
    SET_ID: function SET_ID(state, id) {
      return state.topicID = id;
    },
    SET_CURRENT_TOPIC: function SET_CURRENT_TOPIC(state, topic) {
      return state.currentTopic = topic;
    },
    SET_ARTICLES: function SET_ARTICLES(state, articles) {
      return state.articles = articles;
    },
    SET_SEARCH_ARRAY: function SET_SEARCH_ARRAY(state, array) {
      var _state$currentTopic$s;

      //* splits the words into strings and stores in newArray
      var newArray = array.split(" ");

      (_state$currentTopic$s = state.currentTopic.searchArray).push.apply(_state$currentTopic$s, _toConsumableArray(newArray));
    },
    UPDATE_SEARCH_ARRAY: function UPDATE_SEARCH_ARRAY(state, array) {
      var newArray = array.split(" ");
      state.currentTopic.searchArray = newArray;
    },
    updateField: _vuexMapFields.updateField
  })
};
exports["default"] = _default;