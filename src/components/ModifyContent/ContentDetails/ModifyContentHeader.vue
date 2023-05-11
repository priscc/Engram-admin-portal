<template>
  <div id="ModifyContentHeader">
    <!-- TITLE -->
    <v-container class="pb-10 ">
      <v-row no-gutters>
        <v-col lg="1" md="1" sm="12" xs="12">
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
        </v-col>
        <v-col>
          <div style="font-size: 36px">Modifying Topic Content</div>
          <div style="font-size: 24px">Topic: {{ title }}</div>
        </v-col>
      </v-row>

      <!-- TABS -->
      <v-row id="nav" class="py-6 rounded-lg" style="background-color: #273238">
        <v-col>
          <v-card
            class="d-flex row-flex"
            style="background-color: transparent;"
          >
            <router-link class="rounded-l-lg" to="/modifycontent/events" exact>
              Events
            </router-link>

            <router-link to="/modifycontent/trends" exact>
              Trends
            </router-link>

            <router-link to="/modifycontent/historicalpeople" exact>
              Historical People
            </router-link>

            <router-link to="/modifycontent/terminology" exact>
              Terminology
            </router-link>

            <router-link
              class="rounded-r-lg"
              to="/modifycontent/primarysources"
              exact
            >
              Primary Sources
            </router-link>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  methods: {
    ...mapActions("events", ["closeForm"]),
  },
  computed: {
    ...mapGetters("events", ["currentEvent", "currentEventId"]),
    ...mapFields("topics", {
      title: "currentTopic.title",
    }),
  },
};
</script>

<style lang="scss" scoped>
#nav {
  a {
    width: 300px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #ffffff;
    margin: auto;
    text-decoration: none;
    color: #ffffff;
    font-weight: lighter;
    text-align: center;
    background-color: #5b6368;
    border-radius: 0px;

    &.router-link-exact-active {
      background-color: #3891a6;
      border-radius: 0px;
    }
  }
}
</style>
