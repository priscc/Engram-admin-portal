<template>
  <div id="modifyContent">
    <v-container>
      <Header
        v-bind:header="'Topic Intro'"
        v-bind:description="'Edit topic thumbnail and intro text'"
        v-bind:links="[]"
      />

      <v-row>
        <v-col>
          <div v-for="topics in allTopics" :key="topics.id">
            <Period
              v-bind:period="topics[0].timePeriod"
              v-bind:topics="topics"
            />
          </div>
        </v-col>
        <!-- <v-col> <Form /></v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("topics");
// import { db } from '../../firebase/db'
import Header from "../DashboardHeaders.vue";
import Period from "./Period/Period.vue";
// import Form from "./ModifyTopic.vue";

export default {
  components: { Period, Header },
  methods: {
    ...mapActions(["fetchTopics"]),
  },
  computed: { ...mapGetters(["allTopics"]) },
  created() {
    this.fetchTopics();
  },
};
</script>

<style lang="scss" scoped></style>
