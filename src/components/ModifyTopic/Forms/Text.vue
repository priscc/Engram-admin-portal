<template>
  <v-card class="mx-auto mt-4" width="70vw" min-height="400px" >
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
    <div class="mx-auto pt-6 d-flex justify-center">
      <v-col cols="12" md="11">
        <v-textarea
          v-model="introMD"
          outlined
          name="input-7-4"
          label="Main event content (has markdown):"
          background-color="grey lighten-2"
          height="15vw"
        ></v-textarea>
      </v-col>
    </div>
    <div class="d-flex justify-end pr-12">
      <v-btn
        class="white--text"
        width="140"
        color="#3891A6"
        elevation="2"
        @click="submitEditTopic"
        >Save</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
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
