<template>
  <div class="d-flex pt-4 justify-center align-center">
    <v-card
      class="d-flex"
      width="580px"
      height="139px"
      outlined
      style="border: 1px solid #979797"
    >
      <v-card
        class="d-flex"
        width="250px"
        height="139px"
        outlined
        style="border: 1px solid #979797;margin: -1px 0px 0px -1px"
        color="#D8D8D8"
      >
        <!-- <div
          class="d-flex align-center pl-5"
          style="text-align: left; font-size: 24px"
        >
          Preview of Artifact
        </div> -->
        <v-img
          v-if="work.thumbURL"
          :src="work.thumbURL"
          width="198px"
          height="137px"
        ></v-img>
      </v-card>
      <div class="d-flex flex-column" style="position: absolute; right: 0px">
        <div id="cardbtn1">
          <!-- Modal when editing an artifact -->
          <v-dialog v-model="saveDialog" persistent max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <span class="material-icons">
                <v-icon
                  class="d-flex"
                  size="30"
                  color="#3891A6"
                  style="cursor: pointer"
                  @click="editWork(work)"
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
                  Editing an Artifact
                </div>
              </v-card-title>
              <div class="d-flex flex-column mx-auto" style="width: 400px">
                <v-col class="pt-10" cols="15">
                  <v-text-field
                    label="Artifact:"
                    background-color="grey lighten-2"
                    v-model="title"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col class="mt-n7" cols="15">
                  <v-textarea
                    v-model="caption"
                    outlined
                    name="input-7-4"
                    label="Caption:"
                    background-color="grey lighten-2"
                    height="7vw"
                  ></v-textarea>
                </v-col>
                <div class="d-flex pl-3 mt-n4 ">
                  <v-card
                    class="d-block"
                    height="80px"
                    width="10vw"
                    color="grey lighten-2"
                  >
                    <v-img
                      v-if="url"
                      :src="url"
                      height="80px"
                      width="10vw"
                    ></v-img>
                  </v-card>

                  <div style="width: 17vw">
                    <input
                      class="pl-4"
                      ref="input1"
                      type="file"
                      @change="previewImage"
                    />
                  </div>
                </div>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelHandler">
                  Cancel
                </v-btn>

                <!-- Final confirmation on saving edited artifact -->
                <v-btn color="#3891A6" text @click="submitEditWorkHandler()">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Modal  -->

          <!-- Modal when deleting a term -->
          <v-dialog v-model="delDialog" persistent max-width="260">
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
                  Are you sure you want to delete this artifact?
                </div>
              </v-card-title>
              <v-card-text
                >Once the artifact is deleted you can never retrieve
                it</v-card-text
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
                  @click="deleteWorkHandler(work)"
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
          Historical Figure {{ work.title }}
        </div>
        <div class="d-flex" style="font-size: 18px; text-align: left">
          {{ work.caption }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";

export default {
  data: () => {
    return {
      saveDialog: false,
      delDialog: false,
      url: null,
      imageData: null,
    };
  },
  name: "Artifact",
  props: ["work"],
  computed: {
    ...mapFields("works", [
      "currentWork.title",
      "currentWork.caption",
      "currentWork.thumbFile",
      "currentWork.thumbURL",
    ]),
    ...mapGetters("works", ["currentWork"]),
  },
  methods: {
    ...mapActions("works", [
      "editWork",
      "submitEditWork",
      "fetchWorks",
      "clearWorkId",
      "clearWorkFields",
      "deleteWork",
    ]),
    mountPreview() {
      this.url = this.currentWork.thumbURL;
    },
    previewImage(e) {
      this.uploadValue = 0;
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > 2) {
        e.preventDefault();
        alert("File is over 2mb");
      } else {
        this.url = URL.createObjectURL(file);
        this.imageData = e.target.files[0];
        this.thumbFile = file.name;
        console.log(this.thumbFile);
        console.log(this.imageData);
      }
    },
    async onUpload() {
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("step2");
        },
        (error) => {
          console.log(error.message);
        },
        async () => {
          this.uploadValue = 100;
          await storageRef.snapshot.ref.getDownloadURL().then((url) => {
            // this.img1 = url;
            // console.log(this.img1);
            this.thumbURL = url;
          });
        }
      );
    },
    async submitEditWorkHandler() {
      if (this.imageData) {
        console.log("with image");
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.submitEditWork();
            this.saveDialog = false;
          }, 2000);
        });
      } else {
        console.log("without image");
        this.thumbFile = "placeHolderImg.png";
        this.thumbURL =
          "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
        setTimeout(async () => {
          await this.submitEditWork();
          this.saveDialog = false;
        }, 2000);
      }
    },
    //     submitEditWorktHandler() {
    //       this.submitEditWork();
    //       this.saveDialog = false;
    //       console.log("Submitted Edit");
    //     },
    cancelHandler() {
      this.clearWorkFields();
      this.clearWorkId();
      this.saveDialog = false;
    },
    deleteWorkHandler(work) {
      this.deleteWork(work);
      this.delDialog = false;
      console.log("Deleted");
    },
  },
  created() {
    this.mountPreview();
  },
};
</script>

<style lang="scss" scoped></style>
