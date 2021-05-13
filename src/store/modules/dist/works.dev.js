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

var worksRef = _db.db.collection("works");

var _default = {
  namespaced: true,
  state: {
    works: [],
    workId: null,
    workIndex: null,
    currentWork: {
      title: "",
      caption: "",
      thumbURL: "",
      thumbFile: "",
      topicID: [],
      searchArray: []
    }
  },
  getters: {
    getField: _vuexMapFields.getField,
    currentTopicWorks: function currentTopicWorks(state) {
      return state.works;
    },
    currentWork: function currentWork(state) {
      return state.currentWork;
    }
  },
  actions: {
    //* fetches list of works from firestore
    fetchWorks: function fetchWorks(_ref) {
      var rootState, commit, state, workList;
      return regeneratorRuntime.async(function fetchWorks$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              rootState = _ref.rootState, commit = _ref.commit, state = _ref.state;
              workList = [];
              _context2.next = 4;
              return regeneratorRuntime.awrap(worksRef.where("topicID", "array-contains-any", [rootState.topics.topicID]).get().then(function _callee(querySnapshot) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        querySnapshot.docs.map(function (doc) {
                          var workItem = doc.data(); //* appends unique work id to each work

                          workList.push(_objectSpread({}, workItem, {
                            id: doc.id
                          }));
                        });
                        _context.next = 3;
                        return regeneratorRuntime.awrap(commit("SET_TOPIC_WORKS", workList));

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              }));

            case 4:
              console.log(state.works);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //* clears work id
    clearWorkId: function clearWorkId(_ref2) {
      var commit = _ref2.commit;
      commit("SET_WORK_ID", null);
    },
    //* clears work fields
    clearWorkFields: function clearWorkFields(_ref3) {
      var commit = _ref3.commit;
      commit("SET_CURRENT_WORK", {
        title: "",
        caption: "",
        thumbURL: "",
        thumbFile: "",
        topicID: [],
        searchArray: []
      });
    },
    //* handles submit new work data
    submitNewWork: function submitNewWork(_ref4) {
      var commit, rootState, state, dispatch;
      return regeneratorRuntime.async(function submitNewWork$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref4.commit, rootState = _ref4.rootState, state = _ref4.state, dispatch = _ref4.dispatch;
              commit("SET_WORK_TOPIC_ID", rootState.topics.topicID);
              commit("SET_SEARCH_ARRAY", state.currentWork.title); //* adds new work in firestore database

              _context3.next = 5;
              return regeneratorRuntime.awrap(worksRef.add(state.currentWork).then(function () {
                console.log("Work added");
                alert("Successfully added artifact");
              }));

            case 5:
              dispatch("fetchWorks");
              dispatch("clearWorkFields");

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //* sets current work for edit
    editWork: function editWork(_ref5, work) {
      var commit, state, index, currentWork;
      return regeneratorRuntime.async(function editWork$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref5.commit, state = _ref5.state;
              commit("SET_WORK_ID", work.id); //* returns the index of the work for edit

              index = state.works.findIndex(function (e) {
                return e.id == work.id;
              }); //* identifies the current work for edit using the index

              currentWork = state.works[index];
              commit("SET_CURRENT_WORK", currentWork);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //* submit edited work
    submitEditWork: function submitEditWork(_ref6) {
      var state, dispatch, commit;
      return regeneratorRuntime.async(function submitEditWork$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref6.state, dispatch = _ref6.dispatch, commit = _ref6.commit;
              _context5.next = 3;
              return regeneratorRuntime.awrap(commit("UPDATE_SEARCH_ARRAY", state.currentWork.title));

            case 3:
              _context5.next = 5;
              return regeneratorRuntime.awrap(worksRef.doc(state.workId).set(state.currentWork, {
                merge: true
              }).then(function () {
                console.log("Submit edit for " + state.currentWork.title);
                alert("Successfully edited an artifact");
              }));

            case 5:
              dispatch("fetchWorks");
              dispatch("clearWorkId");
              dispatch("clearWorkFields");

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    //* delete work
    deleteWork: function deleteWork(_ref7, work) {
      var state, commit, dispatch;
      return regeneratorRuntime.async(function deleteWork$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit, dispatch = _ref7.dispatch;
              _context6.next = 3;
              return regeneratorRuntime.awrap(commit("SET_WORK_ID", work.id));

            case 3:
              _context6.next = 5;
              return regeneratorRuntime.awrap(worksRef.doc(state.workId)["delete"]().then(function () {
                console.log("Succesfully deleted");
                alert("Deleted an artifact");
              }));

            case 5:
              //* finds and sets the index for delete
              dispatch("fetchWorks");
              commit("SET_WORK_ID", null);
              dispatch("clearWorkFields");

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  },
  mutations: _objectSpread({}, _vuexfire.vuexfireMutations, {
    updateField: _vuexMapFields.updateField,
    SET_TOPIC_WORKS: function SET_TOPIC_WORKS(state, works) {
      return state.works = works;
    },
    SET_WORK_TOPIC_ID: function SET_WORK_TOPIC_ID(state, topicId) {
      state.currentWork.topicID.push(topicId);
    },
    SET_WORK_ID: function SET_WORK_ID(state, id) {
      return state.workId = id;
    },
    SET_CURRENT_WORK: function SET_CURRENT_WORK(state, work) {
      return state.currentWork = work;
    },
    SET_SEARCH_ARRAY: function SET_SEARCH_ARRAY(state, array) {
      var _state$currentWork$se;

      //* splits the words into strings and stores in newArray
      var newArray = array.split(" ");

      (_state$currentWork$se = state.currentWork.searchArray).push.apply(_state$currentWork$se, _toConsumableArray(newArray));
    },
    UPDATE_SEARCH_ARRAY: function UPDATE_SEARCH_ARRAY(state, array) {
      var newArray = array.split(" ");
      state.currentWork.searchArray = newArray;
    }
  })
};
exports["default"] = _default;