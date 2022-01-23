<template>
  <div id="EventText">
    <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
      <navbar />
      <v-container class="px-10">
        <!--  <v-row>
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
      </v-row> -->
        <v-row>
          <v-col>
            <div class="d-flex justify-start font-weight-bold">Intro:</div>
            <v-textarea
              v-model="descriptionMD"
              outlined
              name="input-7-4"
              label="Event intro summary"
              height="7vw"
            ></v-textarea>
            <div class="d-flex justify-start font-weight-bold">
              Main Content:
            </div>
            <v-textarea
              v-model="mainMD"
              outlined
              name="input-7-4"
              label="Main event content (has markdown): "
              height="15vw"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import navbar from "./EventCardHeader.vue";

export default {
  components: { navbar },
  computed: {
    ...mapFields("events", [
      "currentEvent.descriptionMD",
      "currentEvent.mainMD",
    ]),
  },
  methods: {
    ...mapActions("events", ["handleSave", "closeForm"]),
  },
};
</script>

<style></style>
