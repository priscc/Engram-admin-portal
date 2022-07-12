<template>
  <div id="EventText">
    <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
      <navbar />
      <v-container class="px-10">
        <!--  <v-row>
        <v-col class="d-flex justify-end pb-6">
          <v-btn
            class="white--text"
            width="140"
            color="#3891A6"
            elevation="2"
            @click="handleSave"
            >Save Event</v-btn
          >
        </v-col>
      </v-row> -->
        <v-row>
          <v-col>
            <div class="d-flex justify-start font-weight-bold">Intro:</div>
            <v-textarea
              v-model="descriptionMD"
              outlined
              name="input-7-4"
              label="Event intro summary"
              height="7vw"
            ></v-textarea>
            <div class="d-flex justify-start font-weight-bold">
              Main Content:
            </div>
            <!-- <v-textarea
              v-model="content"
              outlined
              name="input-7-4"
              label="Main event content (has markdown): "
              height="15vw"
            ></v-textarea> -->
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
            />
            <div id="editorContainer"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";
import navbar from "./EventCardHeader.vue";
import { quillEditor } from "vue-quill-editor";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";

export default {
  components: { navbar, quillEditor },
  data: () => ({
    content: "",
    delta: undefined,
    editorOption: {
      debug: "info",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline", "strike"],
          ["link"],
        ],
      },
      placeholder: "Event Content...",
      readOnly: true,
      theme: "snow",
    },
  }),
  watch: {
    content() {
      this.delta = this.$refs.myQuillEditor.quill.getContents().ops;
      this.CONTENT_MARKUP(this.delta);
    },
  },
  computed: {
    ...mapFields("events", [
      "currentEvent.descriptionMD",
      "currentEvent.mainMD",
    ]),
  },
  methods: {
    ...mapActions("events", ["handleSave", "closeForm"]),
    ...mapMutations("events", ["CONTENT_MARKUP"]),
  },
  mounted() {
    if (typeof this.mainMD === "string") {
      this.content = this.mainMD;
    } else {
      var quill = new Quill("#editorContainer");
      quill.setContents(this.mainMD);
      var e = document.getElementById("editorContainer");
      this.content = e.innerHTML;
    }
  },
};
</script>

<style>
#editorContainer {
  display: none;
}
</style>
