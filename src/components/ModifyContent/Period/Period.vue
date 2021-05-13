<template>
  <div>
    <div class="d-flex flex-start pt-10" style="font-size: 24px">
      Time Period: {{ period }}
    </div>
    <div class="d-flex flex-wrap" style="width: 70vw">
      <div class="px-2" v-for="topic in topics" :key="topic.id">
        <Topic v-bind:topic="topic" v-bind:topics="topics" />
      </div>
    </div>
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
