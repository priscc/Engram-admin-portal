<template>
  <div id="modifyTopic_Period">
    <div
      class="pt-10 text-h6 font-weight-medium blue-grey--text text--darken-2"
    >
      Time Period: {{ period }}
    </div>

    <v-row>
      <v-col cols="4" v-for="topic in topics" :key="topic.id">
        <Topic v-bind:topic="topic" v-bind:topics="topics" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Topic from "./Topic/Topic.vue";
export default {
  name: "Period",
  components: { Topic },
  props: ["period", "topics"],
};
</script>

<style lang="scss" scoped></style>
