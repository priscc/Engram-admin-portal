<template>
  <v-card
    class="d-flex"
    width="350px"
    height="160px"
    outlined
    style="border: 1px solid #979797"
  >
    <div class="d-flex flex-column" style="position: absolute; right: 0px">
      <div id="cardbtn1">
        <!-- Modal when editing a term -->
        <v-dialog v-model="saveDialog" persistent max-width="500">
          <template v-slot:activator="{ on, attrs }">
            <span class="material-icons">
              <v-icon
                class="d-flex"
                size="30"
                color="#3891A6"
                style="cursor: pointer"
                @click="editTerm(topicTerm)"
                v-bind="attrs"
                v-on="on"
              >
                create
              </v-icon>
            </span>
          </template>
          <v-card>
            <v-card-title class="headline d-flex justify-center">
              <div class="mt-4">
                Editing a term
              </div>
            </v-card-title>
            <div class="d-flex flex-column mx-auto" style="width: 400px">
              <v-col class="pt-10" cols="15">
                <v-text-field
                  label="Term:"
                  background-color="grey lighten-2"
                  v-model="term"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="mt-n7" cols="15">
                <v-textarea
                  v-model="def"
                  outlined
                  name="input-7-4"
                  label="Definition:"
                  background-color="grey lighten-2"
                  height="7vw"
                ></v-textarea>
              </v-col>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancelHandler">
                Cancel
              </v-btn>

              <!-- Final confirmation on saving edited term -->
              <v-btn color="#3891A6" text @click="submitTermHandler">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Modal  -->

        <!-- Modal when deleting a term -->
        <v-dialog v-model="delDialog" persistent max-width="250">
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
                Are you sure you want to delete this term?
              </div>
            </v-card-title>
            <v-card-text
              >Once the term is deleted you can never retrieve it</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="delDialog = false">
                Cancel
              </v-btn>

              <!-- Final confirmation on deleting term -->
              <v-btn
                color="red darken-1"
                text
                @click="deleteTermHandler(topicTerm)"
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
        {{ topicTerm.term }}
      </div>
      <div style="font-size: 18px; text-align: left">
        {{ topicTerm.def }}
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      delDialog: false,
      saveDialog: false,
    };
  },
  name: "Term",
  props: ["topicTerm"],
  computed: {
    // ...mapGetters("terminology", ["currentTerm"]),
    ...mapFields("terminology", ["currentTerm.term", "currentTerm.def"]),
  },
  methods: {
    ...mapActions("terminology", [
      "editTerm",
      "deleteTerm",
      "fetchTerms",
      "submitEditTerm",
      "clearFields",
      "clearTermId",
    ]),
    submitTermHandler() {
      this.submitEditTerm();
      this.saveDialog = false;
      console.log("Submitted Edit");
    },
    deleteTermHandler(topicTerm) {
      this.deleteTerm(topicTerm);
      this.delDialog = false;
      console.log("Deleted" + topicTerm.term);
    },
    cancelHandler() {
      this.clearFields();
      this.clearTermId();
      this.saveDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
