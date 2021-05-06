<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <router-link to="/" exact>Home</router-link> |
        <router-link to="/about" exact>About</router-link> |
        <router-link
          :class="[
            currentPage.includes('content') ? activeClass : '',
            'nav-item',
          ]"
          to="/addcontent"
          exact
          >Add Content</router-link
        >
        | <router-link to="/" exact>Next Steps</router-link> |
        <router-link to="/" exact>GEO Tester</router-link> |
        <div id="logout" @click="logout">Logout</div>
        |
      </div>
      <router-view />
    </div>
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
