<template>
  <div id="modifyContent">
    <v-container fluid>
      <!-- TITLE -->
      <v-row>
        <v-col>
          <div class="d-flex flex-start">
            <v-btn
              fab
              text
              @click="
                $router.push({ name: 'ModifyContent', path: '/modifycontent' })
              "
            >
              <v-icon size="42" color="#3891A6">
                mdi-arrow-left-drop-circle
              </v-icon>
            </v-btn>
            <div style="font-size: 36px">Modifying Topic Content</div>
          </div>
        </v-col>
      </v-row>
      <!-- TABS -->
      <v-row>
        <v-col>
          <v-card id="nav" rounded class="py-6 px-3" color="#273238">
            <v-tabs v-model="tab" grow show-arrows>
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab style="background-color: #5b6368">
                <router-link to="/addcontent/modifycontent/events">
                  Events
                </router-link>
              </v-tab>

              <v-tab style="background-color: #5b6368">
                <router-link to="/addcontent/modifycontent/historicalpeople">
                  Historical People
                </router-link>
              </v-tab>

              <v-tab style="background-color: #3891a6">
                <router-link to="/addcontent/modifycontent/terminology">
                  Terminology
                </router-link>
              </v-tab>
              <v-tab style="background-color: #5b6368">
                <router-link to="/addcontent/modifycontent/primarysources">
                  Primary Sources
                </router-link>
              </v-tab>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
      <!-- ADDING CONTENT -->
      <v-row class="mx-4">
        <!-- SOURCE CONTENT -->
        <v-col lg="6" md="6" cols="12" class="pr-4">
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

        <v-col>
          <!-- IMG PREVIEW -->
          <div class="d-flex">
            <v-card
              class="d-block"
              height="80px"
              width="10vw"
              color="grey lighten-2"
            >
              <v-img v-if="url" :src="url" height="80px" width="10vw"></v-img>
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
          <!-- BUTTONS -->
          <div class="d-flex flex-row justify-end pt-8">
            <v-btn
              class="white--text"
              width="180"
              color="#3891A6"
              :disabled="!checkfield"
              elevation="2"
              @click="resetFields"
              >Reset</v-btn
            >
            <v-btn
              class="white--text ml-3"
              width="180"
              color="#3891A6"
              elevation="2"
              @click="handleSave"
              >{{ buttonLabel }}</v-btn
            >
          </div>
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
      <!-- DISPLAY TERMS -->
      <v-row>
        <v-col
          cols="6"
          v-for="topicTerm in currentTopicTerms"
          :key="topicTerm.id"
        >
          <Term class="mx-2 my-2" v-bind:topicTerm="topicTerm" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Term from "./Term/Term.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      button: "+ Add Term",
      sortBy: ["Term: Ascending", "Term: Descending"],
      selectedSort: "Term: Ascending",
      tab: 2,
      image: null,
      url: null,
      imageData: null,
    };
  },
  components: { Term },
  computed: {
    checkfield() {
      return this.term || this.def;
    },
    ...mapGetters("terminology", [
      "currentTopicTerms",
      "currentTerm",
      "currentTermId",
      "buttonLabel",
    ]),
    ...mapFields("terminology", [
      "currentTerm.term",
      "currentTerm.def",
      "currentTerm.thumbURL",
      "currentTerm.thumbFile",
    ]),
  },
  methods: {
    ...mapActions("terminology", [
      "fetchTerms",
      "clearTermId",
      "submitNewTerm",
      "clearFields",
      "submitEditTerm",
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
    async handleSave() {
      if (this.imageData) {
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.submitNewTerm();
          }, 2000);
        });
      } else {
        this.thumbFile = "placeHolderImg.png";
        this.thumbURL =
          "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
        setTimeout(async () => {
          await this.submitNewTerm();
        }, 2000);
      }
      this.url = null;
      document.getElementById("form").reset();
    },
    resetFields() {
      this.clearFields();
      this.clearTermId();
    },
  },
  created() {
    this.mountPreview();
    this.fetchTerms();
    this.clearTermId();
    this.clearFields();
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
