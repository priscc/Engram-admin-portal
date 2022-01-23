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
                multiple
                outlined
                dense
              ></v-select>
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
                :disabled="!checkfield"
                @click="handleSaveEvent"
                >Save Event
                <v-icon small class="pl-2">mdi-plus-circle-outline</v-icon>
              </v-btn>
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
    switchToggle(e, date) {
      console.log("toggling era", this.endEra);
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
          console.log("image upload error", error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.thumbURL = url;
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
