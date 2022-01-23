<template>
  <div id="modifyContent">
    <v-container fluid>
      <navbar />
      <!-- ADDING CONTENT -->
      <v-row class="mx-4">
        <!-- SOURCE CONTENT -->
        <v-col lg="6" md="6" sm="12" xs="12">
          <v-text-field
            label="Artifact:"
            v-model="title"
            outlined
            dense
          ></v-text-field>
          <v-textarea
            v-model="caption"
            outlined
            name="input-7-4"
            label="Caption:"
          ></v-textarea>
        </v-col>

        <v-col lg="6" md="6" sm="12" xs="12">
          <v-row>
            <v-col>
              <!-- IMG PREVIEW -->
              <div class="d-flex">
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
            </v-col>
          </v-row>
          <v-row class="pt-14">
            <v-col class="d-flex justify-end pr-0">
              <v-btn
                class="white--text"
                width="180"
                color="#3891A6"
                :disabled="!checkfield"
                elevation="2"
                @click="clearWorkFields"
              >
                Reset
              </v-btn>
            </v-col>
            <v-col lg="5" md="5" sm="5" xs="12" class="d-flex justify-end">
              <v-btn
                class="white--text "
                width="180"
                color="#3891A6"
                elevation="2"
                @click="handleSaveWork"
              >
                + Add Primary Source
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- DROP DOWN -->
      <v-row class="d-flex justify-end pt-4">
        <div class="pt-1 pr-2" style="font-size: 18px">Sort by:</div>
        <div style="width: 15vw">
          <v-select
            v-model="selectedSort"
            :items="sortBy"
            :menu-props="{ top: false, offsetY: false }"
            background-color="grey lighten-2"
            outlined
            dense
            disabled
          >
          </v-select>
        </div>
      </v-row>
      <!-- DISPLAY SOURCES -->
      <v-row class="d-flex justify-center">
        <div v-for="work in currentTopicWorks" :key="work.id">
          <Artifact class="mx-2 my-2" v-bind:work="work" />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Artifact from "./Artifact/Artifact.vue";
import firebase from "firebase";
import navbar from "../ModifyContentHeader.vue";

export default {
  data() {
    return {
      term: null,
      def: null,
      sortBy: ["Term: Ascending", "Term: Descending"],
      selectedSort: "Term: Ascending",
      image: null,
      url: null,
      imageData: null,
      tab: 3,
    };
  },
  components: { Artifact, navbar },
  computed: {
    checkfield() {
      return this.title || this.caption;
    },
    ...mapGetters("works", ["currentTopicWorks"]),
    ...mapFields("works", [
      "currentWork.title",
      "currentWork.caption",
      "currentWork.thumbURL",
      "currentWork.thumbFile",
    ]),
  },
  methods: {
    ...mapActions("works", [
      "fetchWorks",
      "submitNewWork",
      "clearWorkId",
      "clearWorkFields",
    ]),
    mountPreview() {
      this.url = this.thumbURL;
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
    async handleSaveWork() {
      if (this.imageData) {
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.submitNewWork();
          }, 2000);
        });
      } else {
        this.thumbFile = "placeHolderImg.png";
        this.thumbURL =
          "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
        setTimeout(async () => {
          await this.submitNewWork();
        }, 2000);
      }
      this.url = null;
      document.getElementById("form").reset();
    },
  },
  created() {
    this.mountPreview();
    this.fetchWorks();
    this.clearWorkId();
    this.clearWorkFields();
  },
};
</script>

<style lang="scss" scoped>
#imageThumbnail {
  width: 15vw;
  height: 10vw;
  background-color: #5b6368;
}
#nav {
  a {
    padding: 4px 24px;
    text-decoration: none;
    color: #ffffff;
    font-weight: lighter;
    background-color: #5b6368;

    &.router-link-exact-active {
      background-color: #3891a6;
    }
  }
}
</style>
