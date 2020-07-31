<template>
  <v-row>
    <v-col
      v-for="type in types"
      :key="type.name"
      class="d-flex align-stretch"
    >
      <v-card
        outlined
        width="100%"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <v-card-text>{{ type.name }} ({{ type.counter }})</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isLoadingTypes: false,
      showLessTypes: true,
      hover: false
    };
  },
  computed: {
    ...mapState([["types"]]),
    // typesToDisplay: function() {
    //   if (this.showLessTypes) {
    //     return this.types.slice(0, 7);
    //   } else {
    //     return this.types;
    //   }
    // },
  },
  created: function() {
    this.$store.dispatch("fetchTypes");
  },
};
</script>

<style lang="scss" scoped></style>
