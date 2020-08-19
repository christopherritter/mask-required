<template>
  <section>
    <h2 class="text-center">Recent reviews</h2>
    <p class="subtitle text-center">
      Read the latest reviews of local businesses and other nearby places.
    </p>
    <div
      v-for="(type, index) in typesToDisplay"
      v-bind:key="index"
      class="place-types"
    >
      <h3>{{ type.name | replaceUnderscore }} reviews</h3>
      <v-slide-group
        v-model="place"
        class="pa-4"
        show-arrows
        v-scroll:#scroll-target="onScroll"
      >
        <v-slide-item v-for="place in type.places" v-bind:key="place.place_id">
          <v-card
            width="250"
            min-width="250"
            height="200"
            outlined
            @mouseover.native="highlightedCard = index + place.place_id"
            @mouseleave.native="highlightedCard = null"
            :style="styleObject"
            class="mr-2 mb-2"
            :class="{
              'teal white--text': highlightedCard == index + place.place_id,
            }"
            style="cursor: pointer"
          >
            <v-card-title
              :class="{
                'white--text': highlightedCard == index + place.place_id,
              }"
            >
              {{ place.name }}
            </v-card-title>
            <v-card-subtitle
              :class="{
                'white--text': highlightedCard == index + place.place_id,
              }"
            >
              {{ place.formatted_address }}
            </v-card-subtitle>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "place-types-section",
  data() {
    return {
      place: null,
      types: [],
      userLocation: {
        lat: null,
        long: null,
      },
      isLoadingTypes: true,
      showLessTypes: true,
      styleObject: { "border-color": "#7dbc96" },
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
    if (this.$store.state.upperRange === null) {
      await this.$store.dispatch("getGeohashRange");
    }
    if (this.$store.state.types === null) {
      await this.$store.dispatch("fetchReviewTypes");
    }
    this.userLocation = this.$store.getters.getUserLocation;

    var i,
      currentTypes = this.$store.getters.getTypes;

    for (i = 0; i < currentTypes.length; i++) {
      await this.$store
        .dispatch("findNearbyPlaces", currentTypes[i].name)
        .then(() => {
          currentTypes[i].places = this.$store.getters.getPlaces;
        });
    }
    this.types = currentTypes;

    this.isLoadingTypes = false;
  },
  methods: {
    getUserLocation() {
      this.$store.dispatch("fetchUserLocation");
    },
    async displayTypeOfPlaces(type) {
      await this.$store.dispatch("findNearbyPlaces", type).then(() => {
        this.printResults(this.$store.getters.getPlaces);
      });
      return;
    },
    async printResults(results) {
      this.places.push(results);
    },
    onScroll(e) {
      this.offsetLeft = e.target.scrollLeft;
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
