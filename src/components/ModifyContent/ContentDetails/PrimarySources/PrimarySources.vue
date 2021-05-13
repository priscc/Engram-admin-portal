<template>
  <v-app class="d-flex flex-column align-center">
    <div class="d-flex flex-column" style="width: 66vw;">
      <div class="d-flex flex-start">
        <span
          class="material-icons"
          style="cursor: pointer"
          @click="
            $router.push({ name: 'ModifyContent', path: '/modifycontent' })
          "
        >
          <v-icon size="65" color="#3891A6">
            navigate_before
          </v-icon>
        </span>
      </div>
    </div>
    <div style="font-size: 36px">Modifying Topic Content</div>
    <v-card class="mx-auto" width="52vw" height="5vw" color="#273238">
      <div class="d-flex">
        <v-container class="d-flex justify-center pt-6">
          <div id="nav">
            <router-link class="col" to="/addcontent/modifycontent/events" exact
              >Events</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/historicalpeople"
              exact
              >Historical People</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/terminology"
              exact
              >Terminology</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/primarysources"
              exact
              >Primary Sources</router-link
            >
          </div>
        </v-container>
      </div>
    </v-card>
    <div class="d-flex align-center justify-center">
      <div class="d-flex flex-column flex-start mr-10" style="width: 300px">
        <v-col class="pt-10" cols="15">
          <v-text-field
            label="Artifact:"
            background-color="grey lighten-2"
            v-model="title"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col class="mt-n7" cols="20">
          <v-textarea
            v-model="caption"
            outlined
            name="input-7-4"
            label="Caption:"
            background-color="grey lighten-2"
            height="7vw"
          ></v-textarea>
        </v-col>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex">
          <v-card
            class="d-block "
            width="7vw"
            height="5vw"
            color="grey lighten-2"
          >
            <v-img v-if="url" :src="url" height="80px" width="10vw"></v-img>
          </v-card>

          <div style="width: 17vw">
            <input
              class="pl-4"
              ref="input1"
              type="file"
              @change="previewImage"
            />
          </div>
        </div>
        <div class="d-flex flex-row align-center justify-center pt-8">
          <v-btn
            class="white--text"
            width="180"
            color="#3891A6"
            :disabled="!checkfield"
            elevation="2"
            @click="clearWorkFields"
            >Reset</v-btn
          >

          <v-btn
            class="white--text ml-3"
            width="180"
            color="#3891A6"
            elevation="2"
            @click="handleSaveArtifact"
            >+ Add Term</v-btn
          >
        </div>
      </div>
    </div>

    <div class="d-flex justify-center pt-6">
      <div class="pt-1 pr-2" style="font-size: 18px">Sort by:</div>
      <div style="width: 15vw">
        <v-select
          v-model="selectedSort"
          :items="sortBy"
          :menu-props="{ top: false, offsetY: false }"
          background-color="grey lighten-2"
          outlined
          dense
        >
        </v-select>
      </div>
    </div>
    <div class="d-flex flex-column align-center mx-auto">
      <div v-for="work in currentTopicWorks" :key="work.id">
        <Artifact class="mx-2 my-2" v-bind:work="work" />
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Artifact from "./Artifact/Artifact.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      term: null,
      def: null,
      sortBy: ["Term: Ascending", "Term: Descending"],
      selectedSort: "Term: Ascending",
      image: null,
      imageData: null,
      url: null,
    };
  },
  components: { Artifact },
  computed: {
    checkfield() {
      return this.title || this.caption;
    },
    ...mapGetters("works", ["currentTopicWorks"]),
    ...mapFields("works", [
      "currentWork.title",
      "currentWork.caption",
      "currentWork.thumbFile",
      "currentWork.thumbURL",
    ]),
  },
  methods: {
    Preview_image: () => {},
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
    async handleSaveArtifact() {
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
    },
  },
  created() {
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
