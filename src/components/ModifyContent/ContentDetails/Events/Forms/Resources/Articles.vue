<template>
  <div class="mx-auto pt-9 d-flex justify-center">
    <v-card class="mx-10" width="380px" height="430px" color="#D8D8D8" outlined>
      <div class="d-flex pl-4 pt-2">Article Resources</div>
      <div class="mt-2" style="overflow-y: scroll; height: 365px">
        <div v-for="article in currentArticles" :key="article.id">
          <Article v-bind:article="article" />
        </div>
        <div></div>
        <div class="d-flex pt-4 justify-center align-center">
          <v-card
            class="d-flex"
            width="319px"
            outlined
            style="border: 1px solid #979797"
          >
            <div
              class="d-flex flex-column"
              style="position: absolute; right: 0px"
            >
              <div id="cardbtn1">
                <span class="material-icons">
                  <v-icon
                    class="d-flex"
                    size="20"
                    color="#3891A6"
                    style="cursor: pointer"
                    v-on:click="submitNewArticleHandler(parentType)"
                  >
                    add_box
                  </v-icon>
                </span>
              </div>
            </div>
            <div class="d-flex space-between mx-auto">
              <v-form ref="form" lazy-validation>
                <div class="d-flex">
                  <v-text-field
                    class="px-2"
                    v-model="newsSource"
                    placeholder="New Source"
                    required
                    dense
                  ></v-text-field>
                  <v-text-field
                    class="px-2"
                    v-model="published"
                    placeholder="Publish Date"
                    required
                    dense
                  ></v-text-field>
                </div>
                <div class="mt-n4" style="width: 155px">
                  <v-text-field
                    class="px-2"
                    v-model="title"
                    placeholder="Article Title"
                    required
                    dense
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="px-2"
                    v-model="summary"
                    placeholder="Summary"
                    background-color="grey lighten-2"
                    required
                    dense
                    outlined
                  ></v-text-field>
                </div>
                <div class="d-flex mt-n2 pl-2">
                  <v-card
                    class="d-block"
                    width="6vw"
                    height="4vw"
                    color="grey lighten-2"
                    outlined
                  >
                    <v-img :src="url"></v-img>
                  </v-card>

                  <div style="width: 13vw">
                    <v-file-input
                      class="pt-6 ml-n4"
                      v-model="image"
                      accept="image/*"
                      prepend-icon="none"
                      append-icon="attach_file"
                      placeholder="Article Thumbnail"
                    >
                    </v-file-input>
                  </div>
                </div>
                <div class="mt-n4" style="width: 155px">
                  <v-text-field
                    class="px-2"
                    v-model="url"
                    placeholder="Article Link"
                    required
                    dense
                  ></v-text-field>
                </div>
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
import Article from "./Article/Article.vue";
export default {
  name: "Articles",
  components: { Article },
  data() {
    return {
      image: null,
      parentType: "event",
    };
  },
  computed: {
    ...mapGetters("articles", ["currentArticles"]),
    ...mapFields("articles", [
      "currentArticle.title",
      "currentArticle.published",
      "currentArticle.newsSource",
      "currentArticle.summary",
      "currentArticle.url",
    ]),
  },
  methods: {
    ...mapActions("articles", ["fetchContentArticles", "submitNewArticle"]),
    validate() {
      this.$refs.form.validate();
      console.log("Submitted");
      alert("Submitted");
    },
    Preview_image() {},
    async submitNewArticleHandler(type) {
      this.submitNewArticle(type);
      this.fetchContentArticles(type);
    },
  },
  created() {
    this.fetchContentArticles("event");
  },
};
</script>

<style scoped></style>
