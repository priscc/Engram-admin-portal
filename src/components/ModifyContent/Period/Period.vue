<template>
  <div id="modifyContent_Period">
    <v-row>
      <v-col>
        <v-row>
          <div class="d-flex flex-start pt-10" style="font-size: 24px">
            Time Period: {{ period }}
          </div>
        </v-row>
        <v-row style="padding-left: 30px">
          <v-col cols="4" v-for="topic in topics" :key="topic.id">
            <Topic v-bind:topic="topic" v-bind:topics="topics" />
          </v-col>
        </v-row>
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
