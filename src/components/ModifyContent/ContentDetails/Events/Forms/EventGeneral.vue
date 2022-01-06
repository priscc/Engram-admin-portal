<template>
  <div id="EventInfo">
    <v-form>
      <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
        <navbar />
        <v-container class="px-10">
          <v-row>
            <v-col class="d-flex flex-row">
              <v-card
                class="d-block"
                height="120px"
                width="180px"
                color="grey lighten-2"
              >
                <v-img v-if="url" :src="url" height="100%"></v-img>
              </v-card>

              <div class="d-flex align-end">
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
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="title"
                label="Title"
                filled
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>
                <v-text-field
                  v-model="startDate"
                  label="Start Date"
                  filled
                  outlined
                  dense
                ></v-text-field>
                <div class="d-flex align-center mt-n10">
                  <div class="d-flex" style="width: 30px">{{ eraStart }}</div>
                  <v-switch
                    v-model="startEra"
                    inset
                    @click="switchToggle($event, 'start')"
                    color="#3891A6"
                  ></v-switch>
                </div>
              </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <div>
                <v-text-field
                  v-model="endDate"
                  label="End Date"
                  filled
                  outlined
                  dense
                ></v-text-field>
              </div>
              <div class="d-flex align-center mt-n10">
                <div class="d-flex" style="width: 30px">{{ eraEnd }}</div>
                <v-switch
                  v-model="endEra"
                  inset
                  @click="switchToggle($event, 'end')"
                  color="#3891A6"
                ></v-switch>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="6" md="6" sm="12" xs="12" class="d-flex justify-start">
              <v-select
                v-model="selectedThemes"
                :items="eventTheme"
                label="Choose Event Theme:"
                :menu-props="{ top: false, offsetY: true }"
                attach
                chips
                filled
                multiple
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end pt-14 pr-12">
              <v-btn
                class="white--text"
                width="140"
                color="#3891A6"
                elevation="2"
                :disabled="!checkfield"
                @click="handleSaveEvent"
                >Save</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
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

    disabled: 1,
    url: null,
    imageData: null,
    eraStart: "AD",
    eraEnd: "AD",
  }),
  computed: {
    checkfield() {
      return this.currentEvent.title;
    },
    ...mapFields("events", [
      "currentEvent.title",
      "currentEvent.thumbURL",
      "currentEvent.thumbFile",
    ]),
    ...mapFields("events", {
      selectedThemes: "currentEvent.theme",
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
      console.log("this.imageData SAVING", this.url);
      if (this.imageData) {
        console.log("this.imageData", this.imageData);
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          setTimeout(async () => {
            await this.handleSave();
          }, 2000);
        });
      }
      this.handleSave();

      //  {
      //   console.log("IN HERE");
      //   this.thumbFile = "placeHolderImg.png";
      //   this.thumbURL =
      //     "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
      //   setTimeout(async () => {
      //     await this.handleSave();
      //   }, 2000);
      // }
    },
  },
  created() {
    this.mountPreview();
  },
};
</script>

<style></style>
