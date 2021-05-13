<template>
  <v-app class="d-flex flex-column align-center">
    <div class="d-flex flex-column" style="width: 66vw;">
      <div class="d-flex flex-start">
        <span
          class="material-icons"
          style="cursor: pointer"
          @click="$router.push({ path: '/addcontent' })"
        >
          <v-icon size="65" color="#3891A6">
            navigate_before
          </v-icon>
        </span>
      </div>
      <div style="font-size: 36px">Modifying Topic Content</div>
      <div class="d-flex justify-center pt-4">
        <v-card
          class="d-flex align-center justify-center white--text"
          width="52vw"
          height="6vw"
          color="#273238"
        >
          <div class="white--text px-6" style="font-size: 22px">
            Modify and edit topic content of the event page, people page,
            terminology page, and primary resource page. Modify page content,
            images, and resources.
          </div>
        </v-card>
      </div>
    </div>
    <div v-for="topics in allTopics" :key="topics.id">
      <Period v-bind:period="topics[0].timePeriod" v-bind:topics="topics" />
    </div>
  </v-app>
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
