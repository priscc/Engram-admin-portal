<template>
  <v-card
    class="d-flex"
    height="160px"
    outlined
    style="border: 1px solid #979797"
  >
    <v-card
      class="d-flex"
      width="198px"
      height="160px"
      outlined
      style="border: 1px solid #979797; margin: -1px 0px 0px -1px"
      color="#D8D8D8"
    >
      <v-img :src="topicTerm.thumbURL"> </v-img>
    </v-card>
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
                @click="
                  editTerm(topicTerm), (this.thumbURL = topicTerm.thumbURL)
                "
                v-bind="attrs"
                v-on="on"
              >
                create
              </v-icon>
            </span>
          </template>
          <v-card>
            <v-card-title class="headline d-flex justify-center">
              <div class="mt-4">Editing a term</div>
            </v-card-title>
            <v-row class="d-flex justify-center pt-10 px-15">
              <v-col>
                <v-text-field
                  label="Term:"
                  background-color="grey lighten-2"
                  v-model="term"
                  outlined
                  dense
                ></v-text-field>
                <v-textarea
                  v-model="def"
                  outlined
                  name="input-7-4"
                  label="Definition:"
                  background-color="grey lighten-2"
                  height="7vw"
                ></v-textarea>
              </v-col>
            </v-row>
            <!-- IMG PREVIEW -->
            <v-row class="d-flex justify-center px-15 pb-10">
              <div class="d-flex">
                <v-card
                  class="d-block"
                  height="80px"
                  width="10vw"
                  color="grey lighten-2"
                >
                  <v-img
                    v-if="thumbURL"
                    :src="thumbURL"
                    height="80px"
                    width="10vw"
                  ></v-img>
                </v-card>
                <div style="width: 17vw">
                  <form id="form">
                    <input
                      class="pl-4"
                      ref="input1"
                      type="file"
                      @change="previewImage"
                    />
                  </form>
                </div>
              </div>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancelHandler"> Cancel </v-btn>

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
              <div>Are you sure you want to delete this term?</div>
            </v-card-title>
            <v-card-text
              >Once the term is deleted you can never retrieve it</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="delDialog = false"> Cancel </v-btn>

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
      <div class="d-flex" style="font-size: 24px; text-align: left">
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
import firebase from "firebase";

export default {
  data() {
    return {
      delDialog: false,
      saveDialog: false,
      image: null,
      imageData: null,
    };
  },
  name: "Term",
  props: ["topicTerm"],
  computed: {
    ...mapFields("terminology", [
      "currentTerm.term",
      "currentTerm.def",
      "currentTerm.thumbURL",
      "currentTerm.thumbFile",
    ]),
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
    previewImage(e) {
      this.uploadValue = 0;
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > 2) {
        e.preventDefault();
        alert("File is over 2mb");
        this.thumbFile = "";
      } else {
        this.thumbURL = URL.createObjectURL(file);
        this.imageData = e.target.files[0];
        this.thumbFile = file.name;
      }
    },
    onUpload() {
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            // this.img1 = url;
            // console.log(this.img1);
            this.thumbURL = url;
            console.log(this.thumbURL);
          });
        }
      );
    },
    async submitTermHandler() {
      if (this.imageData) {
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.submitEditTerm();
          }, 2000);
        });
      } else {
        this.thumbFile = "placeHolderImg.png";
        this.thumbURL =
          "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
        setTimeout(async () => {
          await this.submitEditTerm();
        }, 2000);
      }
      this.saveDialog = false;
      this.url = null;
      document.getElementById("form").reset();
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
