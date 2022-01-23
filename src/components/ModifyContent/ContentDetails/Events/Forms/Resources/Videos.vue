<template>
  <div>
    <v-card flat outlined>
      <v-container>
        <div class="d-flex justify-start font-weight-bold">Video Resources</div>
        <v-row>
          <v-col>
            <div class="pt-4">
              <v-card class="d-flex" width="100%" height="auto" outlined>
                <div
                  class="d-flex flex-row"
                  style="position: absolute; right: 0px"
                >
                  <div>
                    <span class="material-icons">
                      <v-icon
                        class="d-flex"
                        size="20"
                        color="#3891A6"
                        style="cursor: pointer"
                        v-on:click="clearVideoForm"
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
                <v-card
                  width="111px"
                  height="auto"
                  outlined
                  style="border: 1px solid #979797;margin: -1px 0px 0px -1px"
                  color="#D8D8D8"
                  class="pt-6 pb-6"
                >
                  <youtube
                    v-if="showYoutube"
                    :video-id="currentVideoURL"
                    :player-width="111"
                    :player-height="78"
                  ></youtube>
                  <div v-if="showDiv">
                    Preview of video thumbnail:
                  </div>
                </v-card>

                <div class=" mb-n3 px-3 d-flex justify-center align-center">
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
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div v-for="video in currentVideos" :key="video.id">
              <Video v-bind:video="video" />
            </div>
          </v-col>
        </v-row>
      </v-container>
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
      parentType: "event",
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
    },
    async submitNewVideoHandler(parentType) {
      await this.submitNewVideo(parentType);
    },
  },
  created() {
    this.clearVideoForm();
    this.fetchContentVideos("event");
  },
};
</script>

<style lang="scss" scoped></style>
