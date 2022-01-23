import { vuexfireMutations, firestoreAction } from "vuexfire";
import { getField, updateField } from "vuex-map-fields";
import { db } from "../../firebase/db";

const resourcesRef = db.collection("resources");

export default {
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
      searchArray: [],
    },
  },
  getters: {
    getField,
    currentArticles: (state) => state.articles,
  },
  actions: {
    bindTopics: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("resources", db.collection("resources"));
    }),

    //* fetch all articles under topics
    async fetchArticles({ commit, state, rootState }, parentType) {
      let articleList = [];

      await resourcesRef
        .where("topicID", "array-contains-any", [rootState.topics.topicID])
        .where("parentType", "==", parentType)
        .where("resourceType", "==", "article")
        .get()
        .then(async (querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            let articleItem = doc.data();

            //* appends unique video id to each work
            articleList.push({
              ...articleItem,
              id: doc.id,
            });
          });
          await commit("SET_ARTICLES", articleList);
        });
      console.log("fetchArticles", state.articles);
    },

    //* fetches all article resources for an event
    async fetchContentArticles({ state, commit, rootState }, parentType) {
      const readParentID = (parentType) => {
        if (parentType == "event") {
          console.log("1) eventID (video):", rootState.events.eventId);
          return rootState.events.eventId;
        } else if (parentType == "people") {
          console.log("1) personId (person):", rootState.events.personId);
          return rootState.people.personId;
        }
      };
      let parentID = await readParentID(parentType);
      let articles = [];
      await resourcesRef
        .where("parentID", "==", parentID)
        .where("parentType", "==", parentType)
        .where("resourceType", "==", "article")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            console.log("2) fetching articles eventID:", parentID);
            let articleItem = doc.data();
            articles.push({
              ...articleItem,
              id: doc.id,
            });
          });
        });
      await commit("SET_ARTICLES", articles);
      console.log("3) fetched articles:", state.articles);
    },

    //* submit new article resource
    async submitNewArticle({ state, commit, rootState, dispatch }, parentType) {
      const readParentID = (parentType) => {
        if (parentType == "event") {
          return rootState.events.eventId;
        } else if (parentType == "people") {
          return rootState.people.personId;
        } else if (parentType == "topic") {
          return rootState.topics.topicID;
        }
      };
      let parentID = await readParentID(parentType);

      commit("SET_ARTICLE_PROPS", {
        parentID: parentID,
        parentType: parentType,
      });
      commit("SET_ARTICLE_TOPIC_ID", rootState.topics.topicID);
      commit("SET_SEARCH_ARRAY", state.currentArticle.title);
      if (parentID) {
        console.log("4) has parentID");

        //* adds new article to firestore
        await resourcesRef.add(state.currentArticle).then(() => {
          console.log("Submitted Article Resource");
        });
      } else {
        console.log("4) does not have parentID");
      }

      commit("UPDATE_ARTICLES");
      console.log("4) new article:", state.currentArticle);
      console.log("5) articles", state.articles);

      dispatch("clearArticleForm");
    },

    async addArticleToDB({ state }) {
      if (state.articles.length > 0) {
        var batch = db.batch();
        state.articles.forEach((doc) => {
          var docRef = resourcesRef.doc(); //automatically generate unique id
          batch.set(docRef, doc);
        });
        batch.commit();
        console.log("9) Submitted Articles:", state.articles);
      }
    },

    //* sets current article for edit
    editArticle({ commit, state }, article) {
      commit("SET_ARTICLE_ID", article.id);

      //* returns the index of the article for edit
      let index = state.articles.findIndex((e) => e.id == article.id);

      //* identifies the current video for edit using index
      let currentArticle = state.articles[index];
      commit("SET_CURRENT_ARTICLE_RESOURCE", currentArticle);
    },

    //* submit edit article
    async submitEditArticle({ state, commit }) {
      commit("UPDATE_SEARCH_ARRAY", state.currentArticle.title);
      await resourcesRef
        .doc(state.articleID)
        .set(state.currentArticle, { merge: true })
        .then(() => {
          console.log("Submit Edit for" + state.currentArticle.title);
        });
    },

    //* delete article
    async deleteArticle({ state, commit }, article) {
      await commit("SET_ARTICLE_ID", article.id);
      await resourcesRef
        .doc(state.articleID)
        .delete()
        .then(() => {
          console.log("Successfully deleted");
        });
      commit("SET_ARTICLE_ID", null);
    },

    //* clears article form
    clearArticleForm({ commit }) {
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
        searchArray: [],
      });
    },
  },
  mutations: {
    ...vuexfireMutations,
    updateField,
    SET_ARTICLES: (state, articles) => (state.articles = articles),
    SET_ARTICLE_ID: (state, id) => (state.articleID = id),
    SET_CURRENT_ARTICLE_RESOURCE: (state, article) =>
      (state.currentArticle = article),
    SET_ARTICLE_TOPIC_ID: (state, id) => {
      state.currentArticle.topicID.push(id);
    },
    SET_SEARCH_ARRAY: (state, array) => {
      //* splits the words into strings and stores in newArray
      let newArray = array.split(" ");
      state.currentArticle.searchArray.push(...newArray);
    },
    SET_ARTICLE_PROPS: (state, props) =>
      (state.currentArticle = {
        ...state.currentArticle,
        ...props,
      }),
    UPDATE_SEARCH_ARRAY: (state, array) => {
      let newArray = array.split(" ");
      state.currentArticle.searchArray = newArray;
    },
    UPDATE_ARTICLES: (state) => state.articles.push(state.currentArticle),
    UPDATE_ARTICLES_ID: (state, id) => {
      state.articles.forEach(function(article) {
        article.parentID = id;
      });
      console.log("8) update articles with eventids:", state.articles);
    },
  },
};
