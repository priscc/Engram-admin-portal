<template>
  <div id="EventArticles">
    <v-card flat outlined>
      <v-container>
        <div class="d-flex justify-start font-weight-bold">
          Article Resources
        </div>
        <v-row>
          <v-col>
            <div class="pt-4">
              <v-card
                class="d-flex"
                width="100%"
                outlined
                style="border: 1px solid #979797"
              >
                <div
                  class="d-flex flex-column"
                  style="position: absolute; right: 0px"
                >
                  <v-btn
                    small
                    icon
                    color="#3891A6"
                    v-on:click="submitNewArticleHandler(parentType)"
                  >
                    <v-icon>
                      add_box
                    </v-icon>
                  </v-btn>
                </div>
                <div class="pt-6 d-flex space-between mx-auto">
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
                    <div>
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
                        required
                        outlined
                        dense
                        clearable
                      ></v-text-field>
                    </div>
                    <div class="d-flex justify-end ml-2 mr-6">
                      <v-card
                        class="d-block"
                        width="6vw"
                        height="4vw"
                        color="grey lighten-2"
                        outlined
                      >
                        <v-img :src="url"></v-img>
                      </v-card>

                      <v-file-input
                        class="ml-n4"
                        v-model="image"
                        accept="image/*"
                        prepend-icon="none"
                        append-icon="attach_file"
                        placeholder="Article Thumbnail"
                      >
                      </v-file-input>
                    </div>
                    <div>
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
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div v-for="article in currentArticles" :key="article.id">
              <Article v-bind:article="article" />
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
    ...mapActions("articles", [
      "fetchContentArticles",
      "submitNewArticle",
      "clearArticleForm",
    ]),
    validate() {
      this.$refs.form.validate();
      console.log("Submitted");
      alert("Submitted");
    },
    Preview_image() {},
    async submitNewArticleHandler(type) {
      this.submitNewArticle(type);
    },
  },
  created() {
    this.clearArticleForm();
    this.fetchContentArticles("event");
  },
};
</script>

<style scoped></style>
