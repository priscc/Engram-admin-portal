import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/db.js";
import createPersistedState from "vuex-persistedstate";
import topics from "./modules/topics";
import events from "./modules/events";
import trends from "./modules/trends";
import people from "./modules/people";
import terminology from "./modules/terminology";
import works from "./modules/works";
import videos from "./modules/videos";
import articles from "./modules/articles";

Vue.use(Vuex);
Vue.use(db);

export default new Vuex.Store({
    strict: true,
    modules: {
        events,
        trends,
        topics,
        people,
        terminology,
        works,
        videos,
        articles,
    },
    plugins: [
        createPersistedState({
            paths: [
                "events",
                "trends",
                "topics",
                "people",
                "terminology",
                "works",
                "videos",
                "articles",
            ],
        }),
    ],
});