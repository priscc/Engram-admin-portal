import Vue from "vue";
// import VueRouter from 'vue-router'
import Router from "vue-router";
import firebase from "firebase";
import Home from "../views/Home.vue";
// import AddContent from "@/components/AddContent.vue";
// import AddContent from "@/components/AddContent.vue";
import AddTopicForm from "@/components/AddTopic/AddTopicForm.vue";
// import ModifyTopic from '@/components/ModifyTopic/ModifyTopic.vue'
import TopicList from "@/components/ModifyTopic/TopicList.vue";
import General from "@/components/ModifyTopic/Forms/General.vue";
import Text from "@/components/ModifyTopic//Forms/Text.vue";
import Resources from "@/components/ModifyTopic//Forms/Resources.vue";
import ModifyContent from "@/components/ModifyContent/ModifyContent.vue";
import Events from "@/components/ModifyContent/ContentDetails/Events/Events.vue";
import EventGeneral from "@/components/ModifyContent/ContentDetails/Events/Forms/EventGeneral.vue";
import EventMap from "@/components/ModifyContent/ContentDetails/Events/Forms/EventMap.vue";
import EventText from "@/components/ModifyContent/ContentDetails/Events/Forms/EventText.vue";
import EventResources from "@/components/ModifyContent/ContentDetails/Events/Forms/EventResources.vue";
import HistoricalPeople from "@/components/ModifyContent/ContentDetails/HistoricalPeople/HistoricalPeople.vue";
import HistPeopleGeneral from "@/components/ModifyContent/ContentDetails/HistoricalPeople/Forms/HistPeopleGeneral.vue";
import HistPeopleText from "@/components/ModifyContent/ContentDetails/HistoricalPeople/Forms/HistPeopleText.vue";
import HistPeopleResources from "@/components/ModifyContent/ContentDetails/HistoricalPeople/Forms/HistPeopleResources.vue";
import Terminology from "@/components/ModifyContent/ContentDetails/Terminology/Terminology.vue";
import PrimarySources from "@/components/ModifyContent/ContentDetails/PrimarySources/PrimarySources.vue";
import Login from "@/components/auth/Login.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/",
      redirect: "/login",
      meta: {
        requiresGuest: true,
      },
    },
    // {
    //   path: "/addcontent",
    //   name: "Add Content",
    //   component: AddContent,
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/addtopicform",
      name: "AddTopicForm",
      component: AddTopicForm,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/topiclist",
      name: "TopicList",
      component: TopicList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/topiclist/general",
      name: "General",
      component: General,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/topiclist/text",
      name: "Text",
      component: Text,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/topiclist/resources",
      name: "Resources",
      component: Resources,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent",
      name: "ModifyContent",
      component: ModifyContent,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/events",
      name: "Events",
      component: Events,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/events/general",
      name: "EventGeneral",
      component: EventGeneral,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/events/map",
      name: "EventMap",
      component: EventMap,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/events/text",
      name: "EventText",
      component: EventText,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/events/resources",
      name: "EventResources",
      component: EventResources,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/historicalpeople",
      name: "HistoricalPeople",
      component: HistoricalPeople,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/historicalpeople/general",
      name: "HistPeopleGeneral",
      component: HistPeopleGeneral,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/historicalpeople/text",
      name: "HistPeopleText",
      component: HistPeopleText,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/historicalpeople/resources",
      name: "HistPeopleResources",
      component: HistPeopleResources,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/terminology",
      name: "Terminology",
      component: Terminology,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modifycontent/primarysources",
      name: "PrimarySources",
      component: PrimarySources,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/topiclist",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
