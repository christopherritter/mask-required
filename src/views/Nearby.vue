<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <h1>{{ $route.params.name | replaceUnderscore }} Reviews</h1>
          <!-- <p>{{ $route.params.location }}</p>
          <p>{{ $route.params.type }}</p> -->
        </v-col>
      </v-row>
      <v-row v-for="place in places" :key="place.place_id">
        <v-col>
          <v-card>
            <v-container class="pa-0">
              <v-row no-gutters style="flex-wrap: nowrap;">
                <v-col
                  @click="viewPlace(place)"
                  cols="1"
                  style="min-width: 125px; cursor: pointer"
                  class="grey lighten-3 flex-grow-0 flex-shrink-0 mr-5"
                >
                  <v-img
                    :src="place.icon"
                    class="rounded-l d-flex justify-center"
                    style="margin: 55px auto;"
                    height="50"
                    width="50"
                  ></v-img>
                  <!-- <v-card
                    color="grey lighten-3"
                    class="rounded-l d-flex justify-center"
                    flat
                    height="200"
                    width="200"
                  >
                    <v-icon size="70" color="grey lighten-1"
                      >mdi-image-off-outline</v-icon
                    >
                  </v-card> -->
                </v-col>
                <v-col
                  cols="1"
                  style="min-width: 100px; max-width: 100%;"
                  class="flex-grow-1 flex-shrink-0"
                >
                  <v-row>
                    <v-card-title class="pa-3">{{ place.name }}</v-card-title>
                    <v-card-text class="pa-3">{{
                      place.formatted_address
                    }}</v-card-text>
                    <v-card-text class="pa-3">
                      <v-chip-group
                        show-arrows
                        v-model="type"
                      >
                        <v-chip
                          v-for="(t, index) in place.types"
                          :key="index"
                          @click="findNearbyPlaces(t)"
                          :value="t"
                          >{{ t | replaceUnderscore }}</v-chip
                        >
                      </v-chip-group>
                    </v-card-text>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import geohash from "ngeohash";
import * as fb from "../firebase";
import { mapState } from "vuex";

export default {
  name: "Nearby",
  data() {
    return {
      places: [],
      address: "",
      error: "",
      spinner: false,
      selected: "",
      type: "",
    };
  },
  async created() {
    if (this.$store.state.userLocation.lat === null) {
      await this.$store.dispatch("fetchUserLocation");
    }
    if (this.$store.state.upperRange === null) {
      await this.$store.dispatch("getGeohashRange");
    }
    if (this.$store.state.places === null) {
      var currentType = this.$route.params.name;
      await this.$store.dispatch("findNearbyPlaces", currentType);
    }
    this.places = this.$store.getters.getPlaces;
    this.$store.dispatch("showSearchBar", true);
  },
  computed: {
    ...mapState([["validTypes"], ["reviews"]]),
  },
  methods: {
    async findNearbyPlaces(type) {
      await this.$store.dispatch("findNearbyPlaces", type);
      this.$router.push(type);
      this.type = type;
      this.places = this.$store.getters.getPlaces;
    },
    viewPlace(place) {
      this.$store.dispatch("fetchPlace", place);
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
