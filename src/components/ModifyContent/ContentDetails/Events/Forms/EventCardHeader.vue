<template>
  <div id="EventHeader">
    <v-container class="mb-6" fluid style="background-color: #273238" id="nav">
      <v-row>
        <v-col class="pb-0 d-flex justify-end">
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
      <v-row class="ma-0">
        <v-col>
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("events", ["closeForm"]),
  },
};
</script>

<style lang="scss" scope>
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
