<template>
  <div class="pt-4">
    <v-card
      width="319px"
      height="auto"
      outlined
      style="border: 1px solid #979797"
    >
      <div class="d-flex flex-column" style="position: absolute; right: 0px">
        <div id="cardbtn1">
          <!-- Modal when editing an article -->
          <v-dialog v-model="editDialog" persistent max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <span class="material-icons">
                <v-icon
                  class="d-flex"
                  size="20"
                  color="#3891A6"
                  style="cursor: pointer"
                  @click="editArticle(article)"
                  v-bind="attrs"
                  v-on="on"
                >
                  create
                </v-icon>
              </span>
            </template>
            <v-card>
              <v-card-title class="headline d-flex justify-center">
                <div class="mt-4">
                  Editing an Article
                </div>
              </v-card-title>
              <div class="d-flex justify-center">
                <div class=" d-flex pl-8">
                  <v-form ref="form" lazy-validation>
                    <div class="d-flex">
                      <v-text-field
                        class="px-2"
                        v-model="newsSource"
                        placeholder="News Source"
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
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelHandler">
                  Cancel
                </v-btn>

                <!-- Final confirmation on saving edited article -->
                <v-btn color="#3891A6" text @click="submitEditArticleHandler">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Modal  -->

          <!-- Modal when deleting an article -->
          <v-dialog v-model="delDialog" persistent max-width="250">
            <template v-slot:activator="{ on, attrs }">
              <span class="material-icons">
                <v-icon
                  class="d-flex"
                  size="20"
                  color="#3891A6"
                  style="cursor: pointer"
                  v-bind="attrs"
                  v-on="on"
                >
                  disabled_by_default
                </v-icon>
              </span>
            </template>
            <v-card>
              <v-card-title class="headline">
                <div>Are you sure you want to delete {{ article.title }}?</div>
              </v-card-title>
              <v-card-text
                >Once {{ article.title }} is deleted you can never retrieve
                it</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="delDialog = false">
                  Cancel
                </v-btn>

                <!-- Final confirmation on deleting article -->
                <v-btn
                  color="red darken-1"
                  text
                  @click="deleteArticleHandler(article)"
                >
                  Yes, delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Modal  -->
        </div>
      </div>
      <div class="font-weight-regular d-flex flex-column flex-start pt-2 pl-4">
        <div class="d-flex" style="font-size: 14px">
          Article Title: {{ article.title }}
        </div>
        <div class="d-flex" style="font-size: 10px">
          {{ article.url }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      editDialog: false,
      delDialog: false,
      image: null,
    };
  },
  name: "Article",
  props: ["article"],
  computed: {
    ...mapFields("articles", [
      "currentArticle.title",
      "currentArticle.newsSource",
      "currentArticle.published",
      "currentArticle.url",
      "currentArticle.summary",
      "currentArticle.thumbURL",
      "currentArticle.thumbFile",
    ]),
  },
  methods: {
    ...mapActions("articles", [
      "editArticle",
      "clearArticleForm",
      "fetchContentArticles",
      "submitEditArticle",
      "deleteArticle",
    ]),
    async submitEditArticleHandler() {
      await this.submitEditArticle();
      this.editDialog = false;
      this.fetchContentArticles("people");
      await this.clearArticleForm();
    },
    async deleteArticleHandler(article) {
      await this.deleteArticle(article);
      this.delDialog = false;
      this.fetchContentArticles("people");
      await this.clearArticleForm();
      console.log("Deleted " + article.title);
    },
    async cancelHandler() {
      this.editDialog = false;
      this.fetchContentArticles("people");
      await this.clearArticleForm();
      console.log("Cancelled Edit");
    },
  },
};
</script>

<style lang="scss" scoped></style>
