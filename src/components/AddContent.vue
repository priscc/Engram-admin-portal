<template>
  <v-app>
    <div id="addcontent">
      <v-container class="d-flex flex-row mt-4">
        <!-- <div class="d-flex flex-row"> -->

        <!-- ADD A TOPIC -->

        <v-card
          class="mx-auto"
          width="22vw"
          height="34vw"
          max-width="320"
          max-height="484"
        >
          <v-card
            class="mx-auto"
            min-height="150"
            min-width="120"
            width="22vw"
            height="19vw"
            max-width="320"
            max-height="280"
            color="#273238"
            @click="addTopicHandler"
          >
            <v-card-title
              class="white--text display-1 justify-center pt-16"
              style="font-family: Abel"
              >Add a topic</v-card-title
            >
            <span class="material-icons">
              <v-icon size="100" color="#3891A6">
                add_box
              </v-icon>
            </span>
          </v-card>
          <v-card-text class="text--primary text-darken">
            <div class="text-left font-weight-medium pa-6 headline">
              Creating a new topic for a specific time period
            </div>
          </v-card-text>
        </v-card>

        <!-- MODIFY A TOPIC -->
        <v-card
          class="mx-auto"
          width="22vw"
          height="34vw"
          max-width="320"
          max-height="484"
        >
          <v-card
            class="mx-auto"
            min-height="150"
            min-width="120"
            width="22vw"
            height="19vw"
            max-width="320"
            max-height="280"
            color="#273238"
            @click="$router.push({ name: 'TopicList', path: '/topiclist' })"
          >
            <v-card-title
              class="white--text block justify-center display-1 pt-16"
              >Modify a topic</v-card-title
            >
            <span class="material-icons">
              <v-icon size="100" color="#3891A6">
                create
              </v-icon>
            </span>
          </v-card>
          <v-card-text class="text--primary text-darken">
            <div class="text-left font-weight-medium pa-6 headline">
              Edit an existing topic from a specific time period
            </div>
          </v-card-text>
        </v-card>

        <!-- MODIFY A CONTENT -->

        <v-card
          class="mx-auto"
          width="22vw"
          height="34vw"
          max-width="320"
          max-height="484"
        >
          <v-card
            class="mx-auto"
            min-height="150"
            min-width="120"
            width="22vw"
            height="19vw"
            max-width="320"
            max-height="280"
            color="#273238"
            @click="modifyContent"
          >
            <v-card-title
              class="white--text block justify-center display-1 pt-16"
              >Modify content</v-card-title
            >
            <i
              class="fa fa-pencil-square-o pt-2"
              style="font-size: 100px; color:#3891A6;"
              aria-hidden="true"
            ></i>
          </v-card>
          <v-card-text class="text--primary text-darken">
            <div class="text-left font-weight-medium pa-6 headline">
              Edit or add content (events, people, terminology) to a selected
              topic.
            </div>
          </v-card-text>
        </v-card>
        <!-- </div> -->
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router/index";

export default {
  name: "AddContent",
  methods: {
    ...mapActions("topics", ["addTopicForm", "fetchTopics"]),
    addTopicHandler() {
      this.addTopicForm();
      this.$router.push({ name: "AddTopicForm", path: "/addtopicform" });
    },
    modifyContent() {
      router.push({ name: "ModifyContent", path: "/modifycontent" });
      this.fetchTopics();
    },
  },
};
</script>

<style lang="scss" scoped></style>
