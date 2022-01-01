import { vuexfireMutations, firestoreAction } from "vuexfire";
import { getField, updateField } from "vuex-map-fields";
import { db } from "../../firebase/db";
import router from "../../router";

const eventsRef = db.collection("events");

export default {
  namespaced: true,
  state: {
    topicId: null,
    events: [],
    eventId: null,
    currentEvent: {
      title: "",
      startDate: {
        date: "",
        era: true,
      },
      endDate: {
        date: "",
        era: true,
      },
      descriptionMD: "",
      mainMD: "",
      thumbURL: "",
      thumbFile: "",
      imageData: "",
      theme: [],
      searchArray: [],
      topicID: [],
      coordinates: {},
    },
    eventVideos: [],
    eventArticles: [],
  },

  getters: {
    // currentTopicContents: (state) => state.id,
    currentTopicEvents: (state) => state.events,
    currentEvent: (state) => state.currentEvent,
    currentEventId: (state) => state.eventId,
    currentEventVideos: (state) => state.eventVideos,
    currentEventArticles: (state) => state.eventArticles,
    getField,
  },

  actions: {
    bindEvents: firestoreAction(({ bindFirestoreRef, state }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        "events",
        db
          .collection("events")
          .where("topicID", "array-contains-any", [state.topicId])
      );
    }),

    //* set topicId to track current topic contents
    setEventTopicId({ rootState, state, commit }) {
      console.log(rootState.topics.topicID);
      commit("SET_EVENT_TOPIC_ID", rootState.topics.topicID);
      console.log(state.currentEvent.topicID);
    },

    //* fetch all events under current topic id
    async fetchEventsHandler({ commit, rootState, dispatch }) {
      await commit("SET_TOPIC_ID", rootState.topics.topicID);
      await dispatch("fetchEventsList");
    },

    //* fetches the list of all events under one topic
    async fetchEventsList({ commit, rootState }) {
      let eventsList = [];
      await eventsRef
        .where("topicID", "array-contains-any", [rootState.topics.topicID])
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            let eventItem = doc.data();

            //* appends unique event id to each event
            eventsList.push({
              ...eventItem,
              id: doc.id,
            });
          });
          commit("SET_TOPIC_EVENTS", eventsList);
        });
      // console.log(state.topicId);
    },

    //* handler for add event button, clears the fields
    async addEventForm({ state, dispatch, commit }) {
      const fields = {
        title: "",
        startDate: {
          date: "",
          era: true,
        },
        endDate: {
          date: "",
          era: true,
        },
        descriptionMD: "",
        mainMD: "",
        thumbURL: "",
        thumbFile: "",
        imageData: "",
        theme: [],
        searchArray: [],
        topicID: [],
        coordinates: {},
      };
      await commit("SET_CURRENT_EVENT", fields);
      await dispatch("clearEventId");
      router.push({ name: "EventGeneral", path: "/events/general" });
      console.log(state.eventId);
    },

    //* handles submit new event data
    async submitNewEvent({ state, dispatch, rootState, commit }) {
      await dispatch("setEventTopicId");
      await commit("SET_SEARCH_ARRAY", state.currentEvent.title);
      console.log("state", state.currentEvent);
      await eventsRef.add(state.currentEvent).then(() => {
        console.log("Event Added");
      });
      dispatch("closeForm", "Events", "/events");
      console.log(rootState.topics.topicID);
    },
    //* handles submit for edit event
    async submitEditEvent({ state, dispatch, commit }) {
      await commit("UPDATE_SEARCH_ARRAY", state.currentEvent.title);
      await eventsRef
        .doc(state.eventId)
        .set(state.currentEvent, { merge: true })
        .then(() => {
          console.log("Submit Edit" + state.currentEvent);
        });
      dispatch("closeForm", "Events", "/events");
    },
    //* clears the current eventId
    clearEventId({ commit }) {
      commit("CLEAR_EVENT_ID", null);
    },

    //* handles the close button of a form
    async closeForm({ state, dispatch }, name, path) {
      await dispatch("clearEventId");
      router.push({ name: name, path: path });
      console.log(state.eventId);
    },

    //* set current event for edit
    async editEvent({ state, commit }, event) {
      await commit("SET_EVENT_ID", event.id);

      //* sets the index of the event for edit
      let index = state.events.findIndex((e) => e.id == event.id);

      //* identifies the current event for edit
      let currentEvent = state.events[index];

      await commit("SET_CURRENT_EVENT", currentEvent);
      // await dispatch("getEvent");
    },

    //* deletes the event from the database
    async deleteEvent({ commit, state, dispatch }, event) {
      await commit("SET_EVENT_ID", event.id);
      eventsRef
        .doc(state.eventId)
        .delete()
        .then(() => {
          console.log("Deleted Event");
        });
      dispatch("fetchEventsList");
    },

    //* dynamic save button
    handleSave({ state, dispatch }) {
      if (state.eventId != null) {
        //* handles the submit as an edit if editing an event
        dispatch("submitEditEvent");
      } else {
        //* handles the submit as a new event if adding an event
        dispatch("submitNewEvent");
      }
    },
  },

  mutations: {
    ...vuexfireMutations,
    // setId: (state, id) => (state.id = id),
    SET_TOPIC_ID: (state, topicId) => (state.topicId = topicId),
    SET_TOPIC_EVENTS: (state, events) => (state.events = events),
    SET_EVENT_ID: (state, eventId) => (state.eventId = eventId),
    SET_EVENT_TOPIC_ID: (state, topicId) => {
      state.currentEvent.topicID.push(topicId);
    },
    SET_EVENT_VIDEOS: (state, videos) => (state.eventVideos = videos),
    SET_EVENT_ARTICLES: (state, articles) => (state.eventArticles = articles),
    SET_CURRENT_EVENT: (state, event) => (state.currentEvent = event),
    CLEAR_EVENT_ID: (state, id) => (state.eventId = id),
    SET_SEARCH_ARRAY: (state, array) => {
      //* splits the words into strings and stores in newArray
      let newArray = array.split(" ");
      state.currentEvent.searchArray.push(...newArray);
    },
    UPDATE_SEARCH_ARRAY: (state, array) => {
      let newArray = array.split(" ");
      state.currentEvent.searchArray = newArray;
    },
    // SET_NEW_EVENT: (state, currentEvent) =>
    updateField,
  },
};
