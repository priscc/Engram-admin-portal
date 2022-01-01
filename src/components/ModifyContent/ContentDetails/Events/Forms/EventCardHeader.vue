<template>
  <div id="EventHeader">
    <v-container class="mb-6" style="background-color: #273238" id="nav">
      <v-row>
        <v-col class="d-flex pb-0 justify-end">
          <v-icon
            large
            rounded
            color="#3891A6"
            @click="closeForm('Events', '/events')"
          >
            mdi-close-box
          </v-icon>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col class="d-flex justify-start" v-if="this.currentEventId">
          <router-link to="/addcontent/modifycontent/events/general" exact
            >General</router-link
          >
          <router-link to="/addcontent/modifycontent/events/map" exact
            >Map</router-link
          >
          <router-link to="/addcontent/modifycontent/events/text" exact
            >Text</router-link
          >
          <router-link to="/addcontent/modifycontent/events/resources" exact
            >Resources</router-link
          >
        </v-col>
        <v-col class="pt-0" v-else>
          <div class="d-flex justify-start white--text text-h6">
            Create a new event:
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("events", ["closeForm"]),
  },
  computed: {
    ...mapGetters("events", ["currentEvent", "currentEventId"]),
  },
};
</script>

<style lang="scss" scoped>
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
