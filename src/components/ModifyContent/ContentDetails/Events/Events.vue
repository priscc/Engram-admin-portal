<template>
  <div id="modifyContent">
    <v-container fluid>
      <!-- TITLE -->
      <v-row>
        <v-col>
          <div class="d-flex flex-start">
            <v-btn
              fab
              text
              @click="
                $router.push({ name: 'ModifyContent', path: '/modifycontent' })
              "
            >
              <v-icon size="42" color="#3891A6">
                mdi-arrow-left-drop-circle
              </v-icon>
            </v-btn>
            <div style="font-size: 36px">Modifying Topic Content</div>
          </div>
        </v-col>
      </v-row>
      <!-- TABS -->
      <v-row>
        <v-col>
          <v-card id="nav" rounded class="py-6 px-3" color="#273238">
            <v-tabs v-model="tab" grow show-arrows>
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab style="background-color: #3891a6">
                <router-link to="/addcontent/modifycontent/events">
                  Events
                </router-link>
              </v-tab>

              <v-tab style="background-color: #5b6368">
                <router-link to="/addcontent/modifycontent/historicalpeople">
                  Historical People
                </router-link>
              </v-tab>

              <v-tab style="background-color: #5b6368">
                <router-link to="/addcontent/modifycontent/terminology">
                  Terminology
                </router-link>
              </v-tab>
              <v-tab style="background-color: #5b6368">
                <router-link to="/addcontent/modifycontent/primarysources">
                  Primary Sources
                </router-link>
              </v-tab>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
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
