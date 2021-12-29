<template>
  <div id="MainMenu">
    <v-container fluid class="d-flex flex-row mt-4">
      <v-row>
        <!-- ADD A TOPIC -->
        <v-col>
          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              :elevation="hover ? 10 : 2"
              :class="{ 'on-hover': hover }"
              max-width="344"
              min-height="330"
              @click="addTopicHandler"
            >
              <v-card-title
                class="d-flex flex-column align-center justify-center py-6 mb-4"
                style="font-family: Abel; background-color: #273238"
              >
                <p class="white--text display-1">Add a topic</p>
                <v-icon size="70" color="#3891A6">
                  mdi-plus-box-outline
                </v-icon>
              </v-card-title>
              <v-card-text>
                <div class="text-left font-weight-medium headline">
                  Creating a new topic for a specific time period
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <!-- MODIFY A TOPIC -->
        <v-col>
          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              :elevation="hover ? 10 : 2"
              :class="{ 'on-hover': hover }"
              max-width="344"
              min-height="330"
              @click="$router.push({ name: 'TopicList', path: '/topiclist' })"
            >
              <v-card-title
                class="d-flex flex-column align-center justify-center py-6 mb-4"
                style="font-family: Abel; background-color: #273238"
              >
                <p class="white--text display-1">Edit topic info</p>
                <v-icon size="70" color="#3891A6"> mdi-lead-pencil </v-icon>
              </v-card-title>
              <v-card-text>
                <div class="text-left font-weight-medium headline">
                  Edit an existing topic from a specific time period
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <!-- MODIFY A CONTENT -->
        <v-col>
          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              :elevation="hover ? 10 : 2"
              :class="{ 'on-hover': hover }"
              max-width="344"
              min-height="330"
              @click="modifyContent"
            >
              <v-card-title
                class="d-flex flex-column align-center justify-center py-6 mb-4"
                style="font-family: Abel; background-color: #273238"
              >
                <p class="white--text display-1">
                  Edit topic <br />
                  components
                </p>
                <v-icon size="70" color="#3891A6">
                  mdi-pencil-box-outline
                </v-icon>
              </v-card-title>
              <v-card-text>
                <div class="text-left font-weight-medium headline">
                  Edit or add content (events, people, terminology) to a
                  selected topic.
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
