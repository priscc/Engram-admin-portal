"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuexfire = require("vuexfire");

var _vuexMapFields = require("vuex-map-fields");

var _db = require("../../firebase/db");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resourcesRef = _db.db.collection("resources");

var _default = {
  namespaced: true,
  state: {
    articles: [],
    articleID: "",
    currentArticle: {
      topicID: [],
      parentType: "",
      parentID: "",
      resourceType: "article",
      newsSource: "",
      published: "",
      title: "",
      url: "",
      summary: "",
      thumbURL: "",
      thumbFile: "",
      searchArray: []
    }
  },
  getters: {
    getField: _vuexMapFields.getField,
    currentArticles: function currentArticles(state) {
      return state.articles;
    }
  },
  actions: {
    bindTopics: (0, _vuexfire.firestoreAction)(function (_ref) {
      var bindFirestoreRef = _ref.bindFirestoreRef;
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("resources", _db.db.collection("resources"));
    }),
    //* fetch all articles under topics
    fetchArticles: function fetchArticles(_ref2, parentType) {
      var commit, state, rootState, articleList;
      return regeneratorRuntime.async(function fetchArticles$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit, state = _ref2.state, rootState = _ref2.rootState;
              articleList = [];
              _context2.next = 4;
              return regeneratorRuntime.awrap(resourcesRef.where("topicID", "array-contains-any", [rootState.topics.topicID]).where("parentType", "==", parentType).where("resourceType", "==", "article").get().then(function _callee(querySnapshot) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        querySnapshot.docs.map(function (doc) {
                          var articleItem = doc.data(); //* appends unique video id to each work

                          articleList.push(_objectSpread({}, articleItem, {
                            id: doc.id
                          }));
                        });
                        _context.next = 3;
                        return regeneratorRuntime.awrap(commit("SET_ARTICLES", articleList));

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              }));

            case 4:
              console.log(state.articles);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //* fetches all article resources for an event
    fetchContentArticles: function fetchContentArticles(_ref3, parentType) {
      var state, commit, rootState, readParentID, parentID, articles;
      return regeneratorRuntime.async(function fetchContentArticles$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref3.state, commit = _ref3.commit, rootState = _ref3.rootState;

              readParentID = function readParentID(parentType) {
                if (parentType == "event") {
                  return rootState.events.eventId;
                } else if (parentType == "people") {
                  return rootState.people.personId;
                }
              };

              _context3.next = 4;
              return regeneratorRuntime.awrap(readParentID(parentType));

            case 4:
              parentID = _context3.sent;
              articles = [];
              _context3.next = 8;
              return regeneratorRuntime.awrap(resourcesRef.where("parentID", "==", parentID).where("parentType", "==", parentType).where("resourceType", "==", "article").get().then(function (querySnapshot) {
                querySnapshot.docs.map(function (doc) {
                  var articleItem = doc.data();
                  articles.push(_objectSpread({}, articleItem, {
                    id: doc.id
                  }));
                });
              }));

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(commit("SET_ARTICLES", articles));

            case 10:
              console.log(state.contentArticles);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //* submit new article resource
    submitNewArticle: function submitNewArticle(_ref4, parentType) {
      var state, rootState, commit, dispatch, readParentID, parentID;
      return regeneratorRuntime.async(function submitNewArticle$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref4.state, rootState = _ref4.rootState, commit = _ref4.commit, dispatch = _ref4.dispatch;

              //* sets parentID
              readParentID = function readParentID(parentType) {
                if (parentType == "event") {
                  return rootState.events.eventId;
                } else if (parentType == "people") {
                  return rootState.people.personId;
                } else if (parentType == "topic") {
                  return rootState.topics.topicID;
                }
              };

              _context4.next = 4;
              return regeneratorRuntime.awrap(readParentID(parentType));

            case 4:
              parentID = _context4.sent;
              commit("SET_ARTICLE_PROPS", {
                parentID: parentID,
                parentType: parentType
              });
              commit("SET_ARTICLE_TOPIC_ID", rootState.topics.topicID);
              commit("SET_SEARCH_ARRAY", state.currentArticle.title);
              console.log(state.currentArticle);
              console.log(parentID); //* adds new article to firestore

              _context4.next = 12;
              return regeneratorRuntime.awrap(resourcesRef.add(state.currentArticle).then(function () {
                console.log("Submitted Article Resource");
                alert("Successfully added new article");
              }));

            case 12:
              dispatch("clearArticleForm");

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //* sets current article for edit
    editArticle: function editArticle(_ref5, article) {
      var commit = _ref5.commit,
          state = _ref5.state;
      commit("SET_ARTICLE_ID", article.id); //* returns the index of the article for edit

      var index = state.articles.findIndex(function (e) {
        return e.id == article.id;
      }); //* identifies the current video for edit using index

      var currentArticle = state.articles[index];
      commit("SET_CURRENT_ARTICLE_RESOURCE", currentArticle);
    },
    //* submit edit article
    submitEditArticle: function submitEditArticle(_ref6) {
      var state, commit;
      return regeneratorRuntime.async(function submitEditArticle$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit;
              commit("UPDATE_SEARCH_ARRAY", state.currentArticle.title);
              _context5.next = 4;
              return regeneratorRuntime.awrap(resourcesRef.doc(state.articleID).set(state.currentArticle, {
                merge: true
              }).then(function () {
                console.log("Submit Edit for " + state.currentArticle.title);
                alert("Successfully edited an article");
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    //* delete article
    deleteArticle: function deleteArticle(_ref7, article) {
      var state, commit;
      return regeneratorRuntime.async(function deleteArticle$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit;
              _context6.next = 3;
              return regeneratorRuntime.awrap(commit("SET_ARTICLE_ID", article.id));

            case 3:
              _context6.next = 5;
              return regeneratorRuntime.awrap(resourcesRef.doc(state.articleID)["delete"]().then(function () {
                console.log("Successfully deleted");
                alert("Deleted an article");
              }));

            case 5:
              commit("SET_ARTICLE_ID", null);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    //* clears article form
    clearArticleForm: function clearArticleForm(_ref8) {
      var commit = _ref8.commit;
      commit("SET_CURRENT_ARTICLE_RESOURCE", {
        topicID: [],
        parentType: "",
        parentID: "",
        resourceType: "article",
        newsSource: "",
        published: "",
        title: "",
        url: "",
        summary: "",
        thumbURL: "",
        thumbFile: "",
        searchArray: []
      });
    }
  },
  mutations: _objectSpread({}, _vuexfire.vuexfireMutations, {
    updateField: _vuexMapFields.updateField,
    SET_ARTICLES: function SET_ARTICLES(state, articles) {
      return state.articles = articles;
    },
    SET_ARTICLE_ID: function SET_ARTICLE_ID(state, id) {
      return state.articleID = id;
    },
    SET_CURRENT_ARTICLE_RESOURCE: function SET_CURRENT_ARTICLE_RESOURCE(state, article) {
      return state.currentArticle = article;
    },
    SET_ARTICLE_TOPIC_ID: function SET_ARTICLE_TOPIC_ID(state, id) {
      state.currentArticle.topicID.push(id);
    },
    SET_SEARCH_ARRAY: function SET_SEARCH_ARRAY(state, array) {
      var _state$currentArticle;

      //* splits the words into strings and stores in newArray
      var newArray = array.split(" ");

      (_state$currentArticle = state.currentArticle.searchArray).push.apply(_state$currentArticle, _toConsumableArray(newArray));
    },
    SET_ARTICLE_PROPS: function SET_ARTICLE_PROPS(state, props) {
      return state.currentArticle = _objectSpread({}, state.currentArticle, {}, props);
    },
    UPDATE_SEARCH_ARRAY: function UPDATE_SEARCH_ARRAY(state, array) {
      var newArray = array.split(" ");
      state.currentArticle.searchArray = newArray;
    }
  })
};
exports["default"] = _default;