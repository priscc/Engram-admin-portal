<template>
  <div id="addTopic">
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="d-flex flex-start">
            <v-btn fab text @click="$router.push({ path: '/addcontent' })">
              <v-icon size="42" color="#3891A6">
                mdi-arrow-left-drop-circle
              </v-icon>
            </v-btn>
            <div style="font-size: 36px">Adding a Topic</div>
          </div>

          <div
            class="d-flex justify-center align-center pa-2 white--text font-italic"
            width="100%"
            style="
              background-color: #273238;
              font-size: 18px;
              border-radius: 4px;
            "
          >
            Add a new topic to the Study Bites home page by filling in basic
            information.
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-col class="mx-auto pt-10" cols="10" sm="9" md="11">
            <v-text-field
              label="Topic title:"
              background-color="grey lighten-2"
              v-model="title"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col class="mx-auto mt-n3" cols="10" sm="9" md="11">
            <div class="d-flex flex-start mt-n4">
              <v-card
                class="d-block"
                width="10vw"
                height="5vw"
                color="grey lighten-2"
                outlined
              >
                <v-img v-if="url" :src="url" height="80px" width="10vw"></v-img>
              </v-card>

              <div style="width: 15vw; height: 5vw">
                <input
                  class="pl-4"
                  ref="input1"
                  type="file"
                  @change="previewImage"
                />
              </div>
            </div>
          </v-col>
          <v-col class="mx-auto pt-10" cols="10" sm="9" md="11">
            <div class="d-flex flex-start mt-n4" style="width: 22vw">
              <v-select
                v-model="timePeriod"
                :items="timePeriodChoices"
                label="Time Period"
                background-color="grey lighten-2"
                outlined
                dense
              >
              </v-select>
            </div>
          </v-col>
          <div class="d-flex justify-end pr-12">
            <v-btn
              class="white--text"
              width="140"
              color="#3891A6"
              :disabled="!checkfield"
              elevation="2"
              >Reset</v-btn
            >
          </div>
          <div class="d-flex justify-end pr-12 pt-4">
            <v-btn
              class="white--text"
              width="140"
              color="#3891A6"
              elevation="2"
              @click="handleSubmitNewTopic"
              >Save</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";

export default {
  data: () => ({
    image: null,
    timePeriodChoices: [1, 2, 3, 4],
    disabled: 1,
    url: null,
    caption: "",
    img1: "",
    imageData: null,
  }),
  computed: {
    selectsPeriod() {
      return this.selectedPeriod.length > 0;
    },
    icon() {
      if (this.selectsPeriod) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    checkfield() {
      return this.title || this.image || this.selectedPeriod;
    },
    ...mapFields("topics", [
      "currentTopic.title",
      "currentTopic.introMD",
      "currentTopic.intro_thumbFile",
      "currentTopic.intro_thumbURL",
      "currentTopic.topic_thumbFile",
      "currentTopic.topic_thumbURL",
      // 'currentTopic.disabled',
      "currentTopic.timePeriod",
      "currentTopic.searchArray",
    ]),
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        this.selectedPeriod = [this.timePeriod.slice()];
      });
    },
    resetbtn(e) {
      if (this.checkfield) {
        this.disabled = 0;
      }
      e.preventDefault();
    },
    //      create () {

    // const post = {
    //   photo: this.img1,
    //   caption: this.caption
    // }
    // firebase.database().ref('PhotoGallery').push(post)
    // .then((response) => {
    //   console.log(response)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    //     },
    //   click1() {
    //   this.$refs.input1.click()
    // },
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
        this.topic_thumbFile = file.name;
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
        async () => {
          this.uploadValue = 100;
          await storageRef.snapshot.ref.getDownloadURL().then((url) => {
            // this.img1 = url;
            // console.log(this.img1);
            this.topic_thumbURL = url;
            console.log(this.topic_thumbURL);
            return true;
          });
        }
      );
    },
    ...mapActions("topics", ["submitNewTopic"]),
    async handleSubmitNewTopic() {
      if (this.imageData) {
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.submitNewTopic();
          }, 2000);
        });
      } else {
        this.topic_thumbFile = "placeHolderImg.png";
        this.topic_thumbURL =
          "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";

        setTimeout(async () => {
          await this.submitNewTopic();
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
