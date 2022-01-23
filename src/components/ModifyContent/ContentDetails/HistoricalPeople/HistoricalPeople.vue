<template>
  <div id="modifyContent">
    <v-container fluid>
      <navbar />
      <!-- ADDING CONTENT -->
      <v-row>
        <!-- ADDING CONTENT BUTTON -->
        <v-col lg="8" md="8" sm="8" xs="12" class="d-flex justify-start">
          <v-btn
            class="white--text"
            width="400"
            color="#3891A6"
            elevation="2"
            @click="addPersonForm"
          >
            + Add a Historical Figure
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <!-- DROP DOWN -->
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

      <!-- DISPLAYING HISTORICAL PEOPLE -->
      <div v-for="person in currentTopicPeople" :key="person.id">
        <HistoricalPerson v-bind:person="person" />
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import HistoricalPerson from "./HistoricalPerson/HistoricalPerson.vue";
import navbar from "../ModifyContentHeader.vue";

export default {
  data() {
    return {
      timePeriod: ["Name: Ascending", "Name: Descending"],
      selectedPeriod: "Name: Ascending",
      tab: 1,
    };
  },
  components: { HistoricalPerson, navbar },
  computed: {
    ...mapGetters("people", ["currentTopicPeople"]),
  },
  methods: {
    ...mapActions("people", ["fetchPeople", "addPersonForm", "clearPersonId"]),
  },
  created() {
    this.clearPersonId();
    this.fetchPeople();
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
