<template>
  <div id="modifyContent_Topic">
    <v-card class="mx-auto" flat rounded max-height="200">
      <v-fab-transition>
        <v-btn
          fab
          top
          right
          small
          absolute
          color="#3891A6"
          @click="editTopicHandler(topic)"
        >
          <v-icon color="white"> mdi-lead-pencil</v-icon>
        </v-btn>
      </v-fab-transition>

      <v-img
        :src="topic.topic_thumbURL"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title class="font-weight-medium white--text">
          {{ topic.title }}
        </v-card-title>
      </v-img>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Topic",
  props: ["topic"],
  methods: {
    ...mapActions("topics", ["editTopic"]),
    editTopicHandler(topic) {
      this.editTopic(topic);
      this.$router.push({ name: "Events", path: "/events" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
