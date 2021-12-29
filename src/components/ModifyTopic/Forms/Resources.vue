<template>
  <v-card class="mx-auto mt-4 mb-12" width="70vw" min-height="570px">
    <v-card class="mx-auto" width="70vw" color="#273238">
      <div class="d-flex">
        <v-container class="pt-8 pl-12 d-flex">
          <div id="nav">
            <router-link class="col" to="/addcontent/topiclist/general" exact
              >General</router-link
            >
            <router-link class="col" to="/addcontent/topiclist/text" exact
              >Text</router-link
            >
            <router-link class="col" to="/addcontent/topiclist/resources" exact
              >Resources</router-link
            >
          </div>
        </v-container>
        <div class="d-flex justify-end">
          <span class="material-icons">
            <v-icon
              size="40"
              color="#3891A6"
              @click="$router.push({ name: 'TopicList', path: '/topiclist' })"
            >
              disabled_by_default
            </v-icon>
          </span>
        </div>
      </div>
    </v-card>
    <div class="d-flex flex-row ">
      <Videos />
      <Articles />
    </div>

    <div class="d-flex justify-end pt-4 pr-12">
      <v-btn
        class="white--text"
        width="140"
        color="#3891A6"
        elevation="2"
        @click="$router.push({ name: 'TopicList', path: '/topiclist' })"
        >Save</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import Videos from "./Resources/Videos.vue";
import Articles from "./Resources/Articles";
export default {
  components: { Videos, Articles },
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
