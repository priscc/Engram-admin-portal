import { vuexfireMutations } from "vuexfire";
import { getField, updateField } from "vuex-map-fields";
import { db } from "../../firebase/db";

import firebase from "firebase";

const trendRef = db.collection("trends");

export default {
    namespaced: true,

    state: {
        userEmail: null,
        userFirstName: null,
        userLastName: null,

        trends: [],
        trendId: null,
        trendIndex: null,
        currentTrend: {
            type: "",
            trend: "",
            trendName: "",
            topicID: [],
            created: {
                name: "",
                username: "",
                timestamp_created: null,
            },

            updated: {
                name: "",
                username: "",
                timestamp_updated: null,
            },
        },

    },

    getters: {
        getField,
        currentTopicTrends: (state) => state.trends,
        currentTrendId: (state) => state.trendId,
        currentTrend: (state) => state.currentTrend,
        // created: (state) => state.created,
        // updated: (state) => state.updated,
        buttonLabel: (state) => {
            if (state.trendId != null) {
                return "Edit Trend";
            } else {
                return "+ Add Trend";
            }
        },
        userEmail: (state) => store.state.user.userEmail,
        userFirstName: (state) => store.state.user.userFirstName,
        userLastName: (state) => store.state.user.userLastName,

    },

    actions: {
        //* fetches list of trends from firestore
        async fetchTrends({ rootState, commit, state }) {
            let trendList = [];

            trendRef
                .where("topicID", "array-contains-any", [rootState.topics.topicID])
                .get()
                .then(async(querySnapshot) => {
                    querySnapshot.docs.map((doc) => {
                            let trendItem = doc.data();

                            //* appends unique trend id to each id
                            trendList.push({
                                ...trendItem,
                                id: doc.id,
                            });
                        }),
                        await commit("SET_TOPIC_TRENDS", trendList);
                });
            // console.log(state.trends);
        },

        //* clears trend id
        clearTrendId({ commit }) {
            commit("SET_TREND_ID", null);
        },

        //* handles submit new trend data
        async submitNewTrend({ commit, rootState, state, dispatch }) {

            const createdFields = {
                name: state.userFirstName + " " + state.userLastName,
                username: state.userEmail,
                timestamp_created: firebase.firestore.FieldValue.serverTimestamp(),
            };

            commit("SET_CREATED_FIELDS", createdFields);

            await commit("SET_TREND_TOPIC_ID", rootState.topics.topicID);
            //* adds new trend in firestore database
            await trendRef.add(state.currentTrend).then(() => {
                console.log("Trend Added");
            });

            //* fetch new list of trends
            dispatch("fetchTrends");

            //* clears the fields
            dispatch("clearFields");

        },

        //* clear fields
        clearFields({ commit }) {
            commit("SET_CURRENT_TREND", {
                type: "",
                trend: "",
                trendName: "",
                topicID: [],
            });
        },

        //* sets current trend for edit
        editTrend({ commit, state }, trend) {
            console.log(trend)
            commit("SET_TREND_ID", trend.id);

            //* returns the index of the trend for edit
            let index = state.trends.findIndex((e) => e.id == trend.id);

            //* identifies the current trend for edit using the index
            let currentTrend = state.trends[index];
            commit("SET_TREND_INDEX", index);
            commit("SET_CURRENT_TREND", currentTrend);


        },



        //* submit edit trend
        async submitEditTrend({ state, commit, dispatch }) {

            const updatedFields = {
                name: state.userFirstName + " " + state.userLastName,
                username: state.userEmail,
                timestamp_updated: firebase.firestore.FieldValue.serverTimestamp(),
            };

            console.log(state.userEmail);

            commit("SET_UPDATED_FIELDS", updatedFields);

            await trendRef
                .doc(state.trendId)
                .set(state.currentTrend, { merge: true })
                .then(() => {
                    console.log("Submit Edit for " + state.currentTrend.trend);
                });
            dispatch("fetchTrends");

            //* clears the fields
            dispatch("clearFields");
            dispatch("clearTrendId");
        },

        //* delete trend
        async deleteTrend({ state, commit, dispatch }, trend) {
            await commit("SET_TREND_ID", trend.id);
            await trendRef
                .doc(state.trendId)
                .delete()
                .then(() => {
                    console.log("Successfully deleted");
                });
            dispatch("fetchTrends");
            commit("SET_TREND_ID", null);
            dispatch("clearFields");
            console.log(state.trend);
        },
    },

    mutations: {
        SET_USER_EMAIL(state, email) {
            console.log(email);
            state.userEmail = email;
        },

        SET_USER_NAME(state, { firstName, lastName }) {
            state.userFirstName = firstName;
            state.userLastName = lastName;
        },

        ...vuexfireMutations,
        updateField,
        SET_TOPIC_TRENDS: (state, trends) => (state.trends = trends),
        CLEAR_TERM_ID: (state, id) => (state.trendId = id),
        SET_TREND_TOPIC_ID: (state, topicID) => {
            state.currentTrend.topicID.push(topicID);
        },
        SET_CURRENT_TREND: (state, fields) => (state.currentTrend = fields),
        SET_TREND_ID: (state, trendId) => (state.trendId = trendId),
        SET_TREND_INDEX: (state, index) => (state.trendIndex = index),
        DELETE_TREND: (state, index) => state.trend.splice(index, 1),

        SET_UPDATED_FIELDS(state, updatedFields) {
            state.currentTrend.updated = updatedFields;
        },

        SET_CREATED_FIELDS(state, createdFields) {
            state.currentTrend.created = createdFields;
        },
        // UPDATE_TERM: (state, term) => (state.terms[state.termIndex] = term),
    },
};