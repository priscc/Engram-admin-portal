<template>
  <div id="modifyContent">
    <v-container fluid>
      <navbar />
      <!-- ADDING CONTENT -->
      <v-row>
        <!-- ADD CONTENT BUTTON -->
        <v-col lg="8" md="8" sm="8" xs="12" class="d-flex justify-start">
          <v-btn
            class="white--text"
            width="400"
            color="#3891A6"
            elevation="2"
            @click="addEventForm"
            >+ Add an Event</v-btn
          >
        </v-col>
        <v-spacer></v-spacer>
        <!-- DROP DOWN MENU -->
        <v-col class="d-flex flex-row">
          <p class="pt-1 pr-2" style="font-size: 18px; width: 100px">
            Sort by:
          </p>
          <div>
            <v-select
              disabled
              v-model="selectedPeriod"
              :items="timePeriod"
              :menu-props="{ top: false, offsetY: false }"
              background-color="grey lighten-2"
              outlined
              dense
            >
            </v-select>
          </div>
        </v-col>
      </v-row>
      <!-- DISPLAYING EVENTS -->
      <div v-for="event in currentTopicEvents" :key="event.id">
        <Event v-bind:event="event" />
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Event from "./Event/Event.vue";
import navbar from "../ModifyContentHeader.vue";

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
      tab: 0,
    };
  },
  components: { Event, navbar },
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
