<template>
 <div class="mx-auto pt-4 d-flex justify-center">
    <v-card class="" width="30vw" height="410px" color="#D8D8D8" outlined>
      <div class="d-flex pl-4 pt-2">Video Resources</div>
      <div class="mt-2" style="overflow-y: scroll; height: 365px">
        <div v-for="video in currentVideos" :key="video.id">
          <Video v-bind:video="video" />
        </div>
        <div class="d-flex pt-4 justify-center align-center">
          <v-card
            class="d-flex"
             width="25vw"
            height="80px"
            outlined
            style="border: 1px solid #979797"
          >
            <v-card
              width="111px"
              height="80px"
              outlined
              style="border: 1px solid #979797;margin: -1px 0px 0px -1px"
              color="#D8D8D8"
              ><youtube
                v-if="showYoutube"
                :video-id="currentVideoURL"
                :player-width="111"
                :player-height="78"
              ></youtube>
              <div v-if="showDiv" style="padding: 8px; text-align: left">
                Preview of current video:
              </div></v-card
            >
            <div class="d-flex flex-row" style="position: absolute; right: 0px">
              <div>
                <span class="material-icons">
                  <v-icon
                    class="d-flex"
                    size="20"
                    color="#3891A6"
                    style="cursor: pointer"
                    @click="clearVideoForm"
                  >
                    refresh
                  </v-icon>
                </span>
              </div>
              <div>
                <span class="material-icons">
                  <v-icon
                    class="d-flex"
                    size="20"
                    color="#3891A6"
                    style="cursor: pointer"
                    v-on:click="submitNewVideoHandler(parentType)"
                  >
                    add_box
                  </v-icon>
                </span>
              </div>
            </div>
            <div class=" d-flex justify-center align-center mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  class="mt-5"
                  v-model="title"
                  placeholder="Add Video Title"
                  required
                  dense
                ></v-text-field>
                <v-text-field
                  class="mt-n3"
                  v-model="videoURL"
                  placeholder="Video Link"
                  required
                  dense
                ></v-text-field>
              </v-form>
            </div>
          </v-card>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Video from "./Video/Video.vue";

export default {
  name: "Videos",
  components: { Video },
  data() {
    return {
      valid: true,
      parentType: "people",
    };
  },
  computed: {
    ...mapGetters("videos", ["currentVideos", "currentVideoURL"]),
    ...mapFields("videos", ["currentVideoResource.title", "videoURL"]),
    showYoutube() {
      if (this.currentVideoURL == "") {
        return false;
      } else {
        return true;
      }
    },
    showDiv() {
      if (this.currentVideoURL == "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions("videos", [
      "fetchContentVideos",
      "submitNewVideo",
      "clearVideoForm",
    ]),
    validate() {
      this.$refs.form.validate();
      console.log("Submitted");
      alert("Submitted");
    },
    async submitNewVideoHandler(parentType) {
      await this.submitNewVideo(parentType);
      await this.fetchContentVideos(parentType);
    },
  },
  created() {
    this.clearVideoForm();
    this.fetchContentVideos("people");
  },
};
</script>

<style lang="scss" scoped></style>
