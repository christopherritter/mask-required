<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <h1>Nearby {{ $route.params.name | replaceUnderscore }}</h1>
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
                  cols="1"
                  style="min-width: 200px;"
                  class="flex-grow-0 flex-shrink-0 mr-4"
                  v-if="place.photos"
                >
                  <v-img
                    height="200"
                    width="200"
                    class="rounded-l"
                    :src="
                      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                    "
                  ></v-img>
                </v-col>
                <v-col
                  v-else
                  cols="1"
                  style="min-width: 200px;"
                  class="flex-grow-0 flex-shrink-0 mr-4"
                >
                  <v-card
                    color="grey lighten-3"
                    class="rounded-l d-flex justify-center"
                    flat
                    height="200"
                    width="200"
                  >
                    <v-icon size="70" color="grey lighten-1"
                      >mdi-image-off-outline</v-icon
                    >
                  </v-card>
                </v-col>
                <v-col
                  cols="1"
                  style="min-width: 100px; max-width: 100%;"
                  class="flex-grow-1 flex-shrink-0"
                >
                  <v-row>
                    <v-card-title class="pa-3">{{ place.name }}</v-card-title>
                    <v-card-text class="pa-3">{{ place.vicinity }}</v-card-text>
                    <v-card-text class="pa-3">
                      <v-chip-group
                        active-class="deep-purple--text text--accent-4"
                      >
                        <v-chip v-for="type in place.types" :key="type.index">{{
                          type
                        }}</v-chip>
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
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Nearby",
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      apiKey: "AIzaSyA56PC1wQBFfmGzANdum2uGNSJW4TIn6xU",
      lat: 39.55228,
      lng: -84.23327,
      type: this.formattedType(),
      places: [],
    };
  },
  created() {
    this.findNearbyPlaces();
  },
  computed: {
    ...mapState([["reviews"]]),
  },
  methods: {
    findNearbyPlaces() {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.lat},${this.lng}&type=${this.type}&radius=4800&key=${this.apiKey}`;

      axios
        .get(URL)
        .then((response) => {
          this.places = response.data.results;
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    formattedType() {
      var type = this.$route.params.name.toLowerCase();
      type = type.replace(" ", "_");
      return type;
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
