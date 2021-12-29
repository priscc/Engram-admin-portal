<template>
  <!-- <v-app> -->
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
            <div style="font-size: 36px">Modifying a Topic</div>
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
            Modify and edit topic info, image, and resource of a Study Bites
            topic.
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div v-for="topics in allTopics" :key="topics.id">
      <Period v-bind:period="topics[0].timePeriod" v-bind:topics="topics" />
    </div>
  </div>
  <!-- </v-app> -->
</template>

<script>
import Period from "./Period/Period.vue";
// import { mapGetters, mapActions } from "vuex";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("topics");
// import { db } from '../../firebase/db'

export default {
  components: { Period },
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
