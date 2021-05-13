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

var peopleRef = _db.db.collection("people");

var _default = {
  namespaced: true,
  state: {
    people: [],
    personId: null,
    currentPerson: {
      name: "",
      mainMD: "",
      thumbFile: "",
      thumbURL: "",
      dateOfBirth: {
        date: "",
        era: true
      },
      dateOfPassing: {
        date: "",
        era: true
      },
      topicID: [],
      searchArray: []
    }
  },
  getters: {
    getField: _vuexMapFields.getField,
    currentTopicPeople: function currentTopicPeople(state) {
      return state.people;
    },
    currentPersonId: function currentPersonId(state) {
      return state.personId;
    },
    currentPerson: function currentPerson(state) {
      return state.currentPerson;
    }
  },
  actions: {
    //* fetches the list of hist people under current topic
    fetchPeople: function fetchPeople(_ref) {
      var rootState, commit, state, peopleList;
      return regeneratorRuntime.async(function fetchPeople$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rootState = _ref.rootState, commit = _ref.commit, state = _ref.state;
              peopleList = [];
              _context.next = 4;
              return regeneratorRuntime.awrap(peopleRef.where("topicID", "array-contains-any", [rootState.topics.topicID]).get().then(function (querySnapshot) {
                querySnapshot.docs.map(function (doc) {
                  var peopleItem = doc.data(); //* appends unique event id to each event

                  peopleList.push(_objectSpread({}, peopleItem, {
                    id: doc.id
                  }));
                });
                commit("SET_TOPIC_PEOPLE", peopleList);
                console.log(state.people);
                console.log(rootState.topics.topicID);
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    //* handler for add historical person
    setPersonForm: function setPersonForm(_ref2) {
      var commit, state, fields;
      return regeneratorRuntime.async(function setPersonForm$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit, state = _ref2.state;
              fields = {
                name: "",
                mainMD: "",
                thumbFile: "",
                thumbURL: "",
                dateOfBirth: {
                  date: "",
                  era: true
                },
                dateOfPassing: {
                  date: "",
                  era: true
                },
                topicID: [],
                searchArray: []
              }; // await dispatch('clearPersonId')

              _context2.next = 4;
              return regeneratorRuntime.awrap(commit("SET_CURRENT_PERSON", fields));

            case 4:
              console.log(state.personId);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //* clears the current person id
    clearPersonId: function clearPersonId(_ref3) {
      var commit;
      return regeneratorRuntime.async(function clearPersonId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref3.commit;
              _context3.next = 3;
              return regeneratorRuntime.awrap(commit("CLEAR_PERSON_ID", null));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //* handles submit new person data
    submitNewPerson: function submitNewPerson(_ref4) {
      var dispatch, state, commit;
      return regeneratorRuntime.async(function submitNewPerson$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch = _ref4.dispatch, state = _ref4.state, commit = _ref4.commit;
              _context4.next = 3;
              return regeneratorRuntime.awrap(dispatch("setPersonTopicId"));

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(commit("SET_SEARCH_ARRAY", state.currentPerson.name));

            case 5:
              _context4.next = 7;
              return regeneratorRuntime.awrap(peopleRef.add(state.currentPerson).then(function () {
                console.log("Person Added");
                alert("Successfully added a Historical Figure");
              }));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //* sets the topic id for the current person
    setPersonTopicId: function setPersonTopicId(_ref5) {
      var rootState = _ref5.rootState,
          state = _ref5.state,
          commit = _ref5.commit;
      commit("SET_PERSON_TOPIC_ID", rootState.topics.topicID);
      console.log(state.currentPerson.topicID);
    },
    //* sets current event for edit
    editPerson: function editPerson(_ref6, person) {
      var state, commit, index, currentPerson;
      return regeneratorRuntime.async(function editPerson$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit;
              _context5.next = 3;
              return regeneratorRuntime.awrap(commit("SET_PERSON_ID", person.id));

            case 3:
              console.log(state.personId); //* sets the index of the person for edit

              index = state.people.findIndex(function (e) {
                return e.id == person.id;
              }); //* identifies the current person for edit

              currentPerson = state.people[index];
              commit("SET_CURRENT_PERSON", currentPerson);
              console.log(state.currentPerson); // await dispatch("fetchPersonResources");

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    //* handles submit for edit person
    submitEditPerson: function submitEditPerson(_ref7) {
      var state, commit;
      return regeneratorRuntime.async(function submitEditPerson$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit;
              _context6.next = 3;
              return regeneratorRuntime.awrap(commit("UPDATE_SEARCH_ARRAY", state.currentPerson.name));

            case 3:
              _context6.next = 5;
              return regeneratorRuntime.awrap(peopleRef.doc(state.personId).set(state.currentPerson, {
                merge: true
              }).then(function () {
                console.log("Submit Edit for " + state.currentPerson.name);
                alert("Successfully edited a Historical Figure");
              }));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    //* deletes person from the database
    deletePerson: function deletePerson(_ref8, person) {
      var commit, state, dispatch;
      return regeneratorRuntime.async(function deletePerson$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              commit = _ref8.commit, state = _ref8.state, dispatch = _ref8.dispatch;
              _context7.next = 3;
              return regeneratorRuntime.awrap(commit("SET_PERSON_ID", person.id));

            case 3:
              peopleRef.doc(state.personId)["delete"]().then(function () {
                console.log("Successfully deleted");
                alert("Successfully deleted a Historical Figure");
              });
              setTimeout(function () {
                return dispatch("fetchPeople");
              }, 200);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    //* dynamic save button
    handleSave: function handleSave(_ref9) {
      var state = _ref9.state,
          dispatch = _ref9.dispatch;

      if (state.personId != null) {
        //* handles the submit as an edit if editing a person
        dispatch("submitEditPerson");
      } else {
        //* handles the submit as a new event if adding a person
        dispatch("submitNewPerson");
      }
    }
  },
  mutations: _objectSpread({}, _vuexfire.vuexfireMutations, {
    updateField: _vuexMapFields.updateField,
    SET_TOPIC_PEOPLE: function SET_TOPIC_PEOPLE(state, people) {
      return state.people = people;
    },
    SET_CURRENT_PERSON: function SET_CURRENT_PERSON(state, person) {
      return state.currentPerson = person;
    },
    CLEAR_PERSON_ID: function CLEAR_PERSON_ID(state, id) {
      return state.personId = id;
    },
    SET_PERSON_TOPIC_ID: function SET_PERSON_TOPIC_ID(state, topicID) {
      state.currentPerson.topicID.push(topicID);
    },
    SET_PERSON_ID: function SET_PERSON_ID(state, personId) {
      return state.personId = personId;
    },
    SET_SEARCH_ARRAY: function SET_SEARCH_ARRAY(state, array) {
      var _state$currentPerson$;

      //* splits the words into strings and stores in newArray
      var newArray = array.split(" ");

      (_state$currentPerson$ = state.currentPerson.searchArray).push.apply(_state$currentPerson$, _toConsumableArray(newArray));
    },
    UPDATE_SEARCH_ARRAY: function UPDATE_SEARCH_ARRAY(state, array) {
      var newArray = array.split(" ");
      state.currentPerson.searchArray = newArray;
    }
  })
};
exports["default"] = _default;