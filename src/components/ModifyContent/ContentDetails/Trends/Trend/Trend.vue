<template>
  <div class="d-flex pt-4 justify-center align-center">
    <v-card
      class="d-flex"
      width="580px"
      height="auto"
      outlined
      style="border: 1px solid #979797"
    >
      <div class="d-flex flex-column" style="position: absolute; right: 0px">
        <div>
          <!-- Modal when editing a term -->
          <v-dialog v-model="saveDialog" persistent max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#3891A6"
                v-bind="attrs"
                v-on="on"
                @click="editTrend(topicTrend)"
                icon
                small
              >
                <v-icon>
                  create
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline d-flex justify-center">
                <div class="mt-4">Editing a term</div>
                <div>{{type}}</div>
                <div></div>
              </v-card-title>
              <v-row class="d-flex justify-center pt-10 px-15">
                <v-col>
                  <v-combobox
                    class="pa-0"
                    v-model="type"
                    label="Theme"
                    :items="[
                      'Environment',
                      'Cultural',
                      'Government',
                      'Economic',
                      'Social',
                      'Technology',
                    ]"
                    dense
                    outlined
                    clearable
                  ></v-combobox>
                  <v-textarea
                    v-model="trend"
                    outlined
                    name="input-7-4"
                    label="Trend:"
                    height="7vw"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelHandler"> Cancel </v-btn>

                <!-- Final confirmation on saving edited term -->
                <v-btn color="#3891A6" text @click="submitTrendHandler">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Modal when deleting a term -->
          <v-dialog v-model="delDialog" persistent max-width="250">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#3891A6" v-bind="attrs" v-on="on" icon small>
                <v-icon>
                  disabled_by_default
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                <div>Are you sure you want to delete this trend?</div>
              </v-card-title>
              <v-card-text
                >Once this trend is deleted you can never retrieve it</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="delDialog = false"> Cancel </v-btn>

                <!-- Final confirmation on deleting term -->
                <v-btn
                  color="red darken-1"
                  text
                  @click="deleteTrendHandler(topicTrend)"
                >
                  Yes, delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="d-flex flex-column pt-6 pl-4 pr-2">
        <div class="text-left text-h6 font-weight-medium text-decoration-underline">
          {{ topicTrend.type }}
        </div>
        <div class="text-left subtitle-1 py-2" style="line-height: 20px">
          {{ topicTrend.trend }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
// import firebase from "firebase";

export default {
  data() {
    return {
      delDialog: false,
      saveDialog: false,
    };
  },
  name: "Trend",
  props: ["topicTrend"],
  computed: {
    ...mapFields("trends", ["currentTrend.type", "currentTrend.trend"]),
  },
  methods: {
    ...mapActions("trends", [
      "editTrend",
      "deleteTrend",
      "submitEditTrend",
      "clearFields",
      "clearTrendId",
    ]),
    async submitTrendHandler() {
      setTimeout(async () => {
            await this.submitEditTrend();
          }, 2000);
      this.saveDialog = false;
      console.log("Submitted Edit");
    },
    deleteTrendHandler(topicTrend) {
      this.deleteTrend(topicTrend);
      this.delDialog = false;
      console.log("Deleted" + topicTrend.trend);
    },
    cancelHandler() {
      this.clearFields();
      this.clearTrendId();
      this.saveDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
