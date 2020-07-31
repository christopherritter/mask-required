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
        style="cursor: pointer"
        class="type-card"
        :class="{ 'primary white--text': highlightedCard == index }"
      >
        <v-card-text
          class="font-weight-medium"
          :class="{
            'white--text': highlightedCard == index,
          }"
          >{{ type.name }}</v-card-text
        >
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
    this.$store.dispatch("fetchTypes");
  },
  methods: {
    mouseIn(e) {
      this.hover = true;
      this.thirdColor = e.target.classList[3];
    },
    mouseOut() {
      this.hover = false;
      this.thirdColor = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.type-card {
  min-height: 80px;
}
</style>
