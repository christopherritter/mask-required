<template>
  <v-row>
    <v-col
      v-for="(type, index) in typesToDisplay"
      :key="index"
      class="d-flex align-stretch"
    >
      <v-card
        outlined
        width="100%"
        @mouseover.native="highlightedCard = index"
        @mouseleave.native="highlightedCard = null"
        @click="viewNearby(type)"
        style="cursor: pointer"
        class="type-card"
        :class="{ 'primary white--text': highlightedCard == index }"
      >
        <v-card-text
          class="font-weight-medium"
          :class="{
            'white--text': highlightedCard == index,
          }"
          >{{ type.name | replaceUnderscore }}</v-card-text
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "place-types",
  data() {
    return {
      isLoadingTypes: false,
      showLessTypes: true,
      highlightedCard: null,
      hover: false,
    };
  },
  computed: {
    ...mapState([["types"]]),
    typesToDisplay: function() {
      if (this.showLessTypes) {
        return this.types.slice(0, 6);
      } else {
        return this.types;
      }
    },
  },
  created: function() {
    this.$store.dispatch("fetchReviewTypes");
  },
  methods: {
    viewNearby(type) {
      this.$store.commit("setPlaces", []);
      this.$router.push('nearby/' + type.name);
    }
  },
  filters: {
    replaceUnderscore(val) {
      var i,
        frags = val.split("_");
      for (i = 0; i < frags.length; i++) {
        if (frags[i] != "of" && frags[i] != "or") {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
      }
      return frags.join(" ");
    },
  }
};
</script>

<style lang="scss" scoped>
.type-card {
  min-height: 80px;
}
</style>
