<template>
  <div id="PeopleInfo">
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
                v-model="name"
                label="Name"
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
                  v-model="dateOfBirth"
                  label="Date of Birth"
                  outlined
                  dense
                ></v-text-field>
                <div class="d-flex align-center mt-n10">
                  <div class="d-flex" style="width: 30px">{{ eraBirth }}</div>
                  <v-switch
                    v-model="birthEra"
                    color="#3891A6"
                    inset
                    @click="switchToggle($event, 'birth')"
                  ></v-switch>
                </div>
              </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <div>
                <v-text-field
                  v-model="dateOfPassing"
                  label="Date of Passing"
                  outlined
                  dense
                ></v-text-field>
              </div>
              <div class="d-flex align-center mt-n10 pr-12">
                <div class="d-flex" style="width: 30px">{{ eraPassing }}</div>
                <v-switch
                  v-model="passingEra"
                  color="#3891A6"
                  inset
                  @click="switchToggle($event, 'passing')"
                ></v-switch>
              </div>
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
                @click="savePersonHandler"
                >Save Historical Figure
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
import navbar from "./HistPeopleCardHeader.vue";

export default {
  components: { navbar },
  data: () => ({
    image: null,
    disabled: 1,
    url: null,
    imageData: null,
    eraBirth: "AD",
    eraPassing: "AD",
  }),
  computed: {
    checkfield() {
      return this.currentPerson.name;
    },
    ...mapFields("people", [
      "currentPerson.name",
      "currentPerson.thumbURL",
      "currentPerson.thumbFile",
    ]),
    ...mapFields("people", {
      dateOfBirth: "currentPerson.dateOfBirth.date",
      birthEra: "currentPerson.dateOfBirth.era",
      dateOfPassing: "currentPerson.dateOfPassing.date",
      passingEra: "currentPerson.dateOfPassing.era",
    }),
    ...mapGetters("people", ["currentPersonId", "currentPerson"]),

    //* checks if the person name field is empty
    routeValidation() {
      if (this.currentPerson.name == "") {
        //* if name field is empty, route is not allowed
        return false;
      } else {
        //* if not empty, route is allowed
        return true;
      }
    },
  },
  methods: {
    ...mapActions("people", ["handleSave"]),
    mountPreview() {
      this.url = this.thumbURL;
    },
    toggle() {
      this.$nextTick(() => {
        this.selectedPeriod = this.timePeriod.slice();
      });
    },
    switchToggle(e, date) {
      console.log(this.birthEra);
      console.log(this.passingEra);
      if (date === "birth") {
        if (this.birthEra) {
          this.eraBirth = "AD";
        } else {
          this.eraBirth = "BC";
        }
      } else {
        if (this.passingEra) {
          this.eraPassing = "AD";
        } else {
          this.eraPassing = "BC";
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
            console.log(this.thumbURL);
          });
        }
      );
    },
    async savePersonHandler() {
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
