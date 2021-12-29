<template>
  <v-form>
    <v-card class="mx-auto mt-4" width="62vw" height="28vw">
      <v-card class="mx-auto" width="62vw" height="5vw" color="#273238">
        <div class="d-flex">
          <v-container class="pt-8 pl-12 d-flex">
            <div id="nav">
              <router-link
                class="col"
                to="/addcontent/modifycontent/historicalpeople/general"
                exact
                >General</router-link
              >
              <router-link
                class="col"
                :event="routeValidation ? 'click' : ''"
                to="/addcontent/modifycontent/historicalpeople/text"
                exact
                >Text</router-link
              >
              <router-link
                class="col"
                :event="routeValidation ? 'click' : ''"
                to="/addcontent/modifycontent/historicalpeople/resources"
                exact
                >Resources</router-link
              >
            </div>
          </v-container>
          <div class="d-flex justify-end">
            <span class="material-icons">
              <v-icon
                size="40"
                color="#3891A6"
                @click="
                  $router.push({
                    name: 'HistoricalPeople',
                    path: '/historicalpeople',
                  })
                "
              >
                disabled_by_default
              </v-icon>
            </span>
          </div>
        </div>
      </v-card>
      <v-col class="pl-12 pt-9" cols="10" sm="9" md="11">
        <v-text-field
          v-model="name"
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
            v-model="dateOfBirth"
            label="Date of Birth"
            background-color="grey lighten-2"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <div class="d-flex align-center mt-n10 pr-12">
          <div class="d-flex" style="width: 30px">{{ eraBirth }}</div>
          <v-switch
            v-model="birthEra"
            color="#3891A6"
            inset
            @click="switchToggle($event, 'birth')"
          ></v-switch>
        </div>
        <v-col class="mt-n4" cols="4">
          <v-text-field
            v-model="dateOfPassing"
            label="Date of Passing"
            background-color="grey lighten-2"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <div class="d-flex align-center mt-n10 pr-12">
          <div class="d-flex" style="width: 30px">{{ eraPassing }}</div>
          <v-switch
            v-model="passingEra"
            color="#3891A6"
            inset
            @click="switchToggle($event, 'passing')"
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
          <input class="pl-4" ref="input1" type="file" @change="previewImage" />
        </div>
      </div>

      <div class="d-flex justify-end pr-12">
        <v-btn
          class="white--text"
          width="140"
          color="#3891A6"
          elevation="2"
          :disabled="!checkfield"
          @click="savePersonHandler"
          >Save</v-btn
        >
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";

export default {
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
    selectedPeriod: null,
    disabled: 1,
    url: null,
    imageData: null,
    eraBirth: "AD",
    eraPassing: "AD",
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
    // Preview_image() {
    //   this.url = URL.createObjectURL(this.image);
    // },
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
    ...mapActions("people", ["handleSave"]),
    async savePersonHandler() {
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
      // this.$router.replace({
      //   name: "HistoricalPeople",
      //   path: "/addcontent/modifycontent/historicalpeople",
      // });
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
