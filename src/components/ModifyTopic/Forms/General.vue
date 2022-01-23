<template>
  <v-form>
    <v-card class="mx-auto mt-4 pb-6" width="70vw" height="auto">
      <navbar />

      <v-container class="px-10">
        <v-row>
          <v-col class="d-flex align-center  justify-end">
            <div class="d-flex" style="width:110px">
              Topic: {{ topicToggle }}
            </div>
            <v-switch v-model="switch1" inset @click="switchToggle"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-row">
            <v-card
              class="d-block"
              width="9vw"
              height="80px"
              color="grey lighten-2"
            >
              <v-img v-if="urlTopic" :src="urlTopic" height="100%"></v-img>
            </v-card>

            <div class="d-flex flex-column justify-end pl-4">
              <label for="topic">Upload TOPIC thumbnail</label>
              <input
                name="topic"
                type="file"
                @change="previewImage($event, topicType)"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="title" label="Title" outlined dense required>
            </v-text-field>
          </v-col>
        </v-row>
        <div class=" d-flex justify-start font-weight-bold mt-6 mb-2">
          Intro:
        </div>
        <v-row class="ma-0">
          <v-col cols="8">
            <v-textarea
              v-model="introMD"
              outlined
              name="input-7-4"
              label="Main event content (has markdown):"
            ></v-textarea>
          </v-col>
          <v-col cols="4">
            <v-card
              class="d-block"
              width="9vw"
              height="80px"
              color="grey lighten-2"
            >
              <v-img :src="urlIntro" height="100%"></v-img>
            </v-card>

            <div class="d-flex flex-column justify-end pt-4">
              <label for="map">Upload INTRO thumbnail</label>
              <input
                name="intro"
                type="file"
                @change="previewImage($event, introType)"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="6" md="6" sm="12" xs="12" class="d-flex justify-start">
            <v-select
              v-model="timePeriod"
              :items="timePeriodChoices"
              :menu-props="{ top: true, offsetY: true }"
              label="Time Period"
              outlined
              dense
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-10">
            <v-btn
              class="white--text"
              width="140"
              color="#3891A6"
              elevation="2"
              block
              @click="handleSaveEdit"
              >Save Topic
              <v-icon small class="pl-2">mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";
import navbar from "./TopicIntroHeader.vue";

export default {
  components: { navbar },
  data: () => ({
    image: null,
    timePeriodChoices: [1, 2, 3, 4],
    disabled: 1,
    urlTopic: null,
    urlIntro: null,
    switch1: true,
    topicToggle: "Enabled",
    introType: "intro",
    topicType: "topic",
    introImgData: null,
    topicImgData: null,
    imgDataArr: [],
  }),
  props: ["topic"],
  computed: {
    // selectsPeriod() {
    //   return this.selectedPeriod.length > 0;
    // },
    // icon() {
    //   if (this.selectsPeriod) return "mdi-minus-box";
    //   return "mdi-checkbox-blank-outline";
    // },
    // checkfield() {
    //   return this.title || this.image || this.selectedPeriod;
    // },
    ...mapGetters("topics", ["currentTopic", "currentId"]),
    ...mapFields("topics", [
      "currentTopic.title",
      "currentTopic.intro_thumbFile",
      "currentTopic.intro_thumbURL",
      "currentTopic.topic_thumbFile",
      "currentTopic.topic_thumbURL",
      "currentTopic.introMD",
      // 'currentTopic.disabled',
      "currentTopic.timePeriod",
      "currentTopic.searchArray",
    ]),
  },
  methods: {
    ...mapActions("topics", ["submitEditTopic"]),
    mountPreview() {
      this.urlIntro = this.intro_thumbURL;
      this.urlTopic = this.topic_thumbURL;
    },
    previewImage(e, type) {
      let file = e.target.files[0];
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > 2) {
        e.preventDefault();
        alert("File is over 2mb");
      } else {
        if (type === "intro") {
          this.urlIntro = URL.createObjectURL(file);
          this.introImgData = e.target.files[0];
          let intro = { type: "intro", data: this.introImgData };
          this.imgDataArr.push(intro);
          this.intro_thumbFile = file.name;
        } else if (type === "topic") {
          this.urlTopic = URL.createObjectURL(file);
          this.topicImgData = e.target.files[0];
          let topic = { type: "topic", data: this.topicImgData };
          this.imgDataArr.push(topic);
          this.topic_thumbFile = file.name;
        } else {
          console.log("Error");
        }
      }

      console.log(this.imgDataArr);
    },
    async onUpload() {
      await Promise.all(
        this.imgDataArr.map((image) => {
          const storageRef = firebase
            .storage()
            .ref(`${image.data.name}`)
            .put(image.data);
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
                //   this.intro_thumbURL = url;
                if (image.type === "intro") {
                  console.log(url, image.type);
                  this.intro_thumbURL = url;
                } else if (image.type === "topic") {
                  console.log(url, image.type);
                  this.topic_thumbURL = url;
                }
                //   console.log(data.name, data, url);
                console.log(this.intro_thumbURL);
                console.log(this.topic_thumbURL);
              });
            }
          );
        })
      ).then(() => {
        return true;
      });
    },
    async handleSaveEdit() {
      console.log("save topic");
      // if (this.intro_thumbURL === "") {
      //   //   alert("Please provide images");
      //   // this.intro_thumbFile = "placeHolderImg.png";
      //   // this.intro_thumbURL =
      //   //   "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
      //   await this.onUpload();
      //   setTimeout(async () => {
      //     await this.submitEditTopic();
      //   }, 2000);
      // } else if (this.topic_thumbURL === "") {
      //   // this.topic_thumbFile = "placeHolderImg.png";
      //   // this.topic_thumbURL =
      //   //   "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
      //   await this.onUpload();
      //   setTimeout(async () => {
      //     await this.submitEditTopic();
      //   }, 2000);
      // } else if (this.topicImgData || this.introImgData) {
      //   await this.onUpload();
      //   setTimeout(async () => {
      //     await this.submitEditTopic();
      //   }, 2000);
      // }

      if (this.topicImgData || this.introImgData) {
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.submitEditTopic();
          }, 2000);
        });
      } else {
        setTimeout(async () => {
          await this.submitEditTopic();
        }, 2000);
      }
    },
    resetbtn(e) {
      if (this.checkfield) {
        this.disabled = 0;
      }
      e.preventDefault();
    },
    switchToggle(e) {
      if (this.switch1) {
        this.topicToggle = "Enabled";
      } else {
        this.topicToggle = "Disabled";
      }
      e.preventDefault();
    },
  },
  created() {
    this.mountPreview();
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
