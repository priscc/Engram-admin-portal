<template>
  <div>
    <div class="pt-4">
      <div
        class="d-flex justify-center align-center"
        style="width: 320px; height: 231px"
      >
        <v-card
          class="d-flex align-end white--text pb-1 pl-6"
          width="298px"
          height="194px"
          color="#F2F2F2"
        >
          <div class="black--text" style="font-size: 22px">
            {{ topic.title }}
          </div>
        </v-card>
        <v-col
          cols="12"
          md="6"
          style="position: absolute; z-index: 1; margin-top: -180px; margin-right: -290px"
        >
          <!-- <div
            class="pa-3 secondary rounded-circle d-inline-block"
            style="cursor: pointer"
            @click="$router.push({ name: 'General', path: '/general', params:{topic} })"
          > -->
          <div
            class="pa-3 secondary rounded-circle d-inline-block"
            style="cursor: pointer"
            @click="editTopicHandler(topic)"
          >
            <span class="material-icons">
              <v-icon size="30" color="#FFFFFF">
                create
              </v-icon>
            </span>
          </div>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Topic",
  props: ["topic"],
  computed: { ...mapGetters("topics", ["currentId"]) },
  methods: {
    ...mapActions("topics", ["editTopic"]),
    editTopicHandler(topic) {
      this.editTopic(topic);
      this.$router.push({ name: "General", path: "/general" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
