<template>
  <div class="d-flex pt-4 justify-center align-center">
    <v-card
      class="d-flex"
      width="571px"
      height="auto"
      outlined
      style="border: 1px solid #979797"
    >
      <v-card
        width="198px"
        height="auto"
        outlined
        style="border: 1px solid #979797; margin: -1px 0px 0px -1px"
        color="#D8D8D8"
      >
        <v-img height="100%" :src="event.thumbURL"> </v-img>
      </v-card>
      <div class="d-flex flex-column" style="position: absolute; right: 0px">
        <div id="cardbtn1">
          <v-btn color="#3891A6" @click="editEventHandler(event)" icon small>
            <v-icon>
              create
            </v-icon>
          </v-btn>
          <!-- Modal when deleting an event -->
          <v-dialog v-model="dialog" persistent max-width="250">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#3891A6" v-bind="attrs" v-on="on" icon small>
                <v-icon>
                  disabled_by_default
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                <div>Are you sure you want to delete {{ event.title }}?</div>
              </v-card-title>
              <v-card-text
                >Once {{ event.title }} is deleted you can never retrieve
                it</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false"> Cancel </v-btn>

                <!-- Final confirmation on deleting event -->
                <v-btn
                  color="red darken-1"
                  text
                  @click="deleteEventHandler(event)"
                >
                  Yes, delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Modal  -->
        </div>
      </div>
      <div class="d-flex flex-column pt-6 pl-6 pr-2 mb-4">
        <div class="text-left" style="font-size: 24px">
          {{ event.title }}
        </div>
        <div v-if="event.endDate.date" class="d-flex" style="font-size: 18px">
          {{ event.startDate.date }} - {{ event.endDate.date }}
        </div>
        <div v-else class="d-flex" style="font-size: 18px">
          {{ event.startDate.date }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
    };
  },
  name: "Event",
  props: ["event"],
  methods: {
    ...mapActions("events", ["editEvent", "deleteEvent", "fetchEventsList"]),
    deleteEventHandler(event) {
      this.deleteEvent(event);
      this.dialog = false;
      console.log("Deleted " + event.title);
    },
    editEventHandler(event) {
      this.editEvent(event);
      setTimeout(
        () => this.$router.push({ name: "EventGeneral", path: "/general" }),
        200
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
