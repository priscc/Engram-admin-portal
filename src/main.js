import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import router from './router'
import firebase from 'firebase'
import './firebase/db'
import store from './store'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(firestorePlugin);
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(()=> {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App)
    }).$mount("#app"); 
    // app = new Vue({
    //   el: '#app',
    //   vuetify,
    //   router,
    //   template: '<App/>',
    //   components: { App }
    // });
  }
});

