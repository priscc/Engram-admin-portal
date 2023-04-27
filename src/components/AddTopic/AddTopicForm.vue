<template>
  <div id="addTopic">
    <v-container>
      <Header
        v-bind:header="'Adding New Topic'"
        v-bind:description="
          'Add a new topic to the Engram home page by filling in basic information.'
        "
        v-bind:links="[]"
      />
      <v-row>
        <v-col cols="6" class="pt-10">
          <div class="d-flex align-end">
            <v-card width="200" height="150" color="grey lighten-2" outlined>
              <v-img v-if="url" :src="url" height="100%" width="100%"></v-img>
            </v-card>
            <input
              id="imginput"
              class="pl-4"
              ref="input1"
              type="file"
              @change="previewImage"
            />
          </div>

          <v-text-field
            label="Topic title:"
            background-color="grey lighten-2"
            v-model="title"
            outlined
            dense
            class="pt-5"
          ></v-text-field>
          <v-select
            v-model="timePeriod"
            :items="timePeriodChoices"
            label="Time Period"
            background-color="grey lighten-2"
            outlined
            dense
            class="pt-5"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex justify-end pr-12">
            <v-btn
              class="white--text"
              width="140"
              color="#3891A6"
              :disabled="!checkfield"
              elevation="2"
              @click="resetFields"
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
import Header from "../DashboardHeaders.vue";

export default {
  components: { Header },
  data: () => ({
    image: null,
    timePeriodChoices: [1, 2, 3, 4],
    disabled: 1,
    url: null,
    caption: "",
    img1: "",
    imageData: null,
    content: "",
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
    ...mapActions("topics", ["submitNewTopic", "clearFields", "clearTopicId"]),

    toggle() {
      this.$nextTick(() => {
        this.selectedPeriod = [this.timePeriod.slice()];
      });
    },
    clearInput() {
      document.getElementById("imginput").value = "";
    },
    previewImage(e) {
      this.uploadValue = 0;
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > 2) {
        e.preventDefault();
        this.clearInput();
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
    async handleSubmitNewTopic() {
      console.log("currentTopic.introMD", this.introMD)
      if (this.imageData) {
        console.log("in this.imageData")
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.submitNewTopic();
          }, 2000);
        });
      } else {
        console.log("not in this.imageData")
        setTimeout(async () => {
          await this.submitNewTopic();
        }, 2000);
      }
    },
    resetFields() {
      this.title = "";
      this.timePeriod = [];
      this.url = null;
      this.imageData = null;
      this.clearInput();
      this.clearFields();
      this.clearTopicId();
    },
  },
  created() {
    this.clearFields();
    this.clearTopicId();
  },
};
</script>

<style lang="scss" scoped></style>
