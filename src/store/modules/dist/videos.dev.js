"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuexfire = require("vuexfire");

var _vuexMapFields = require("vuex-map-fields");

var _db = require("../../firebase/db");

var _vueYoutubeEmbed = require("vue-youtube-embed");

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
    videos: [],
    articles: [],
    videoID: null,
    videoURL: null,
    contentID: null,
    currentVideoResource: {
      parentID: "",
      parentType: "",
      resourceType: "",
      url: "",
      title: "",
      topicID: [],
      searchArray: []
    }
  },
  getters: {
    getField: _vuexMapFields.getField,
    currentVideos: function currentVideos(state) {
      return state.videos;
    },
    currentArticles: function currentArticles(state) {
      return state.articles;
    },
    currentVideoURL: function currentVideoURL(state) {
      return (0, _vueYoutubeEmbed.getIdFromURL)(state.videoURL);
    }
  },
  actions: {
    bindTopics: (0, _vuexfire.firestoreAction)(function (_ref) {
      var bindFirestoreRef = _ref.bindFirestoreRef;
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("resources", _db.db.collection("resources"));
    }),
    //* fetches all videos under topics
    fetchVideos: function fetchVideos(_ref2, parentType) {
      var commit, state, rootState, videoList;
      return regeneratorRuntime.async(function fetchVideos$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit, state = _ref2.state, rootState = _ref2.rootState;
              videoList = [];
              _context2.next = 4;
              return regeneratorRuntime.awrap(resourcesRef.where("topicID", "array-contains-any", [rootState.topics.topicID]).where("parentType", "==", parentType).where("resourceType", "==", "video").get().then(function _callee(querySnapshot) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        querySnapshot.docs.map(function (doc) {
                          var videoItem = doc.data(); //* appends unique video id to each work

                          videoList.push(_objectSpread({}, videoItem, {
                            id: doc.id
                          }));
                        });
                        _context.next = 3;
                        return regeneratorRuntime.awrap(commit("SET_VIDEOS", videoList));

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              }));

            case 4:
              console.log(state.videos);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //* fetches all video resources under topic contents
    fetchContentVideos: function fetchContentVideos(_ref3, parentType) {
      var commit, rootState, readParentID, parentID, videos;
      return regeneratorRuntime.async(function fetchContentVideos$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref3.commit, rootState = _ref3.rootState;

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
              videos = [];
              _context3.next = 8;
              return regeneratorRuntime.awrap(resourcesRef.where("parentID", "==", parentID).where("parentType", "==", parentType).where("resourceType", "==", "video").get().then(function (querySnapshot) {
                querySnapshot.docs.map(function (doc) {
                  var videoItem = doc.data();
                  videos.push(_objectSpread({}, videoItem, {
                    id: doc.id
                  }));
                });
              }));

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(commit("SET_VIDEOS", videos));

            case 10:
              console.log(parentID);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //* clears video resource form
    clearVideoForm: function clearVideoForm(_ref4) {
      var commit = _ref4.commit,
          state = _ref4.state;
      commit("SET_CURRENT_VIDEO_RESOURCE", {
        parentID: "",
        parentType: "",
        resourceType: "video",
        url: "",
        title: "",
        topicID: [],
        searchArray: []
      });
      commit("SET_YOUTUBE_ID", "");
      console.log(state.currentVideoResource);
    },
    //* handles submit video resource
    submitNewVideo: function submitNewVideo(_ref5, parentType) {
      var state, commit, dispatch, rootState, url, readParentID, parentID;
      return regeneratorRuntime.async(function submitNewVideo$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, dispatch = _ref5.dispatch, rootState = _ref5.rootState;
              url = (0, _vueYoutubeEmbed.getIdFromURL)(state.videoURL);
              commit("SET_YOUTUBE_URL", url); //* sets parentID

              readParentID = function readParentID(parentType) {
                if (parentType == "event") {
                  return rootState.events.eventId;
                } else if (parentType == "people") {
                  return rootState.people.personId;
                } else if (parentType == "topic") {
                  return rootState.topics.topicID;
                }
              };

              _context4.next = 6;
              return regeneratorRuntime.awrap(readParentID(parentType));

            case 6:
              parentID = _context4.sent;
              commit("SET_VIDEO_PROPS", {
                parentID: parentID,
                parentType: parentType
              });
              commit("SET_VIDEO_TOPIC_ID", rootState.topics.topicID);
              commit("SET_SEARCH_ARRAY", state.currentVideoResource.title);
              console.log(state.currentVideoResource); //* adds new video to firestore

              _context4.next = 13;
              return regeneratorRuntime.awrap(resourcesRef.add(state.currentVideoResource).then(function () {
                console.log("Submitted Video Resource");
                alert("Successfully added a video");
              }));

            case 13:
              dispatch("clearVideoForm");
              alert("Submitted Video Resource");

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //* sets current video for edit
    editVideo: function editVideo(_ref6, video) {
      var commit = _ref6.commit,
          state = _ref6.state;
      commit("SET_VIDEO_ID", video.id); //* returns the index of the video for edit

      var index = state.videos.findIndex(function (e) {
        return e.id == video.id;
      }); //* identifies the current video for edit using index

      var currentVideo = state.videos[index];
      commit("SET_CURRENT_VIDEO_RESOURCE", currentVideo);
      commit("SET_YOUTUBE_ID", currentVideo.url);
    },
    //* submit edit video
    submitEditVideo: function submitEditVideo(_ref7) {
      var state, dispatch, commit, url;
      return regeneratorRuntime.async(function submitEditVideo$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref7.state, dispatch = _ref7.dispatch, commit = _ref7.commit;
              url = (0, _vueYoutubeEmbed.getIdFromURL)(state.videoURL);
              commit("SET_YOUTUBE_URL", url);
              commit("UPDATE_SEARCH_ARRAY", state.currentVideoResource.title);
              _context5.next = 6;
              return regeneratorRuntime.awrap(resourcesRef.doc(state.videoID).set(state.currentVideoResource, {
                merge: true
              }).then(function () {
                console.log("Submit Edit for " + state.currentVideoResource.title);
                alert("Successfully edited a video");
              }));

            case 6:
              dispatch("clearVideoForm");

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    //* delete video
    deleteVideo: function deleteVideo(_ref8, video) {
      var state, commit, dispatch;
      return regeneratorRuntime.async(function deleteVideo$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit, dispatch = _ref8.dispatch;
              _context6.next = 3;
              return regeneratorRuntime.awrap(commit("SET_VIDEO_ID", video.id));

            case 3:
              _context6.next = 5;
              return regeneratorRuntime.awrap(resourcesRef.doc(state.videoID)["delete"]().then(function () {
                console.log("Successfully deleted");
                alert("Successfully deleted a video");
              }));

            case 5:
              commit("SET_VIDEO_ID", null);
              dispatch("clearVideoForm");

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  },
  mutations: _objectSpread({}, _vuexfire.vuexfireMutations, {
    updateField: _vuexMapFields.updateField,
    SET_VIDEOS: function SET_VIDEOS(state, videos) {
      return state.videos = videos;
    },
    SET_VIDEO_ID: function SET_VIDEO_ID(state, id) {
      return state.videoID = id;
    },
    SET_YOUTUBE_URL: function SET_YOUTUBE_URL(state, url) {
      return state.currentVideoResource.url = url;
    },
    SET_YOUTUBE_ID: function SET_YOUTUBE_ID(state, id) {
      return state.videoURL = id;
    },
    SET_VIDEO_PROPS: function SET_VIDEO_PROPS(state, props) {
      return state.currentVideoResource = _objectSpread({}, state.currentVideoResource, {}, props);
    },
    SET_VIDEO_TOPIC_ID: function SET_VIDEO_TOPIC_ID(state, id) {
      state.currentVideoResource.topicID.push(id);
    },
    SET_SEARCH_ARRAY: function SET_SEARCH_ARRAY(state, array) {
      var _state$currentVideoRe;

      //* splits the words into strings and stores in newArray
      var newArray = array.split(" ");

      (_state$currentVideoRe = state.currentVideoResource.searchArray).push.apply(_state$currentVideoRe, _toConsumableArray(newArray));
    },
    SET_CURRENT_VIDEO_RESOURCE: function SET_CURRENT_VIDEO_RESOURCE(state, fields) {
      return state.currentVideoResource = fields;
    },
    UPDATE_SEARCH_ARRAY: function UPDATE_SEARCH_ARRAY(state, array) {
      var newArray = array.split(" ");
      state.currentVideoResource.searchArray = newArray;
    }
  })
};
exports["default"] = _default;