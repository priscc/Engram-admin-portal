// import { vuexfireMutations } from "vuexfire";
// // import { db } from "../../firebase/db";
// import router from "../../router";
// // const termRef = db.collection("terminology");
// // const primSourcesRef = db.collection("works");
// export default {
//   namespaced: true,
//   state: {
//     id: null,
//     people: [],
//     // terms: [],
//     primarySources: [],
//   },
//   getters: {
//     currentTopicContents: (state) => state.id,
//     currentPrimSources: (state) => state.primarySources,
//   },
//   actions: {
//     async handleEditTopicContents({ commit }, topic) {
//       await commit("setId", topic.id);
//       router.push({ name: "Events", path: "/events" });
//     },
//   },
//   mutations: {
//     ...vuexfireMutations,
//     setId: (state, id) => (state.id = id),
//     setPrimSources: (state, primarySources) =>
//       (state.primarySources = primarySources),
//   },
// };
"use strict";