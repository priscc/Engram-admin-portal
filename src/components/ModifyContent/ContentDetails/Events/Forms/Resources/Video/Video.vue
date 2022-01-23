<template>
  <div class="pt-4" id="EventVideo">
    <v-card
      class="d-flex"
      width="319px"
      height="auto"
      outlined
      style="border: 1px solid #979797"
    >
      <v-card width="auto" height="auto" outlined class="d-flex align-center">
        <youtube
          class="pa-1 d-flex align-center"
          :video-id="video.url"
          :player-width="111"
          :player-height="72"
        ></youtube>
      </v-card>
      <div class="d-flex flex-column" style="position: absolute; right: 0px">
        <div>
          <!-- Modal when editing a video -->
          <v-dialog v-model="editDialog" persistent max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#3891A6"
                @click="editVideo(video)"
                v-bind="attrs"
                v-on="on"
                icon
                x-small
              >
                <v-icon>
                  create
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline d-flex justify-center">
                <div class="mt-4">
                  Editing a video
                </div>
              </v-card-title>
              <div class="d-flex justify-center">
                <v-card width="111px" height="80px" outlined color="#D8D8D8">
                  <youtube
                    v-if="showYoutube"
                    :video-id="currentVideoURL"
                    :player-width="111"
                    :player-height="78"
                  ></youtube>
                </v-card>
                <div class=" pl-8">
                  <v-form ref="form" lazy-validation>
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
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelHandler">
                  Cancel
                </v-btn>

                <!-- Final confirmation on saving edited video -->
                <v-btn color="#3891A6" text @click="submitEditVideoHandler">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Modal when deleting a video -->
          <v-dialog v-model="delDialog" persistent max-width="250">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#3891A6" v-bind="attrs" v-on="on" x-small icon>
                <v-icon>
                  disabled_by_default
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                <div>Are you sure you want to delete {{ video.title }}?</div>
              </v-card-title>
              <v-card-text
                >Once {{ video.title }} is deleted you can never retrieve
                it</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="delDialog = false">
                  Cancel
                </v-btn>

                <!-- Final confirmation on deleting video -->
                <v-btn
                  color="red darken-1"
                  text
                  @click="deleteVideoHandler(video)"
                >
                  Yes, delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="pl-2 pr-1 pt-6 text-left">
        {{ video.title }}
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      editDialog: false,
      delDialog: false,
    };
  },
  name: "Video",
  props: ["video"],
  computed: {
    ...mapGetters("videos", ["currentVideoURL"]),
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
      "editVideo",
      "clearVideoForm",
      "submitEditVideo",
      "deleteVideo",
      "fetchContentVideos",
    ]),
    ready(event) {
      this.player = event.target;
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
    async submitEditVideoHandler() {
      await this.submitEditVideo();
      this.editDialog = false;
      await this.fetchContentVideos("event");
      console.log("Submitted Edit Video");
    },
    async cancelHandler() {
      this.editDialog = false;
      await this.fetchContentVideos("event");
      await this.clearVideoForm();
      console.log("Cancelled Edit");
    },
    async deleteVideoHandler(video) {
      await this.deleteVideo(video);
      this.delDialog = false;
      await this.fetchContentVideos("event");
      console.log("Deleted " + video.title);
    },
  },
};
</script>

<style lang="scss" scoped></style>
