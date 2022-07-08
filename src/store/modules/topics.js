import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../../firebase/db";
import { getField, updateField } from "vuex-map-fields";
import router from "../../router";

const topicsRef = db.collection("topics");
const resourcesRef = db.collection("resources");

export default {
  namespaced: true,
  state: {
    topics: [],
    topicID: null,
    currentTopic: {
      title: "",
      timespan: "",
      introMD: undefined,
      intro_thumbFile: "",
      intro_thumbURL: "",
      topic_thumbFile: "",
      topic_thumbURL: "",
      disabled: true,
      timePeriod: null,
      searchArray: [],
      // markupIntro: undefined,
    },
    videoID: null,
    videoURL: null,
    resources: [],
    articles: [],
    videos: [],
  },

  getters: {
    allTopics: (state) => state.topics,
    currentId: (state) => state.topicID,
    currentTopic: (state) => state.currentTopic,
    currentResources: (state) => state.resources,
    currentArticles: (state) => state.articles,
    getField,
  },

  actions: {
    bindTopics: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("topics", db.collection("topics"));
    }),

    //* add topic
    async addTopicForm({ state, commit }) {
      const fields = {
        title: "",
        introMD: undefined,
        timespan: "",
        intro_thumbFile: "",
        intro_thumbURL: "",
        topic_thumbFile: "",
        topic_thumbURL: "",
        disabled: true,
        timePeriod: null,
        searchArray: [],
        // markupIntro: undefined,
      };
      await commit("SET_CURRENT_TOPIC", fields);
      console.log(state.currentTopic);
    },

    //* submit new topic
    async submitNewTopic({ state, commit, dispatch }) {
      commit("SET_SEARCH_ARRAY", state.currentTopic.title);
      // console.log("MarkUP", state.currentTopic.markupIntro);
      await topicsRef
        .add(state.currentTopic)
        .then(() => {
          console.log("Submitted New Topic");
          router.replace({ path: "/topiclist" });
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      console.log(state.currentTopic);

      //* clears the fields
      dispatch("clearFields");
    },

    //* fetches all topics from firestore
    async fetchTopics({ commit }) {
      let documents = [];
      await topicsRef.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          let topicItemData = doc.data();
          //* gets the unique topic id and appends it in each topic
          documents.push({
            ...topicItemData,
            id: doc.id,
          });
        });
        //* sorts the topics according to its time period
        const result = documents.reduce(function(r, a) {
          r[a.timePeriod] = r[a.timePeriod] || [];
          r[a.timePeriod].push(a);
          return r;
        }, Object.create(null));
        commit("SET_TOPICS", result);
      });
    },

    //* clear fields
    clearFields({ commit }) {
      commit("SET_CURRENT_TOPIC", {
        title: "",
        introMD: undefined,
        timespan: "",
        intro_thumbFile: "",
        intro_thumbURL: "",
        topic_thumbFile: "",
        topic_thumbURL: "",
        disabled: true,
        timePeriod: null,
        searchArray: [],
        // markupIntro: undefined,
      });
    },

    //* topic id gets stored to the state and used in querying the specific topic
    async editTopic({ state, commit }, topic) {
      await commit("SET_ID", topic.id);
      //* identifies the time period of the topic for edit
      let period = Object.keys(state.topics).filter(
        (time) => time == topic.timePeriod
      );
      let timePeriod = parseInt(period[0]);

      //* sets the list of array under one time period
      let topicList = state.topics[timePeriod];
      let index = topicList.findIndex((e) => e.id == topic.id);

      //* identifies the current topic for edit
      let currentTopic = topicList[index];
      commit("SET_CURRENT_TOPIC", currentTopic);
    },

    //* handles submit for edit topic
    async submitEditTopic({ state, commit, dispatch }) {
      commit("UPDATE_SEARCH_ARRAY", state.currentTopic.title);
      console.log("MarkUP", state.currentTopic.introMD);
      await topicsRef
        .doc(state.topicID)
        .set(state.currentTopic)
        .then(() => {
          console.log("Submitted Edited Topic");
          // alert("Successfully edited topic");
        });
      dispatch("closeForm", "TopicList", "/topiclist");
    },

    //* clears term id
    clearTopicId({ commit }) {
      commit("SET_ID", null);
    },

    //* handles the close button of a form
    async closeForm({ dispatch }, name, path) {
      await dispatch("clearTopicId");
      router.push({ name: name, path: path });
      console.log("closed topic form");
    },

    //* gets all articles for a topic
    async fetchArticles({ state, commit }) {
      let articlesList = [];

      await resourcesRef
        .where("topicID", "array-contains-any", [state.topicID])
        .where("parentType", "==", "topic")
        .where("resourceType", "==", "article")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            let articleItem = doc.data();

            //* appends unique article id to each article
            articlesList.push({
              ...articleItem,
              id: doc.id,
            });
          });
          commit("SET_ARTICLES", articlesList);
        });
    },
  },

  mutations: {
    ...vuexfireMutations,
    SET_TOPICS: (state, topics) => (state.topics = topics),
    SET_ID: (state, id) => (state.topicID = id),
    SET_CURRENT_TOPIC: (state, topic) => (state.currentTopic = topic),
    SET_ARTICLES: (state, articles) => (state.articles = articles),
    SET_SEARCH_ARRAY: (state, array) => {
      //* splits the words into strings and stores in newArray
      let newArray = array.split(" ");
      state.currentTopic.searchArray.push(...newArray);
    },
    UPDATE_SEARCH_ARRAY: (state, array) => {
      let newArray = array.split(" ");
      state.currentTopic.searchArray = newArray;
    },
    INTRO_MARKUP: (state, i) => {
      console.log("IN HERE, MARkUP");
      state.currentTopic.introMD = i;
    },
    updateField,
  },
};
