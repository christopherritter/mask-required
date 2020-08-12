<template>
  <section id="placeTypes">
    <v-row v-if="userLocation.lat && !isLoadingTypes">
      <v-col class="d-flex align-stretch">
        <v-card outlined color="#c5f9da" light width="100%">
          <v-card-text><strong>Nearby places:</strong></v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="(type, index) in typesToDisplay"
        :key="index"
        class="d-flex align-stretch"
      >
        <v-card
          outlined
          width="100%"
          :style="styleObject"
          @mouseover.native="highlightedCard = index"
          @mouseleave.native="highlightedCard = null"
          @click="viewNearby(type)"
          style="cursor: pointer"
          class="type-card"
          :class="{ 'teal white--text': highlightedCard == index }"
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

    <v-row v-else-if="!isLoadingTypes">
      <v-col cols="12" sm="4" md="2" class="d-flex align-stretch">
        <v-card outlined color="#c5f9da" light width="100%">
          <v-card-text><strong>Nearby places:</strong></v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="10" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%">
          <v-card-text class="pb-0">
            Allow your browser to get your location in order to browse nearby
            places.
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn @click="getUserLocation()" text>Get your location</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" sm="4" md="2" class="d-flex align-stretch">
        <v-card outlined color="#c5f9da" light width="100%">
          <v-card-text><strong>Nearby places:</strong></v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="2" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%"></v-card>
      </v-col>
      <v-col cols="12" sm="4" md="2" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%"></v-card>
      </v-col>
      <v-col cols="12" sm="4" md="2" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%"></v-card>
      </v-col>
      <v-col cols="12" sm="4" md="2" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%"></v-card>
      </v-col>
      <v-col cols="12" sm="4" md="2" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%"></v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "place-types-bar",
  data() {
    return {
      types: [],
      styleObject: { "border-color": "#7dbc96" },
      userLocation: {
        lat: null,
        long: null,
      },
      isLoadingTypes: true,
      showLessTypes: true,
      highlightedCard: null,
      hover: false,
    };
  },
  computed: {
    typesToDisplay: function() {
      if (this.showLessTypes) {
        return this.types.slice(0, 5);
      } else {
        return this.types;
      }
    },
  },
  async created() {
    if (this.$store.state.userLocation.lat === null) {
      await this.$store.dispatch("fetchUserLocation");
    }
    if (this.$store.state.types === null) {
      await this.$store.dispatch("fetchReviewTypes");
    }
    this.userLocation = this.$store.getters.getUserLocation;
    this.types = this.$store.getters.getTypes;
    this.isLoadingTypes = false;
  },
  methods: {
    async viewNearby(type) {
      this.$router.push({ name: "nearby", params: { name: type.name } });
    },
    getUserLocation() {
      this.$store.dispatch("fetchUserLocation");
    },
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
  },
};
</script>

<style lang="scss" scoped>
.type-card {
  min-height: 80px;
}
</style>
