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
                  class="grey lighten-3 flex-grow-0 flex-shrink-0 mr-5 hidden-sm-and-down"
                >
                  <v-img
                    :src="place.icon"
                    class="rounded-l d-flex justify-center"
                    style="margin: 55px auto;"
                    height="50"
                    width="50"
                  ></v-img>
                </v-col>
                <v-col
                  cols="1"
                  style="min-width: 100px; max-width: 100%;"
                  class="flex-grow-1 flex-shrink-0"
                >
                  <v-row>
                    <v-col class="flex-grow-1 flex-shrink-0">
                      <v-row>
                        <v-card-title class="pa-3">{{
                          place.name
                        }}</v-card-title>
                      </v-row>
                      <v-row
                        v-if="place.ratings"
                        align="center"
                        justify="start"
                      >
                        <v-rating
                          :value="place.ratings.general"
                          background-color="yellow"
                          color="yellow accent-4"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 ml-2"
                        ></v-rating>

                        <span class="ml-2" v-if="place.reviews.length >= 2">
                          ({{ place.reviews.length }} Reviews)
                        </span>
                        <span class="ml-2" v-else>
                          ({{ place.reviews.length }} Review)
                        </span>
                      </v-row>
                      <v-row v-else align="center" justify="start">
                        <v-rating
                          disabled
                          background-color="yellow"
                          color="yellow accent-4"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 ml-2"
                        ></v-rating>

                        <span class="ml-2">(0 Reviews)</span>
                      </v-row>
                      <v-row>
                        <v-card-text class="pa-3">{{
                          place.formatted_address
                        }}</v-card-text>
                      </v-row>
                    </v-col>
                    <v-col class="flex-grow-0 flex-shrink-0" v-if="place.ratings">
                      <v-row class="d-flex flex-nowrap">
                        Compliance
                        <v-rating
                          :value="place.ratings.compliance"
                          background-color="yellow"
                          color="yellow accent-4"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 mx-2"
                        ></v-rating>
                      </v-row>
                      <v-row class="d-flex flex-nowrap">
                        Notifications
                        <v-rating
                          :value="place.ratings.notifications"
                          background-color="yellow"
                          color="yellow accent-4"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 mx-2"
                        ></v-rating>
                      </v-row>
                      <v-row class="d-flex flex-nowrap">
                        Enforcement
                        <v-rating
                          :value="place.ratings.enforcement"
                          background-color="yellow"
                          color="yellow accent-4"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 mx-2"
                        ></v-rating>
                      </v-row>
                    </v-col>
                    <v-col class="flex-grow-0 flex-shrink-0" v-else>
                      <v-row class="d-flex flex-nowrap" justify="end">
                        Compliance
                        <v-rating
                          disabled
                          background-color="gray"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 mx-2"
                        ></v-rating>
                      </v-row>
                      <v-row class="d-flex flex-nowrap" justify="end">
                        Notifications
                        <v-rating
                          disabled
                          background-color="gray"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 mx-2"
                        ></v-rating>
                      </v-row>
                      <v-row class="d-flex flex-nowrap" justify="end">
                        Enforcement
                        <v-rating
                          disabled
                          background-color="gray"
                          length="5"
                          dense
                          half-increments
                          hover
                          size="18"
                          readonly
                          class="mb-1 mx-2"
                        ></v-rating>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row v-if="place.types" no-gutters>
                    <v-chip-group show-arrows v-model="type">
                      <v-chip
                        medium
                        color="gray"
                        class="lighten-3"
                        v-for="(t, index) in place.types"
                        :key="index"
                        @click="findNearbyPlaces(t)"
                        :value="t"
                        >{{ t | replaceUnderscore }}</v-chip
                      >
                    </v-chip-group>
                  </v-row>
                  <v-row v-if="place.reviews">
                    <v-col>
                      <h6>Reviews</h6>
                    </v-col>
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
    this.$store.dispatch("showSearchBar", true);
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
    for (let p = 0; p < this.places.length; p++) {
      var placeId = this.places[p].place_id;
      this.$store.dispatch("fetchReviews", placeId).then((reviews) => {
        if (reviews) {
          this.places[p].reviews = reviews.reviews;
          this.places[p].ratings = {};
          this.places[p].ratings.general = reviews.rating;
          this.places[p].ratings.compliance = reviews.compliance;
          this.places[p].ratings.notifications = reviews.notifications;
          this.places[p].ratings.enforcement = reviews.enforcement;
        }
      });
    }
  },
  computed: {
    ...mapState([["validTypes"]]),
  },
  methods: {
    async findNearbyPlaces(type) {
      await this.$store.dispatch("findNearbyPlaces", type);
      this.$router.push(type);
      this.type = type;
      this.places = this.$store.getters.getPlaces;
    },
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push({ name: "place", params: { id: place.place_id } });
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
