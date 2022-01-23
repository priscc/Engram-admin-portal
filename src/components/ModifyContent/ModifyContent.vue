<template>
  <div id="modifyContent">
    <v-container>
      <Header
        v-bind:header="'Topic Content'"
        v-bind:description="
          ' Edit Events, Hstorical Figures, Terminology, & Primary Sources'
        "
        v-bind:links="[]"
      />

      <div v-for="topics in allTopics" :key="topics.id">
        <Period v-bind:period="topics[0].timePeriod" v-bind:topics="topics" />
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Period from "./Period/Period.vue";
import Header from "@/components/DashboardHeaders.vue";

export default {
  components: { Period, Header },
  computed: {
    ...mapGetters("topics", ["allTopics"]),
  },
  methods: {
    ...mapActions("topics", ["fetchTopics"]),
  },
  created() {
    this.fetchTopics();
  },
};
</script>

<style lang="scss" scoped></style>
