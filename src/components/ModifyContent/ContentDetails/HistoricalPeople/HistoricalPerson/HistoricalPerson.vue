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
        style="border: 1px solid #979797; margin: -1px 0px 0px -1px"
        color="#D8D8D8"
      >
        <v-img :src="person.thumbURL"> </v-img>
      </v-card>
      <div class="d-flex flex-column" style="position: absolute; right: 0px">
        <div>
          <v-btn color="#3891A6" @click="handleEdit(person)" icon small>
            <v-icon>
              create
            </v-icon>
          </v-btn>
          <!-- Modal when deleting a person -->
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
                <div>Are you sure you want to delete this person?</div>
              </v-card-title>
              <v-card-text
                >Once the person is deleted you can never retrieve
                it</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false"> Cancel </v-btn>

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
        </div>
      </div>
      <div class="d-flex flex-column pt-6 pl-6">
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
