import { vuexfireMutations } from "vuexfire";
import { getField, updateField } from "vuex-map-fields";
import { db } from "../../firebase/db";
import router from "../../router";

const peopleRef = db.collection("people");

export default {
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
        era: true,
      },
      dateOfPassing: {
        date: "",
        era: true,
      },
      topicID: [],
      searchArray: [],
    },
  },

  getters: {
    getField,
    currentTopicPeople: (state) => state.people,
    currentPersonId: (state) => state.personId,
    currentPerson: (state) => state.currentPerson,
  },

  actions: {
    //* sets the topic id for the current person
    setPersonTopicId({ rootState, state, commit }) {
      commit("SET_PERSON_TOPIC_ID", rootState.topics.topicID);
      console.log("set event topicid", state.currentPerson.topicID);
    },

    //* fetches the list of hist people under current topic
    async fetchPeople({ rootState, commit }) {
      let peopleList = [];
      await peopleRef
        .where("topicID", "array-contains-any", [rootState.topics.topicID])
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            let peopleItem = doc.data();

            //* appends unique event id to each event
            peopleList.push({
              ...peopleItem,
              id: doc.id,
            });
          });

          commit("SET_TOPIC_PEOPLE", peopleList);
        });
      console.log("Topic Figures:", peopleList);
    },

    //* handler for add historical person
    async addPersonForm({ state, dispatch, commit }) {
      const fields = {
        name: "",
        mainMD: "",
        thumbFile: "",
        thumbURL: "",
        dateOfBirth: {
          date: "",
          era: true,
        },
        dateOfPassing: {
          date: "",
          era: true,
        },
        topicID: [],
        searchArray: [],
      };
      // await dispatch('clearPersonId')
      await commit("SET_CURRENT_PERSON", fields);
      await dispatch("clearPersonId");
      router.push({
        name: "HistPeopleGeneral",
        path: "/historicalpeople/general",
      });
      console.log("Triggered adding person, personId:", state.personId);
    },

    //* handles submit new person data
    async submitNewPerson({ state, dispatch, commit }) {
      await dispatch("setPersonTopicId");
      await commit("SET_SEARCH_ARRAY", state.currentPerson.name);
      console.log("6) submitting new event", state.currentPerson);
      await peopleRef.add(state.currentPerson).then(function(docRef) {
        console.log("7) new Event id: ", docRef.id);
        commit("articles/UPDATE_ARTICLES_ID", docRef.id, { root: true });
        dispatch("articles/addArticleToDB", null, { root: true });
        commit("videos/UPDATE_VIDEOS_ID", docRef.id, { root: true });
        dispatch("videos/addVideoToDB", null, { root: true });
      });
      dispatch("closeForm", "HistoricalPeople", "/historicalpeople");
    },

    //* handles submit for edit person
    async submitEditPerson({ state, dispatch, commit }) {
      await commit("UPDATE_SEARCH_ARRAY", state.currentPerson.name);
      await peopleRef
        .doc(state.personId)
        .set(state.currentPerson, { merge: true })
        .then(() => {
          console.log("Submit Edit for " + state.currentPerson.name);
        });
      dispatch("closeForm", "HistoricalPeople", "/historicalpeople");
    },

    //* clears the current person id
    async clearPersonId({ commit }) {
      await commit("CLEAR_PERSON_ID", null);
    },

    //* handles the close button of a form
    async closeForm({ state, dispatch }, name, path) {
      await dispatch("clearPersonId");
      router.push({ name: name, path: path });
      console.log("closed figure form - should be null", state.eventId);
    },

    //* sets current event for edit
    async editPerson({ state, commit }, person) {
      await commit("SET_PERSON_ID", person.id);

      //* sets the index of the person for edit
      let index = state.people.findIndex((e) => e.id == person.id);

      //* identifies the current person for edit
      let currentPerson = state.people[index];

      commit("SET_CURRENT_PERSON", currentPerson);

      // await dispatch("fetchPersonResources");
    },

    //* deletes person from the database
    async deletePerson({ commit, state, dispatch }, person) {
      await commit("SET_PERSON_ID", person.id);
      peopleRef
        .doc(state.personId)
        .delete()
        .then(() => {
          console.log("Successfully deleted");
        });
      setTimeout(() => dispatch("fetchPeople"), 200);
    },

    //* dynamic save button
    handleSave({ state, dispatch }) {
      if (state.personId != null) {
        //* handles the submit as an edit if editing a person
        dispatch("submitEditPerson");
      } else {
        //* handles the submit as a new event if adding a person
        dispatch("submitNewPerson");
      }
    },
  },

  mutations: {
    ...vuexfireMutations,
    updateField,
    SET_TOPIC_PEOPLE: (state, people) => (state.people = people),
    SET_CURRENT_PERSON: (state, person) => (state.currentPerson = person),
    CLEAR_PERSON_ID: (state, id) => (state.personId = id),
    SET_PERSON_TOPIC_ID: (state, topicID) => {
      state.currentPerson.topicID.push(topicID);
    },
    SET_PERSON_ID: (state, personId) => (state.personId = personId),
    SET_SEARCH_ARRAY: (state, array) => {
      //* splits the words into strings and stores in newArray
      let newArray = array.split(" ");
      state.currentPerson.searchArray.push(...newArray);
    },
    UPDATE_SEARCH_ARRAY: (state, array) => {
      let newArray = array.split(" ");
      state.currentPerson.searchArray = newArray;
    },
  },
};
