import { vuexfireMutations } from "vuexfire";
import { getField, updateField } from "vuex-map-fields";
import { db } from "../../firebase/db";
import firebase from "firebase";

const worksRef = db.collection("works");

export default {
    namespaced: true,

    state: {

        userEmail: null,
        userFirstName: null,
        userLastName: null,

        works: [],
        workId: null,
        workIndex: null,
        currentWork: {
            title: "",
            caption: "",
            thumbURL: "",
            thumbFile: "",
            topicID: [],
            searchArray: [],

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
        currentTopicWorks: (state) => state.works,
        userEmail: (state) => state.userEmail,
        userFirstName: (state) => state.userFirstName,
        userLastName: (state) => state.userLastName,
    },

    actions: {
        //* fetches list of works from firestore
        async fetchWorks({ rootState, commit, state }) {
            let workList = [];

            await worksRef
                .where("topicID", "array-contains-any", [rootState.topics.topicID])
                .get()
                .then(async(querySnapshot) => {
                    querySnapshot.docs.map((doc) => {
                        let workItem = doc.data();

                        //* appends unique work id to each work
                        workList.push({
                            ...workItem,
                            id: doc.id,
                        });
                    });
                    await commit("SET_TOPIC_WORKS", workList);
                });
            console.log(state.works);
        },

        //* clears work id
        clearWorkId({ commit }) {
            commit("SET_WORK_ID", null);
        },

        //* clears work fields
        clearWorkFields({ commit }) {
            commit("SET_CURRENT_WORK", {
                title: "",
                caption: "",
                thumbURL: "",
                thumbFile: "",
                topicID: [],
                searchArray: [],
            });
        },

        //* handles submit new work data
        async submitNewWork({ commit, rootState, state, dispatch }) {


            const createdFields = {
                name: state.userFirstName + " " + state.userLastName,
                username: state.userEmail,
                timestamp_created: firebase.firestore.FieldValue.serverTimestamp(),
            };

            commit("SET_CREATED_FIELDS", createdFields);

            commit("SET_WORK_TOPIC_ID", rootState.topics.topicID);
            commit("SET_SEARCH_ARRAY", state.currentWork.title);
            //* adds new work in firestore database
            await worksRef.add(state.currentWork).then(() => {
                console.log("Work added");
            });

            dispatch("fetchWorks");

            dispatch("clearWorkFields");
        },

        //* sets current work for edit
        async editWork({ commit, state }, work) {
            commit("SET_WORK_ID", work.id);

            //* returns the index of the work for edit
            let index = state.works.findIndex((e) => e.id == work.id);

            //* identifies the current work for edit using the index
            let currentWork = state.works[index];
            commit("SET_CURRENT_WORK", currentWork);
        },

        //* submit edited work
        async submitEditWork({ state, dispatch, commit }) {


            const updatedFields = {
                name: state.userFirstName + " " + state.userLastName,
                username: state.userEmail,
                timestamp_updated: firebase.firestore.FieldValue.serverTimestamp(),
            };

            commit("SET_UPDATED_FIELDS", updatedFields);

            await commit("UPDATE_SEARCH_ARRAY", state.currentWork.title);
            await worksRef
                .doc(state.workId)
                .set(state.currentWork, { merge: true })
                .then(() => {
                    console.log("Submit edit for " + state.currentWork.title);
                });
            dispatch("fetchWorks");
            dispatch("clearWorkId");
            dispatch("clearWorkFields");
        },

        //* delete work
        async deleteWork({ state, commit, dispatch }, work) {
            await commit("SET_WORK_ID", work.id);
            await worksRef
                .doc(state.workId)
                .delete()
                .then(() => {
                    console.log("Succesfully deleted");
                });

            //* finds and sets the index for delete
            dispatch("fetchWorks");
            commit("SET_WORK_ID", null);
            dispatch("clearWorkFields");
        },
    },

    mutations: {
        ...vuexfireMutations,
        updateField,
        SET_TOPIC_WORKS: (state, works) => (state.works = works),
        SET_WORK_TOPIC_ID: (state, topicId) => {
            state.currentWork.topicID.push(topicId);
        },
        SET_WORK_ID: (state, id) => (state.workId = id),
        SET_CURRENT_WORK: (state, work) => (state.currentWork = work),
        SET_SEARCH_ARRAY: (state, array) => {
            //* splits the words into strings and stores in newArray
            let newArray = array.split(" ");
            state.currentWork.searchArray.push(...newArray);
        },
        UPDATE_SEARCH_ARRAY: (state, array) => {
            let newArray = array.split(" ");
            state.currentWork.searchArray = newArray;
        },

        SET_UPDATED_FIELDS(state, updatedFields) {
            state.currentWork.updated = updatedFields;
        },

        SET_CREATED_FIELDS(state, createdFields) {
            state.currentWork.created = createdFields;
        },

        SET_USER_EMAIL(state, email) {
            console.log(email);
            state.userEmail = email;
        },

        SET_USER_NAME(state, { firstName, lastName }) {
            state.userFirstName = firstName;
            state.userLastName = lastName;
        },
    },
};