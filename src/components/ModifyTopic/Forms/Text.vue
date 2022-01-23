<template>
  <div id="TopicText">
    <v-card class="mx-auto mt-4 pb-6" width="70vw" height="auto">
      <navbar />
      <v-container class="px-10">
        <v-row>
          <v-col>
            <div class="d-flex justify-start font-weight-bold">Intro:</div>
            <v-textarea
              v-model="introMD"
              outlined
              name="input-7-4"
              label="Main event content (has markdown):"
              height="15vw"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import navbar from "./TopicIntroHeader.vue";

export default {
  components: { navbar },
  data: () => ({
    topicMD: "",
  }),
  computed: {
    ...mapGetters("topics", ["currentTopic"]),
    ...mapFields("topics", ["currentTopic.introMD"]),
  },
  methods: {
    ...mapActions("topics", ["submitEditTopic"]),
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
