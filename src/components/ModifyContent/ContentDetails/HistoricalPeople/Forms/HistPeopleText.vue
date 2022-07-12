<template>
  <div id="PeopleText">
    <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
      <navbar />
      <v-container class="px-10">
        <v-row>
          <v-col>
            <v-textarea
              v-model="mainMD"
              outlined
              counter
              name="input-7-4"
              label="Main event content (has markdown):"
            ></v-textarea>
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";
import navbar from "./HistPeopleCardHeader.vue";
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
  computed: {
    ...mapFields("people", ["currentPerson.mainMD"]),
    ...mapGetters("people", ["currentPersonId", "currentPerson"]),
  },
  watch: {
    content() {
      this.delta = this.$refs.myQuillEditor.quill.getContents().ops;
      this.CONTENT_MARKUP(this.delta);
    },
  },
  methods: {
    ...mapActions("people", ["submitEditPerson", "submitNewPerson"]),
    ...mapMutations("people", ["CONTENT_MARKUP"]),
    handleSave() {
      if (this.currentPersonId != null) {
        this.submitEditPerson();
      } else {
        this.submitNewPerson();
      }
    },
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

<style lang="scss" scoped>
#editorContainer {
  display: none;
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
