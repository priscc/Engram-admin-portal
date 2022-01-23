<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list-item two-line>
        <v-list-item-avatar color="#3891A6" size="56">
          <v-img v-if="photoURL" :src="photoURL"></v-img>
          <!-- <v-list-item-title
            light
            class="text-h6 white--text text-uppercase font-weight-black"
            v-else
          >
            {{ email.charAt(0) }}
          </v-list-item-title> -->
          <v-icon v-else dark>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="subtitle-1 blue-grey--text text--darken-2">
            {{ name }}
          </v-list-item-title>

          <v-list-item-subtitle
            class="subtitle-2 blue-grey--text text--darken-2"
            >{{ email }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list flat dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon class="ma-auto mr-2">
            <v-icon
              :style="[
                item.path === $route.path
                  ? { color: '#3891A6' }
                  : { color: '#455A64' },
              ]"
              >{{ item.icon }}</v-icon
            >
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              class="subtitle-1"
              :style="[
                item.path === $route.path
                  ? { color: '#3891A6' }
                  : { color: '#455A64' },
              ]"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block text outlined color="blue-grey darken-2" @click="logout">
            Logout <v-icon small>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container style="background-color: #FAFAFA">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      email: "",
      photoURL: "",
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          path: "/home",
        },
        {
          title: "Add New Topic",
          icon: "mdi-folder-plus",
          path: "/addtopicform",
        },
        {
          title: "Topic Intro",
          icon: "mdi-clipboard-check",
          path: "/topiclist",
        },
        {
          title: "Topic Content",
          icon: "mdi-format-list-bulleted",
          path: "/modifycontent",
        },
      ],
    };
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: "/login" });
          console.log("You are logged out");
        });
    },
  },
  mounted() {
    const user = firebase.auth().currentUser;

    if (user !== null) {
      user.providerData.forEach((profile) => {
        this.name = profile.displayName;
        this.email = profile.email;
        this.photoURL = profile.photoURL;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");
</style>
