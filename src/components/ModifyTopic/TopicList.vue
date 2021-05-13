<template>
  <v-app class="d-flex flex-column align-center">
    <div class="d-flex flex-column" style="width: 66vw;">
      <div
        class="d-flex flex-start"
      >
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
      <div style="font-size: 36px">Modifying a Topic</div>
      <div class="d-flex justify-center pt-4">
        <v-card
          class="d-flex align-center justify-center white--text"
          width="52vw"
          min-height="50px"
          color="#273238"
        >
          <div class="white--text px-6" style="font-size: 22px">
            Modify and edit topic info, image, and resource of a Study Bites
            topic.
          </div>
        </v-card>
      </div>
    </div>
    <!-- <div v-for="period in topics" :key="period.id">
      <Period v-bind:period="period.period" v-bind:topic="period.topicList" />
    </div> -->
    <div v-for="topics in allTopics" :key="topics.id">
      <Period v-bind:period="topics[0].timePeriod" v-bind:topics="topics" />
    </div>
  </v-app>
</template>

<script>
import Period from "./Period/Period.vue";
// import { mapGetters, mapActions } from "vuex";
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('topics')
// import { db } from '../../firebase/db'

export default {
  components: { Period },
  methods: {
    ...mapActions(['fetchTopics']),

  },
  computed:{ ...mapGetters(['allTopics'])},
  created() {
    this.fetchTopics();
  },
  
};
</script>

<style lang="scss" scoped></style>
