<template>
  <v-app class="d-flex flex-column align-center">
    <div class="d-flex flex-column" style="width: 66vw;">
      <div class="d-flex flex-start">
        <span
          class="material-icons"
          style="cursor: pointer"
          @click="
            $router.push({ name: 'ModifyContent', path: '/modifycontent' })
          "
        >
          <v-icon size="65" color="#3891A6">
            navigate_before
          </v-icon>
        </span>
      </div>
    </div>
    <div style="font-size: 36px">Modifying Topic Content</div>
    <v-card class="mx-auto" width="52vw" height="5vw" color="#273238">
      <div class="d-flex">
        <v-container class="d-flex justify-center pt-6">
          <div id="nav">
            <router-link class="col" to="/addcontent/modifycontent/events" exact
              >Events</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/historicalpeople"
              exact
              >Historical People</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/terminology"
              exact
              >Terminology</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/primarysources"
              exact
              >Primary Sources</router-link
            >
          </div>
        </v-container>
      </div>
    </v-card>
    <div class="d-flex justify-center pt-6">
      <v-btn
        class="white--text"
        width="400"
        color="#3891A6"
        elevation="2"
        @click="addEventForm"
        >+ Add an Event</v-btn
      >
    </div>
    <div class="d-flex justify-center pt-6">
      <div class="pt-1 pr-2" style="font-size: 18px">Sort by:</div>
      <div style="width: 16vw">
        <v-select
          v-model="selectedPeriod"
          :items="timePeriod"
          :menu-props="{ top: false, offsetY: false }"
          background-color="grey lighten-2"
          outlined
          dense
        >
        </v-select>
      </div>
    </div>
    <div v-for="event in currentTopicEvents" :key="event.id">
      <Event v-bind:event="event" />
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Event from "./Event/Event.vue";

export default {
  data() {
    return {
      timePeriod: [
        "Events: Ascending",
        "Events: Descending",
        "Title: Ascending",
        "Title: Descending",
      ],
      selectedPeriod: "Events: Ascending",
    };
  },
  components: { Event },
  computed: { ...mapGetters("events", ["currentTopicEvents"]) },
  methods: {
    ...mapActions("events", [
      "clearEventId",
      "addEventForm",
      "fetchEventsList",
      "bindEvents",
    ]),
    ...mapActions("topics", ["bindTopics"]),
    test() {
      console.log(this.currentTopicEvents);
    },
  },
  created() {
    this.clearEventId();
    this.test();
    this.fetchEventsList();
  },
};
</script>

<style lang="scss" scoped>
#imageThumbnail {
  width: 15vw;
  height: 10vw;
  background-color: #5b6368;
}
#nav {
  a {
    padding: 4px 24px;
    text-decoration: none;
    color: #ffffff;
    font-weight: lighter;
    background-color: #5b6368;

    &.router-link-exact-active {
      background-color: #3891a6;
    }
  }
}
</style>
