<template>
  <div id="EventInfo">
    <v-form>
      <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
        <navbar />
        <v-col class="pl-12 pt-9" cols="10" sm="9" md="11">
          <v-text-field
            v-model="title"
            label="Title"
            background-color="grey lighten-2"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <div class="d-flex">
          <v-col class="pl-12 mt-n4" cols="4">
            <v-text-field
              v-model="startDate"
              label="Start Date"
              background-color="grey lighten-2"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <div class="d-flex align-center mt-n10 pr-12">
            <div class="d-flex" style="width: 30px">{{ eraStart }}</div>
            <v-switch
              v-model="startEra"
              inset
              @click="switchToggle($event, 'start')"
              color="#3891A6"
            ></v-switch>
          </div>
          <v-col class="ml-n4 mt-n4" cols="4">
            <v-text-field
              v-model="endDate"
              label="End Date"
              background-color="grey lighten-2"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <div class="d-flex align-center mt-n10 pr-12">
            <div class="d-flex" style="width: 30px">{{ eraEnd }}</div>
            <v-switch
              v-model="endEra"
              inset
              @click="switchToggle($event, 'end')"
              color="#3891A6"
            ></v-switch>
          </div>
        </div>
        <div class="d-flex pl-12 mt-n4">
          <v-card
            class="d-block"
            height="80px"
            width="10vw"
            color="grey lighten-2"
          >
            <v-img v-if="url" :src="url" height="80px" width="10vw"></v-img>
          </v-card>

          <div style="width: 17vw">
            <!-- <v-file-input
            class="pt-10"
            @change="Preview_image"
            v-model="image"
            accept="image/*"
            prepend-icon="none"
            append-icon="attach_file"
            placeholder="Upload TOPIC thumbnail"
          >
          </v-file-input> -->
            <input
              class="pl-4"
              ref="input1"
              type="file"
              @change="previewImage"
            />
          </div>
        </div>
        <v-col class="pl-12" cols="10">
          <div class="d-flex flex-start" style="width: 24vw">
            <v-select
              v-model="selectedPeriod"
              :items="eventTheme"
              :menu-props="{ top: false, offsetY: true }"
              label="Choose Event Theme:"
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
            elevation="2"
            :disabled="!checkfield"
            @click="handleSaveEvent"
            >Save</v-btn
          >
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";
import navbar from "./EventCardHeader.vue";

export default {
  components: { navbar },
  data: () => ({
    // title: null,
    image: null,
    eventTheme: [
      "Society",
      "Politics",
      "Environment",
      "Culture",
      "Economics",
      "Technology",
      "Independent",
    ],
    selectedPeriod: null,
    disabled: 1,
    url: null,
    imageData: null,
    eraStart: "AD",
    eraEnd: "AD",
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
      return this.currentEvent.title;
    },
    ...mapFields("events", [
      "currentEvent.title",
      "currentEvent.thumbURL",
      "currentEvent.thumbFile",
    ]),
    ...mapFields("events", {
      startDate: "currentEvent.startDate.date",
      startEra: "currentEvent.startDate.era",
      endDate: "currentEvent.endDate.date",
      endEra: "currentEvent.endDate.era",
    }),
    ...mapGetters("events", ["currentEvent", "currentEventId"]),
    //* checks if the person name field is empty
    routeValidation() {
      if (this.currentEvent.title == "") {
        //* if name field is empty, route is not allowed
        return false;
      } else {
        //* if not empty, route is allowed
        return true;
      }
    },
  },
  methods: {
    ...mapActions("events", ["closeForm", "handleSave"]),
    mountPreview() {
      this.url = this.thumbURL;
    },
    toggle() {
      this.$nextTick(() => {
        this.selectedPeriod = this.timePeriod.slice();
      });
    },
    resetbtn(e) {
      if (this.checkfield) {
        this.disabled = 0;
      }
      e.preventDefault();
    },
    switchToggle(e, date) {
      console.log(this.endEra);
      if (date === "start") {
        if (this.startEra) {
          this.eraStart = "AD";
        } else {
          this.eraStart = "BC";
        }
      } else {
        if (this.endEra) {
          this.eraEnd = "AD";
        } else {
          this.eraEnd = "BC";
        }
      }
      e.preventDefault();
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
    async handleSaveEvent() {
      if (this.imageData) {
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.handleSave();
          }, 2000);
        });
      } else {
        this.thumbFile = "placeHolderImg.png";
        this.thumbURL =
          "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
        setTimeout(async () => {
          await this.handleSave();
        }, 2000);
      }
    },
  },
  created() {
    this.mountPreview();
  },
};
</script>

<style></style>
