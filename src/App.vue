<template>
  <v-app>
    <!-- <div id="app"> -->
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
        src="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right,#607D8B, rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <v-toolbar-title>
          <v-btn text x-large
            ><router-link
              class="white--text font-weight-black"
              :class="[
                currentPage.includes('content') ? activeClass : '',
                'nav-item',
              ]"
              to="/addcontent"
              exact
              >Study Bites Admin Portal
            </router-link>
          </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon color="white" @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="800"
      >
        <v-container style="padding-top: 100px; padding-bottom: 100px"
          ><router-view />
        </v-container>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      activeClass: "active",
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
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");
#app {
  font-family: "Abel";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: block;
}

#nav {
  padding: 16px;
  font-weight: bold;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}
#logout:hover {
  cursor: pointer;
}
.active {
  text-decoration: none;
  color: #42b983;
}
</style>
