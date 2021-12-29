<template>
  <div id="modifyContent">
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="d-flex flex-start">
            <v-btn fab text @click="$router.push({ path: '/addcontent' })">
              <v-icon size="42" color="#3891A6">
                mdi-arrow-left-drop-circle
              </v-icon>
            </v-btn>
            <div style="font-size: 36px">Modifying Topic Content</div>
          </div>

          <div
            class="d-flex justify-center align-center pa-2 white--text font-italic"
            width="100%"
            style="
              background-color: #273238;
              font-size: 18px;
              border-radius: 4px;
            "
          >
            Modify and edit topic content of the event page, people page,
            terminology page, and primary resource page. Modify page content,
            images, and resources.
          </div>
        </v-col>
      </v-row>
      <div v-for="topics in allTopics" :key="topics.id">
        <Period v-bind:period="topics[0].timePeriod" v-bind:topics="topics" />
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Period from "./Period/Period.vue";

export default {
  computed: {
    ...mapGetters("topics", ["allTopics"]),
  },
  methods: {
    ...mapActions("topics", ["fetchTopics"]),
  },
  created() {
    this.fetchTopics();
  },

  components: { Period },
};
</script>

<style lang="scss" scoped></style>
