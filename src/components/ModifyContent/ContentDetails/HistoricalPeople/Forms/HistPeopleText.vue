<template>
  <div id="PeopleText">
    <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
      <navbar />
      <v-container class="px-10">
        <v-row>
          <v-col>
            <v-textarea
              v-model="mainMD"
              outlined
              counter
              name="input-7-4"
              label="Main event content (has markdown):"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import navbar from "./HistPeopleCardHeader.vue";
export default {
  components: { navbar },
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
