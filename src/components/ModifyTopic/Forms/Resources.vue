<template>
  <div id="TopicResources">
    <v-card class="mx-auto mt-4 pb-6" width="70vw" height="auto">
      <navbar />

      <v-container class="px-10">
        <v-row>
          <v-col lg="6" md="6" sm="12">
            <videos />
          </v-col>
          <v-col lg="6" md="6" sm="12">
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
import navbar from "./TopicIntroHeader.vue";
export default {
  components: { videos, articles, navbar },
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
