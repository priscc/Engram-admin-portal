import { vuexfireMutations } from "vuexfire";
import { getField, updateField } from "vuex-map-fields";
import { db } from "../../firebase/db";

const termRef = db.collection("terminology");

export default {
  namespaced: true,

  state: {
    terms: [],
    termId: null,
    termIndex: null,
    currentTerm: {
      term: "",
      def: "",
      thumbURL: "",
      thumbFile: "",
      searchArray: [],
      topicID: [],
    },
  },

  getters: {
    getField,
    currentTopicTerms: (state) => state.terms,
    currentTermId: (state) => state.termId,
    currentTerm: (state) => state.currentTerm,
    buttonLabel: (state) => {
      if (state.termId != null) {
        return "Edit Term";
      } else {
        return "+ Add Term";
      }
    },
  },

  actions: {
    //* fetches list of terms from firestore
    async fetchTerms({ rootState, commit, state }) {
      let termList = [];

      termRef
        .where("topicID", "array-contains-any", [rootState.topics.topicID])
        .get()
        .then(async (querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            let termItem = doc.data();

            //* appends unique term id to each id
            termList.push({
              ...termItem,
              id: doc.id,
            });
          }),
            await commit("SET_TOPIC_TERMS", termList);
        });
      console.log(state.terms);
    },

    //* clears term id
    clearTermId({ commit }) {
      commit("SET_TERM_ID", null);
    },

    //* handles submit new term data
    async submitNewTerm({ commit, rootState, state, dispatch }) {
      await commit("SET_TERM_TOPIC_ID", rootState.topics.topicID);
      await commit("SET_SEARCH_ARRAY", state.currentTerm.term);
      //* adds new term in firestore database
      await termRef.add(state.currentTerm).then(() => {
        console.log("Term Added");
      });

      //* fetch new list of terms
      dispatch("fetchTerms");

      //* clears the fields
      dispatch("clearFields");
    },

    //* clear fields
    clearFields({ commit }) {
      commit("SET_CURRENT_TERM", {
        term: "",
        def: "",
        thumbURL: "",
        thumbFile: "",
        searchArray: [],
        topicID: [],
      });
    },

    //* sets current term for edit
    editTerm({ commit, state }, term) {
      commit("SET_TERM_ID", term.id);

      //* returns the index of the term for edit
      let index = state.terms.findIndex((e) => e.id == term.id);

      //* identifies the current term for edit using the index
      let currentTerm = state.terms[index];
      // commit("SET_TERM_INDEX", index);
      commit("SET_CURRENT_TERM", currentTerm);
    },

    //* submit edit term
    async submitEditTerm({ state, dispatch, commit }) {
      await commit("UPDATE_SEARCH_ARRAY", state.currentTerm.term);
      await termRef
        .doc(state.termId)
        .set(state.currentTerm, { merge: true })
        .then(() => {
          console.log("Submit Edit for " + state.currentTerm.term);
        });
      dispatch("fetchTerms");

      //* clears the fields
      dispatch("clearFields");
      dispatch("clearTermId");
    },

    //* delete term
    async deleteTerm({ state, commit, dispatch }, term) {
      await commit("SET_TERM_ID", term.id);
      await termRef
        .doc(state.termId)
        .delete()
        .then(() => {
          console.log("Successfully deleted");
        });
      dispatch("fetchTerms");
      commit("SET_TERM_ID", null);
      dispatch("clearFields");
      console.log(state.terms);
    },
  },

  mutations: {
    ...vuexfireMutations,
    updateField,
    SET_TOPIC_TERMS: (state, terms) => (state.terms = terms),
    CLEAR_TERM_ID: (state, id) => (state.termId = id),
    SET_TERM_TOPIC_ID: (state, topicID) => {
      state.currentTerm.topicID.push(topicID);
    },
    ADD_TERM_TO_LIST: (state, term) => state.terms.unshift(term),
    SET_CURRENT_TERM: (state, fields) => (state.currentTerm = fields),
    SET_TERM_ID: (state, termId) => (state.termId = termId),
    SET_TERM_INDEX: (state, index) => (state.termIndex = index),
    DELETE_TERM: (state, index) => state.terms.splice(index, 1),
    SET_SEARCH_ARRAY: (state, array) => {
      //* splits the words into strings and stores in newArray
      let newArray = array.split(" ");
      state.currentTerm.searchArray.push(...newArray);
    },
    UPDATE_SEARCH_ARRAY: (state, array) => {
      let newArray = array.split(" ");
      state.currentTerm.searchArray = newArray;
    },
    // UPDATE_TERM: (state, term) => (state.terms[state.termIndex] = term),
  },
};
