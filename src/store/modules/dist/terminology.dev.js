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

var termRef = _db.db.collection("terminology");

var _default = {
  namespaced: true,
  state: {
    terms: [],
    termId: null,
    termIndex: null,
    currentTerm: {
      term: "",
      def: "",
      searchArray: [],
      topicID: []
    },
    termForEdit: {
      term: "",
      def: "",
      searchArray: [],
      topicID: []
    }
  },
  getters: {
    getField: _vuexMapFields.getField,
    currentTopicTerms: function currentTopicTerms(state) {
      return state.terms;
    },
    currentTermId: function currentTermId(state) {
      return state.termId;
    },
    currentTerm: function currentTerm(state) {
      return state.currentTerm;
    },
    buttonLabel: function buttonLabel(state) {
      if (state.termId != null) {
        return "Edit Term";
      } else {
        return "+ Add Term";
      }
    }
  },
  actions: {
    //* fetches list of terms from firestore
    fetchTerms: function fetchTerms(_ref) {
      var rootState, commit, state, termList;
      return regeneratorRuntime.async(function fetchTerms$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              rootState = _ref.rootState, commit = _ref.commit, state = _ref.state;
              termList = [];
              termRef.where("topicID", "array-contains-any", [rootState.topics.topicID]).get().then(function _callee(querySnapshot) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        querySnapshot.docs.map(function (doc) {
                          var termItem = doc.data(); //* appends unique term id to each id

                          termList.push(_objectSpread({}, termItem, {
                            id: doc.id
                          }));
                        });
                        _context.next = 3;
                        return regeneratorRuntime.awrap(commit("SET_TOPIC_TERMS", termList));

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });
              console.log(state.terms);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //* clears term id
    clearTermId: function clearTermId(_ref2) {
      var commit = _ref2.commit;
      commit("SET_TERM_ID", null);
    },
    //* handles submit new term data
    submitNewTerm: function submitNewTerm(_ref3) {
      var commit, rootState, state, dispatch;
      return regeneratorRuntime.async(function submitNewTerm$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref3.commit, rootState = _ref3.rootState, state = _ref3.state, dispatch = _ref3.dispatch;
              _context3.next = 3;
              return regeneratorRuntime.awrap(commit("SET_TERM_TOPIC_ID", rootState.topics.topicID));

            case 3:
              _context3.next = 5;
              return regeneratorRuntime.awrap(commit("SET_SEARCH_ARRAY", state.currentTerm.term));

            case 5:
              _context3.next = 7;
              return regeneratorRuntime.awrap(termRef.add(state.currentTerm).then(function () {
                console.log("Term Added");
                alert("Successfully added a terminology");
              }));

            case 7:
              //* fetch new list of terms
              dispatch("fetchTerms"); //* clears the fields

              dispatch("clearFields");

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //* clear fields
    clearFields: function clearFields(_ref4) {
      var commit = _ref4.commit;
      commit("SET_CURRENT_TERM", {
        term: "",
        def: "",
        searchArray: [],
        topicID: []
      });
    },
    //* sets current term for edit
    editTerm: function editTerm(_ref5, term) {
      var commit = _ref5.commit,
          state = _ref5.state;
      commit("SET_TERM_ID", term.id); //* returns the index of the term for edit

      var index = state.terms.findIndex(function (e) {
        return e.id == term.id;
      }); //* identifies the current term for edit using the index

      var currentTerm = state.terms[index]; // commit("SET_TERM_INDEX", index);

      commit("SET_CURRENT_TERM", currentTerm);
    },
    //* submit edit term
    submitEditTerm: function submitEditTerm(_ref6) {
      var state, dispatch, commit;
      return regeneratorRuntime.async(function submitEditTerm$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref6.state, dispatch = _ref6.dispatch, commit = _ref6.commit;
              _context4.next = 3;
              return regeneratorRuntime.awrap(commit("UPDATE_SEARCH_ARRAY", state.currentTerm.term));

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(termRef.doc(state.termId).set(state.currentTerm, {
                merge: true
              }).then(function () {
                console.log("Submit Edit for " + state.currentTerm.term);
                alert("Succesfully edited a terminology");
              }));

            case 5:
              dispatch("fetchTerms"); //* clears the fields

              dispatch("clearFields");
              dispatch("clearTermId");

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //* delete term
    deleteTerm: function deleteTerm(_ref7, term) {
      var state, commit, dispatch;
      return regeneratorRuntime.async(function deleteTerm$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit, dispatch = _ref7.dispatch;
              _context5.next = 3;
              return regeneratorRuntime.awrap(commit("SET_TERM_ID", term.id));

            case 3:
              _context5.next = 5;
              return regeneratorRuntime.awrap(termRef.doc(state.termId)["delete"]().then(function () {
                console.log("Successfully deleted");
                alert("Successfully deleted a terminology");
              }));

            case 5:
              dispatch("fetchTerms");
              commit("SET_TERM_ID", null);
              dispatch("clearFields");
              console.log(state.terms);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  },
  mutations: _objectSpread({}, _vuexfire.vuexfireMutations, {
    updateField: _vuexMapFields.updateField,
    SET_TOPIC_TERMS: function SET_TOPIC_TERMS(state, terms) {
      return state.terms = terms;
    },
    CLEAR_TERM_ID: function CLEAR_TERM_ID(state, id) {
      return state.termId = id;
    },
    SET_TERM_TOPIC_ID: function SET_TERM_TOPIC_ID(state, topicID) {
      state.currentTerm.topicID.push(topicID);
    },
    ADD_TERM_TO_LIST: function ADD_TERM_TO_LIST(state, term) {
      return state.terms.unshift(term);
    },
    SET_CURRENT_TERM: function SET_CURRENT_TERM(state, fields) {
      return state.currentTerm = fields;
    },
    SET_TERM_ID: function SET_TERM_ID(state, termId) {
      return state.termId = termId;
    },
    SET_TERM_INDEX: function SET_TERM_INDEX(state, index) {
      return state.termIndex = index;
    },
    DELETE_TERM: function DELETE_TERM(state, index) {
      return state.terms.splice(index, 1);
    },
    SET_SEARCH_ARRAY: function SET_SEARCH_ARRAY(state, array) {
      var _state$currentTerm$se;

      //* splits the words into strings and stores in newArray
      var newArray = array.split(" ");

      (_state$currentTerm$se = state.currentTerm.searchArray).push.apply(_state$currentTerm$se, _toConsumableArray(newArray));
    },
    UPDATE_SEARCH_ARRAY: function UPDATE_SEARCH_ARRAY(state, array) {
      var newArray = array.split(" ");
      state.currentTerm.searchArray = newArray;
    } // UPDATE_TERM: (state, term) => (state.terms[state.termIndex] = term),

  })
};
exports["default"] = _default;