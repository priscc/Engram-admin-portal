<template>
  <div id="EventResources">
    <v-card class="mx-auto pb-6" width="62vw" height="auto">
      <navbar />
      <v-container fluid>
        <div class="d-flex justify-end mb-2">
          <v-btn
            class="white--text"
            width="140"
            color="#3891A6"
            elevation="2"
            @click="$router.push({ name: 'Events', path: '/events' })"
            >Save</v-btn
          >
        </div>
        <v-row>
          <v-col class="d-flex flex-column justify-start">
            <videos />
            <div class="pt-4"></div>
            <articles />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import videos from "./Resources/Videos.vue";
import articles from "./Resources/Articles";
import navbar from "./EventCardHeader.vue";
// import { mapActions } from 'vuex';
// import { createNamespacedHelpers } from 'vuex'

// const { mapActions } = createNamespacedHelpers('events')
export default {
  components: { videos, articles, navbar },
  // methods: {
  //   ...mapActions('events',['fetchEventVideos', 'fetchEventArticles'])
  // },
  // mounted() {
  //   this.fetchEventVideos()
  //   // this.fetchEventArticles()
  //   // this.$store.dispatch("events/fetchEventVideos");
  // },
};
</script>

<style lang="scss" scoped>
#preview {
  padding: 4px;
  text-align: left;
}
#cardbtn1 {
  display: flex;
  align-self: flex-end;
}
</style>
