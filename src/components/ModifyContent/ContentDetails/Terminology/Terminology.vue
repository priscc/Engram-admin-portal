<template>
  <v-app class="d-flex flex-column align-center">
    <div class="d-flex flex-column" style="width: 66vw;">
      <div class="d-flex flex-start">
        <span
          class="material-icons"
          style="cursor: pointer"
          @click="
            $router.push({ name: 'ModifyContent', path: '/modifycontent' })
          "
        >
          <v-icon size="65" color="#3891A6">
            navigate_before
          </v-icon>
        </span>
      </div>
    </div>
    <div style="font-size: 36px">Modifying Topic Content</div>
    <v-card class="mx-auto" width="52vw" height="5vw" color="#273238">
      <div class="d-flex">
        <v-container class="d-flex justify-center pt-6">
          <div id="nav">
            <router-link class="col" to="/addcontent/modifycontent/events" exact
              >Events</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/historicalpeople"
              exact
              >Historical People</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/terminology"
              exact
              >Terminology</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/primarysources"
              exact
              >Primary Sources</router-link
            >
          </div>
        </v-container>
      </div>
    </v-card>
    <div class="d-flex justify-center">
      <div class="d-flex flex-column flex-start mr-4" style="width: 300px">
        <v-col class="pt-10" cols="15">
          <v-text-field
            label="Term:"
            background-color="grey lighten-2"
            v-model="term"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col class="mt-n7" cols="20">
          <v-textarea
            v-model="def"
            outlined
            name="input-7-4"
            label="Definition:"
            background-color="grey lighten-2"
            height="7vw"
          ></v-textarea>
        </v-col>
      </div>
      <div class="d-flex flex-column justify-center">
        <v-btn
          class="white--text"
          width="180"
          color="#3891A6"
          :disabled="!checkfield"
          elevation="2"
          @click="resetFields"
          >Reset</v-btn
        >

        <v-btn
          class="white--text mt-4"
          width="180"
          color="#3891A6"
          elevation="2"
          @click="handleSave"
          >{{ buttonLabel }}</v-btn
        >
      </div>
    </div>
    <div class="d-flex justify-center pt-6">
      <div class="pt-1 pr-2" style="font-size: 18px">Sort by:</div>
      <div style="width: 18vw">
        <v-select
          v-model="selectedSort"
          :items="sortBy"
          :menu-props="{ top: false, offsetY: false }"
          background-color="grey lighten-2"
          outlined
          dense
        >
        </v-select>
      </div>
    </div>
    <div class="d-flex flex-wrap align-center mx-auto" style="width: 750px">
      <div v-for="topicTerm in currentTopicTerms" :key="topicTerm.id">
        <Term class="mx-2 my-2" v-bind:topicTerm="topicTerm" />
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Term from "./Term/Term.vue";

export default {
  data() {
    return {
      button: "+ Add Term",
      sortBy: ["Term: Ascending", "Term: Descending"],
      selectedSort: "Term: Ascending",
    };
  },
  components: { Term },
  computed: {
    checkfield() {
      return this.term || this.def;
    },
    ...mapGetters("terminology", [
      "currentTopicTerms",
      "currentTerm",
      "currentTermId",
      "buttonLabel",
    ]),
    ...mapFields("terminology", ["currentTerm.term", "currentTerm.def"]),
  },
  methods: {
    ...mapActions("terminology", [
      "fetchTerms",
      "clearTermId",
      "submitNewTerm",
      "clearFields",
      "submitEditTerm",
    ]),
    handleSave() {
      if (this.currentTermId != null) {
        console.log("Term edited");
        this.button = "Edit Term";
        this.submitEditTerm();
      } else {
        console.log("Term Added");
        this.button = "+ Add Term";
        this.submitNewTerm();
      }
    },
    resetFields() {
      this.clearFields();
      this.clearTermId();
    },
  },
  created() {
    this.fetchTerms();
    this.clearTermId();
    this.clearFields();
  },
};
</script>

<style lang="scss" scoped>
#imageThumbnail {
  width: 15vw;
  height: 10vw;
  background-color: #5b6368;
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
