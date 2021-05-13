"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuexfire = require("vuexfire");

var _vuexMapFields = require("vuex-map-fields");

var _db = require("../../firebase/db");

var _router = _interopRequireDefault(require("../../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var eventsRef = _db.db.collection("events");

var _default = {
  namespaced: true,
  state: {
    topicId: null,
    events: [],
    eventId: null,
    currentEvent: {
      title: "",
      startDate: {
        date: "",
        era: true
      },
      endDate: {
        date: "",
        era: true
      },
      descriptionMD: "",
      mainMD: "",
      thumbURL: "",
      thumbFile: "",
      theme: [],
      searchArray: [],
      topicID: []
    },
    eventVideos: [],
    eventArticles: []
  },
  getters: {
    // currentTopicContents: (state) => state.id,
    currentTopicEvents: function currentTopicEvents(state) {
      return state.events;
    },
    currentEvent: function currentEvent(state) {
      return state.currentEvent;
    },
    currentEventId: function currentEventId(state) {
      return state.eventId;
    },
    currentEventVideos: function currentEventVideos(state) {
      return state.eventVideos;
    },
    currentEventArticles: function currentEventArticles(state) {
      return state.eventArticles;
    },
    getField: _vuexMapFields.getField
  },
  actions: {
    bindEvents: (0, _vuexfire.firestoreAction)(function (_ref) {
      var bindFirestoreRef = _ref.bindFirestoreRef,
          state = _ref.state;
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("events", _db.db.collection("events").where("topicID", "array-contains-any", [state.topicId]));
    }),
    //* set topicId to track current topic contents
    setEventTopicId: function setEventTopicId(_ref2) {
      var rootState = _ref2.rootState,
          state = _ref2.state,
          commit = _ref2.commit;
      console.log(rootState.topics.topicID);
      commit("SET_EVENT_TOPIC_ID", rootState.topics.topicID);
      console.log(state.currentEvent.topicID);
    },
    //* fetch all events under current topic id
    fetchEventsHandler: function fetchEventsHandler(_ref3) {
      var commit, rootState, dispatch;
      return regeneratorRuntime.async(function fetchEventsHandler$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref3.commit, rootState = _ref3.rootState, dispatch = _ref3.dispatch;
              _context.next = 3;
              return regeneratorRuntime.awrap(commit("SET_TOPIC_ID", rootState.topics.topicID));

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(dispatch("fetchEventsList"));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    //* fetches the list of all events under one topic
    fetchEventsList: function fetchEventsList(_ref4) {
      var commit, rootState, eventsList;
      return regeneratorRuntime.async(function fetchEventsList$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref4.commit, rootState = _ref4.rootState;
              eventsList = [];
              _context2.next = 4;
              return regeneratorRuntime.awrap(eventsRef.where("topicID", "array-contains-any", [rootState.topics.topicID]).get().then(function (querySnapshot) {
                querySnapshot.docs.map(function (doc) {
                  var eventItem = doc.data(); //* appends unique event id to each event

                  eventsList.push(_objectSpread({}, eventItem, {
                    id: doc.id
                  }));
                });
                commit("SET_TOPIC_EVENTS", eventsList);
              }));

            case 4:
              console.log(rootState.topics.topicID);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //* handler for add event button, clears the fields
    addEventForm: function addEventForm(_ref5) {
      var state, dispatch, commit, fields;
      return regeneratorRuntime.async(function addEventForm$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref5.state, dispatch = _ref5.dispatch, commit = _ref5.commit;
              fields = {
                title: "",
                startDate: {
                  date: "",
                  era: true
                },
                endDate: {
                  date: "",
                  era: true
                },
                descriptionMD: "",
                mainMD: "",
                thumbURL: "",
                thumbFile: "",
                theme: [],
                searchArray: [],
                topicID: []
              };
              _context3.next = 4;
              return regeneratorRuntime.awrap(commit("SET_CURRENT_EVENT", fields));

            case 4:
              _context3.next = 6;
              return regeneratorRuntime.awrap(dispatch("clearEventId"));

            case 6:
              _router["default"].push({
                name: "EventGeneral",
                path: "/events/general"
              });

              console.log(state.eventId);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //* handles submit new event data
    submitNewEvent: function submitNewEvent(_ref6) {
      var state, dispatch, rootState, commit;
      return regeneratorRuntime.async(function submitNewEvent$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref6.state, dispatch = _ref6.dispatch, rootState = _ref6.rootState, commit = _ref6.commit;
              _context4.next = 3;
              return regeneratorRuntime.awrap(dispatch("setEventTopicId"));

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(commit("SET_SEARCH_ARRAY", state.currentEvent.title));

            case 5:
              _context4.next = 7;
              return regeneratorRuntime.awrap(eventsRef.add(state.currentEvent).then(function () {
                console.log("Event Added");
                alert("Successfully added an event");
              }));

            case 7:
              console.log(rootState.topics.topicID);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //* clears the current eventId
    clearEventId: function clearEventId(_ref7) {
      var commit = _ref7.commit;
      commit("CLEAR_EVENT_ID", null);
    },
    //* handles the close button of a form
    closeForm: function closeForm(_ref8, name, path) {
      var state, dispatch;
      return regeneratorRuntime.async(function closeForm$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref8.state, dispatch = _ref8.dispatch;
              _context5.next = 3;
              return regeneratorRuntime.awrap(dispatch("clearEventId"));

            case 3:
              _router["default"].push({
                name: name,
                path: path
              });

              console.log(state.eventId);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    //* set current event for edit
    editEvent: function editEvent(_ref9, event) {
      var state, commit, index, currentEvent;
      return regeneratorRuntime.async(function editEvent$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref9.state, commit = _ref9.commit;
              _context6.next = 3;
              return regeneratorRuntime.awrap(commit("SET_EVENT_ID", event.id));

            case 3:
              //* sets the index of the event for edit
              index = state.events.findIndex(function (e) {
                return e.id == event.id;
              }); //* identifies the current event for edit

              currentEvent = state.events[index];
              _context6.next = 7;
              return regeneratorRuntime.awrap(commit("SET_CURRENT_EVENT", currentEvent));

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    //* handles submit for edit event
    submitEditEvent: function submitEditEvent(_ref10) {
      var state, commit;
      return regeneratorRuntime.async(function submitEditEvent$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              state = _ref10.state, commit = _ref10.commit;
              _context7.next = 3;
              return regeneratorRuntime.awrap(commit("UPDATE_SEARCH_ARRAY", state.currentEvent.title));

            case 3:
              _context7.next = 5;
              return regeneratorRuntime.awrap(eventsRef.doc(state.eventId).set(state.currentEvent, {
                merge: true
              }).then(function () {
                console.log(state.currentEvent);
                console.log("Submit Edit");
                alert("Successfully edited an event");
              }));

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    //* deletes the event from the database
    deleteEvent: function deleteEvent(_ref11, event) {
      var commit, state, dispatch;
      return regeneratorRuntime.async(function deleteEvent$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              commit = _ref11.commit, state = _ref11.state, dispatch = _ref11.dispatch;
              _context8.next = 3;
              return regeneratorRuntime.awrap(commit("SET_EVENT_ID", event.id));

            case 3:
              eventsRef.doc(state.eventId)["delete"]().then(function () {
                console.log("Deleted Event");
                alert("Event deleted");
              });
              dispatch("fetchEventsList");

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      });
    },
    //* dynamic save button
    handleSave: function handleSave(_ref12) {
      var state = _ref12.state,
          dispatch = _ref12.dispatch;

      if (state.eventId != null) {
        //* handles the submit as an edit if editing an event
        dispatch("submitEditEvent");
      } else {
        //* handles the submit as a new event if adding an event
        dispatch("submitNewEvent");
      }
    }
  },
  mutations: _objectSpread({}, _vuexfire.vuexfireMutations, {
    // setId: (state, id) => (state.id = id),
    SET_TOPIC_ID: function SET_TOPIC_ID(state, topicId) {
      return state.topicId = topicId;
    },
    SET_TOPIC_EVENTS: function SET_TOPIC_EVENTS(state, events) {
      return state.events = events;
    },
    SET_EVENT_ID: function SET_EVENT_ID(state, eventId) {
      return state.eventId = eventId;
    },
    SET_EVENT_TOPIC_ID: function SET_EVENT_TOPIC_ID(state, topicId) {
      state.currentEvent.topicID.push(topicId);
    },
    SET_EVENT_VIDEOS: function SET_EVENT_VIDEOS(state, videos) {
      return state.eventVideos = videos;
    },
    SET_EVENT_ARTICLES: function SET_EVENT_ARTICLES(state, articles) {
      return state.eventArticles = articles;
    },
    SET_CURRENT_EVENT: function SET_CURRENT_EVENT(state, event) {
      return state.currentEvent = event;
    },
    CLEAR_EVENT_ID: function CLEAR_EVENT_ID(state, id) {
      return state.eventId = id;
    },
    SET_SEARCH_ARRAY: function SET_SEARCH_ARRAY(state, array) {
      var _state$currentEvent$s;

      //* splits the words into strings and stores in newArray
      var newArray = array.split(" ");

      (_state$currentEvent$s = state.currentEvent.searchArray).push.apply(_state$currentEvent$s, _toConsumableArray(newArray));
    },
    UPDATE_SEARCH_ARRAY: function UPDATE_SEARCH_ARRAY(state, array) {
      var newArray = array.split(" ");
      state.currentEvent.searchArray = newArray;
    },
    // SET_NEW_EVENT: (state, currentEvent) =>
    updateField: _vuexMapFields.updateField
  })
};
exports["default"] = _default;