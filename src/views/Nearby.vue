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
                  @click="selectPlace(place)"
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
                    <v-card-text class="pa-3">{{ place.vicinity }}</v-card-text>
                    <v-card-text class="pa-3">
                      <v-chip-group
                        show-arrows
                        v-model="type"
                        mandatory
                        active-class="light-blue--text darken-2 text--accent-4"
                      >
                        <v-chip
                          v-for="type in filteredTypes(place.types)"
                          :key="type.index"
                          :value="type"
                          @click="$router.push(type)"
                          >{{ type | replaceUnderscore }}</v-chip
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
      validTypes: [
        "accounting",
        "airport",
        "amusement_park",
        "aquarium",
        "art_gallery",
        "atm",
        "bakery",
        "bank",
        "bar",
        "beauty_salon",
        "bicycle_store",
        "book_store",
        "bowling_alley",
        "bus_station",
        "cafe",
        "campground",
        "car_dealer",
        "car_rental",
        "car_repair",
        "car_wash",
        "casino",
        "cemetery",
        "church",
        "city_hall",
        "clothing_store",
        "convenience_store",
        "courthouse",
        "dentist",
        "department_store",
        "doctor",
        "drugstore",
        "electrician",
        "electronics_store",
        "embassy",
        "fire_station",
        "florist",
        "funeral_home",
        "furniture_store",
        "gas_station",
        "gym",
        "hair_care",
        "hardware_store",
        "hindu_temple",
        "home_goods_store",
        "hospital",
        "insurance_agency",
        "jewelry_store",
        "laundry",
        "lawyer",
        "library",
        "light_rail_station",
        "liquor_store",
        "local_government_office",
        "locksmith",
        "lodging",
        "meal_delivery",
        "meal_takeaway",
        "mosque",
        "movie_rental",
        "movie_theater",
        "moving_company",
        "museum",
        "night_club",
        "painter",
        "park",
        "parking",
        "pet_store",
        "pharmacy",
        "physiotherapist",
        "plumber",
        "police",
        "post_office",
        "primary_school",
        "real_estate_agency",
        "restaurant",
        "roofing_contractor",
        "rv_park",
        "school",
        "secondary_school",
        "shoe_store",
        "shopping_mall",
        "spa",
        "stadium",
        "storage",
        "store",
        "subway_station",
        "supermarket",
        "synagogue",
        "taxi_stand",
        "tourist_attraction",
        "train_station",
        "transit_station",
        "travel_agency",
        "university",
        "veterinary_care",
        "zoo",
      ],
      selected: "",
      fields: [
        "business_status",
        "formatted_address",
        "geometry",
        "icon",
        "name",
        "photos",
        "place_id",
        "plus_code",
        "types",
      ],
    };
  },
  created() {
    this.findNearbyPlaces();
  },
  computed: {
    ...mapState([["reviews"]]),
  },
  watch: {
    $route(to, from) {
      this.findNearbyPlaces();
      this.type = this.formattedType();
    },
  },
  methods: {
    selectPlace(place) {
      this.$store.dispatch("selectPlace", place);
      this.$router.push({ name: "place" });
    },
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
    filteredTypes(types) {
      let filteredTypes = [];

      for (let t = 0; t < types.length; t++) {
        if (this.validTypes.includes(types[t])) {
          filteredTypes.push(types[t]);
        }
      }

      return filteredTypes;
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
