<template>
  <div>
    <v-card flat outlined>
      <v-container>
        <div class="d-flex justify-start font-weight-bold">
          Article Resources
        </div>
        <v-row>
          <v-col cols="7">
            <div class="pt-4">
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
                  <v-btn
                    x-small
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
                    <div class="d-flex ml-4 mr-6">
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
                        class="pt-0 ml-n4"
                        v-model="image"
                        accept="image/*"
                        prepend-icon="none"
                        append-icon="attach_file"
                        placeholder="Article Thumbnail"
                      >
                      </v-file-input>
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
                <!-- <div class="d-flex pt-4 justify-center align-center">
              <v-card height="auto" outlined>
                <v-card-actions class="d-flex justify-end">
                  <v-btn
                    small
                    outlined
                    color="#3891A6"
                    v-on:click="submitNewArticleHandler(parentType)"
                  >
                    Add +
                  </v-btn>
                </v-card-actions>
                <v-card-text>
                  <div>
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
                </v-card-text>
              </v-card>
            </div> -->
              </v-card>
            </div>
          </v-col>
          <v-col cols="5">
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
