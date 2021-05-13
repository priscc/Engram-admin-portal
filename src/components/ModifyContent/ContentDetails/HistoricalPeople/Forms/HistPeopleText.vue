<template>
  <v-card class="mx-auto mt-4" width="62vw" height="40vw">
    <v-card class="mx-auto" width="62vw" height="5vw" color="#273238">
      <div class="d-flex">
        <v-container class="pt-8 pl-12 d-flex">
          <div id="nav">
            <router-link
              class="col"
              to="/addcontent/modifycontent/historicalpeople/general"
              exact
              >General</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/historicalpeople/text"
              exact
              >Text</router-link
            >
            <router-link
              class="col"
              to="/addcontent/modifycontent/historicalpeople/resources"
              exact
              >Resources</router-link
            >
          </div>
        </v-container>
        <div class="d-flex justify-end">
          <span class="material-icons">
            <v-icon
              size="40"
              color="#3891A6"
              @click="
                $router.push({
                  name: 'HistoricalPeople',
                  path: '/historicalpeople',
                })
              "
            >
              disabled_by_default
            </v-icon>
          </span>
        </div>
      </div>
    </v-card>
    <div class="d-flex justify-center pt-6">
      <v-col cols="12" md="11">
        <v-textarea
          v-model="mainMD"
          outlined
          name="input-7-4"
          label="Main event content (has markdown):"
          background-color="grey lighten-2"
          height="25vw"
        ></v-textarea>
      </v-col>
    </div>
    <div class="d-flex justify-end pr-12">
      <v-btn
        class="white--text"
        width="140"
        color="#3891A6"
        elevation="2"
        @click="handleSave"
        >Save</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  computed: {
    ...mapFields("people", ["currentPerson.mainMD"]),
    ...mapGetters("people", ["currentPersonId", "currentPerson"]),
  },
  methods: {
    ...mapActions("people", ["submitEditPerson", "submitNewPerson"]),
    handleSave() {
      if (this.currentPersonId != null) {
        this.submitEditPerson();
      } else {
        this.submitNewPerson();
      }
      this.$router.replace({
        name: "HistoricalPeople",
        path: "/addcontent/modifycontent/historicalpeople",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
