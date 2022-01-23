<template>
  <div id="dashboardheaders">
    <v-breadcrumbs class="pa-0 pb-5" :items="links" large></v-breadcrumbs>

    <div class="text-h5 font-weight-black blue-grey--text text--darken-2">
      {{ header }}
    </div>
    <div class="subtitle-1 blue-grey--text text--darken-2">
      {{ description }}
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
// import { mapFields } from "vuex-map-fields";
// import firebase from "firebase";

export default {
  props: ["header", "description", "links"],
};
</script>

<style lang="scss" scoped></style>
