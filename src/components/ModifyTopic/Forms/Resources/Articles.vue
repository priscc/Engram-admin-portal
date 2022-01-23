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
                width="25vw"
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
                <div class="d-flex space-between mx-auto">
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
                        required
                        dense
                        outlined
                      ></v-text-field>
                    </div>
                    <div class="d-flex mt-n2 pl-2">
                      <v-card
                        class="d-block"
                        width="9vw"
                        height="70px"
                        color="grey lighten-2"
                        outlined
                      >
                        <v-img :src="urlImg"></v-img>
                      </v-card>

                      <div style="width: 13vw">
                        <input
                          name="map"
                          class="pl-4"
                          type="file"
                          @change="previewImage"
                        />
                      </div>
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
import firebase from "firebase";
export default {
  name: "Articles",
  components: { Article },
  data() {
    return {
      valid: null,
      parentType: "topic",
      urlImg: null,
      imageData: null,
    };
  },
  computed: {
    ...mapGetters("articles", ["currentArticles"]),
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
    validate() {
      this.$refs.form.validate();
      console.log("Submitted");
      alert("Submitted");
    },
    ...mapActions("articles", [
      "fetchArticles",
      "submitNewArticle",
      "clearArticleForm",
    ]),
    mountPreview() {
      this.urlImg = this.thumbURL;
    },
    async submitNewArticleHandler(type) {
      if (this.imageData) {
        let imgPromise = Promise.resolve(this.onUpload());
        await imgPromise.then(async () => {
          //     await this.submitNewTopic();
          //     console.log(res);
          setTimeout(async () => {
            await this.submitNewArticle(type);
            this.fetchArticles(type);
            this.urlImg = null;
            this.thumbFile = null;
          }, 2000);
        });
        await this.onUpload();
      } else {
        this.thumbFile = "placeHolderImg.png";
        this.thumbURL =
          "https://firebasestorage.googleapis.com/v0/b/study-bites-1.appspot.com/o/placeHolderImg.png?alt=media&token=38eced07-54a4-4b3a-b2f9-49fa8e01da63";
        setTimeout(async () => {
          await this.submitNewArticle(type);
          this.fetchArticles(type);
        }, 2000);
      }
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
        this.urlImg = URL.createObjectURL(file);
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
  },
  created() {
    this.fetchArticles("topic");
    this.clearArticleForm();
  },
};
</script>

<style scoped></style>
