<template>
  <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
    <navbar />
    <v-container>
      <v-row>
        <v-col>
          <div class="d-flex justify-start font-weight-bold">Intro:</div>
          <v-textarea
            v-model="descriptionMD"
            outlined
            name="input-7-4"
            label="Event intro summary"
            background-color="grey lighten-2"
            height="7vw"
          ></v-textarea>
          <div class="d-flex justify-start font-weight-bold">Main Content:</div>
          <v-textarea
            v-model="mainMD"
            outlined
            name="input-7-4"
            label="Main event content (has markdown): "
            background-color="grey lighten-2"
            height="15vw"
          ></v-textarea>
          <div class="d-flex justify-end pr-12">
            <v-btn
              class="white--text"
              width="140"
              color="#3891A6"
              elevation="2"
              @click="handleSave"
              >Save</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
