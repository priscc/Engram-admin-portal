<template>
  <div id="HistPeopelHeader">
    <v-container class="mb-6" style="background-color: #273238" id="nav">
      <v-row>
        <v-col class="d-flex pb-0 justify-end">
          <v-icon
            large
            rounded
            color="#3891A6"
            @click="closeForm('HistoricalPeople', '/historicalpeople')"
          >
            mdi-close-box
          </v-icon>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col class="d-flex justify-start">
          <router-link to="/modifycontent/historicalpeople/general" exact
            >General</router-link
          >
          <router-link to="/modifycontent/historicalpeople/text" exact>
            Text
          </router-link>
          <router-link to="/modifycontent/historicalpeople/resources" exact>
            Resources
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("people", ["closeForm"]),
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
