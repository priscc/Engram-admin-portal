<template>
  <div id="modifyContent">
    <v-container fluid>
      <navbar />
      <!-- ADDING CONTENT -->
      <v-row class="mx-4">
        <!-- SOURCE CONTENT -->
        <v-col lg="6" md="6" cols="12">
          <v-combobox
            class="pa-0"
            v-model="type"
            label="Theme"
            :items="[
              'environment',
              'cultural',
              'government',
              'economic',
              'social',
              'technology',
            ]"
            dense
            outlined
            clearable
          ></v-combobox>
          <v-textarea
            v-model="trend"
            outlined
            name="input-7-4"
            label="Trend:"
          ></v-textarea>
        </v-col>

        <v-col>
          <v-row class="pt-14">
            <v-col class="d-flex justify-end pr-0">
              <v-btn
                class="white--text"
                width="180"
                color="#3891A6"
                :disabled="!checkfield"
                elevation="2"
                @click="resetFields"
                >Reset</v-btn
              >
            </v-col>
            <v-col lg="5" md="5" sm="5" xs="12" class="d-flex justify-end">
              <v-btn
                class="white--text ml-3"
                width="180"
                color="#3891A6"
                elevation="2"
                @click="handleSave"
              >
                {{ buttonLabel }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- DISPLAY TERMS -->
      <v-row class="d-flex column-flex justify-center">

        <div v-for="topicTrend in currentTopicTrends" :key="topicTrend.id">
          <Trend class="mx-2 my-2" v-bind:topicTrend="topicTrend" />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Trend from "./Trend/Trend.vue";
import navbar from "../ModifyContentHeader.vue";

export default {
  data() {
    return {
      button: "+ Add Trend",
    };
  },
  name: "Trends",
  components: {
    Trend,
    navbar,
  },
  computed: {
    checkfield() {
      return this.type && this.trend;
    },
    ...mapGetters("trends", [
      "currentTopicTrends",
      "currentTrend",
      "currentTrendId",
      "buttonLabel",
    ]),
    ...mapFields("trends", [
      "currentTrend.type",
      "currentTrend.trend",
    ]),
  },
  methods: {
    ...mapActions("trends", [
      "fetchTrends",
      "clearTrendId",
      "submitNewTrend",
      "clearFields",
    ]),
    async handleSave() {
      setTimeout(async () => {
          await this.submitNewTrend();
        }, 2000);
    },
    resetFields() {
      this.clearFields();
      this.clearTrendId();
    },
  },
  created() {
    this.fetchTrends();
    this.clearTrendId();
    this.clearFields();
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
