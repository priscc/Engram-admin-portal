<template>
  <div class="d-flex pt-4 justify-center align-center">
    <v-card
      class="d-flex"
      width="571px"
      height="139px"
      outlined
      style="border: 1px solid #979797"
    >
      <v-card
        class="d-flex"
        width="198px"
        height="139px"
        outlined
        style="border: 1px solid #979797;margin: -1px 0px 0px -1px"
        color="#D8D8D8"
        >
        <!-- <div
          class="d-flex align-center pl-5"
          style="text-align: left; font-size: 24px"
        >
          Preview of Historical Figure
        </div> -->
        <v-img
          v-if="person.thumbURL"
          :src="person.thumbURL"
          width="198px"
          height="137px"
        ></v-img>
        </v-card
      >
      <div class="d-flex flex-column" style="position: absolute; right: 0px">
        <div id="cardbtn1">
          <span class="material-icons">
            <v-icon
              class="d-flex"
              size="30"
              color="#3891A6"
              style="cursor: pointer"
              @click="handleEdit(person)"
            >
              create
            </v-icon>
          </span>
          <!-- Modal when deleting a person -->
          <v-dialog v-model="dialog" persistent max-width="250">
            <template v-slot:activator="{ on, attrs }">
              <span class="material-icons">
                <v-icon
                  class="d-flex"
                  size="30"
                  color="#3891A6"
                  style="cursor: pointer"
                  v-bind="attrs"
                  v-on="on"
                >
                  disabled_by_default
                </v-icon>
              </span>
            </template>
            <v-card>
              <v-card-title class="headline">
                <div>
                  Are you sure you want to delete this person?
                </div>
              </v-card-title>
              <v-card-text
                >Once the person is deleted you can never retrieve
                it</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">
                  Cancel
                </v-btn>

                <!-- Final confirmation on deleting person -->
                <v-btn
                  color="red darken-1"
                  text
                  @click="deletePersonHandler(person)"
                >
                  Yes, delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Modal  -->
        </div>
      </div>
      <div class="d-flex flex-column justify-center pl-6">
        <div class="d-flex" style="font-size: 24px">
          {{ person.name }}
        </div>
        <div class="d-flex" style="font-size: 18px">
          {{ person.dateOfBirth.date }} - {{ person.dateOfPassing.date }}
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
  name: "HistoricalPerson",
  props: ["person"],
  methods: {
    ...mapActions("people", ["editPerson", "deletePerson", "fetchPeople"]),

    handleEdit(person) {
      this.editPerson(person);
      setTimeout(() =>
        this.$router.push({
          name: "HistPeopleGeneral",
          path: "/historicalpeople/general",
        })
      );
    },

    deletePersonHandler(person) {
      this.deletePerson(person);
      this.dialog = false;
      console.log("Deleted" + person.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
