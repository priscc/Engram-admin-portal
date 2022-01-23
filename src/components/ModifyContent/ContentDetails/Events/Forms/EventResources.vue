<template>
  <div id="EventResources">
    <v-card class="mx-auto pb-6" width="62vw" height="auto">
      <navbar />
      <!--  <v-container class="px-10">
        <v-row>
          <v-col class="d-flex justify-end pb-6">
            <v-btn
              class="white--text"
              width="140"
              color="#3891A6"
              elevation="2"
              @click="handleSave"
              >Save Event</v-btn
            >
          </v-col>
        </v-row>
      </v-container> -->
      <v-container>
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
import { mapActions } from "vuex";
import videos from "./Resources/Videos.vue";
import articles from "./Resources/Articles";
import navbar from "./EventCardHeader.vue";
export default {
  components: { videos, articles, navbar },
  methods: {
    ...mapActions("events", ["handleSave", "closeForm"]),
  },
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
