<template>
  <section id="placeHeader" class="place-header">
    <v-row no-gutters>
      <h3>{{ place.name }}</h3>
    </v-row>

    <v-row no-gutters>
      <v-card-text class="pa-0">
        {{ place.formatted_address }}
      </v-card-text>
    </v-row>

    <v-row no-gutters align="center" justify="start">
      <v-rating
        v-if="place.ratings.total > 0"
        v-model="place.ratings.general"
        background-color="yellow"
        color="yellow accent-4"
        length="5"
        dense
        half-increments
        hover
        size="18"
        readonly
        class="mb-1"
      ></v-rating>

      <v-rating
        v-else
        background-color="gray"
        color="gray accent-4"
        length="5"
        dense
        half-increments
        hover
        size="18"
        readonly
        class="mb-1"
      ></v-rating>

      <v-chip
        v-if="place.ratings.total > 0"
        small
        color="white"
        :ripple="false"
      >
        {{ place.ratings.total }} reviews
      </v-chip>

      <v-chip v-else small color="white" :ripple="false">
        0 reviews
      </v-chip>

      <v-divider vertical class="ma-2 hidden-sm-and-down">|</v-divider>

      <v-chip-group show-arrows class="px-0">
        <v-chip
          small
          color="white"
          :ripple="false"
          v-for="(type, index) in place.types"
          :key="index"
          @click="viewRegion(type)"
          >{{ type | replaceUnderscore }}</v-chip
        >
      </v-chip-group>
      <!-- <v-chip-group show-arrows class="px-0">
        <v-chip
          small
          color="white"
          v-for="(type, index) in place.types"
          :key="index"
          @click="findNearbyPlaces(type)"
          :value="type"
          >{{ type | replaceUnderscore }}</v-chip
        >
      </v-chip-group> -->
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "place-header",
  data() {
    return {
      region: {},
    };
  },
  props: {
    place: Object,
  },
  async created() {
    // find address component with locality and administrative_area_level_1 type
    var a,
      t,
      addressComponents = this.place.address_components;

    if (addressComponents) {
      var localityObj = findLocality();
      var stateObj = findState();
      var countryObj = findCountry();

      this.getPlacePredictions(
        localityObj.long_name +
          ", " +
          stateObj.long_name +
          ", " +
          countryObj.short_name +
          "A"
      );
    } else if (this.place.address.locality) {
      this.getPlacePredictions(
        this.place.address.locality +
          ", " +
          this.place.address.state +
          ", " +
          this.place.address.country +
          "A"
      );
    } else if (this.place.address.route) {
      this.getPlacePredictions(
        this.place.address.route +
          ", " +
          this.place.address.state +
          ", " +
          this.place.address.country +
          "A"
      );
    }

    function findLocality() {
      for (a = 0; a < addressComponents.length; a++) {
        for (t = 0; t < addressComponents[a].types.length; t++) {
          if (addressComponents[a].types[t] == "locality") {
            return addressComponents[a];
          }
        }
      }
    }

    function findState() {
      for (a = 0; a < addressComponents.length; a++) {
        for (t = 0; t < addressComponents[a].types.length; t++) {
          if (addressComponents[a].types[t] == "administrative_area_level_1") {
            return addressComponents[a];
          }
        }
      }
    }

    function findCountry() {
      for (a = 0; a < addressComponents.length; a++) {
        for (t = 0; t < addressComponents[a].types.length; t++) {
          if (addressComponents[a].types[t] == "country") {
            return addressComponents[a];
          }
        }
      }
    }
  },
  methods: {
    async findNearbyPlaces(type) {
      await this.$store.dispatch("findNearbyPlaces", type);
      this.$router.push({
        name: "nearby-places-type",
        params: { id: this.place.place_id, name: type },
      });
    },

    viewRegion(type) {
      this.$router.push({
        name: "nearby-places-type",
        params: { id: this.region.place_id, type: type },
      });
    },

    // Get place predictions
    getPlacePredictions(search) {
      var autocompleteService = new google.maps.places.AutocompleteService();

      autocompleteService.getPlacePredictions(
        {
          input: search,
          types: this.types,
          componentRestrictions: { country: "us" },
        },
        this.callback
      );
    },

    // Place search callback
    callback(predictions, status) {
      // Empty entries container
      this.entries = [];

      // Place service status error
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        this.entries.push({
          description: "Your search returned no result. Status: " + status,
        });
      }

      // Build output for each prediction
      for (var i = 0, prediction; (prediction = predictions[i]); i++) {
        // Insert output in results container
        this.entries.push(prediction);
      }

      var items = document.getElementsByClassName("pac-item");

      // Results items click
      for (var i = 0, item; (item = items[i]); i++) {
        item.onclick = function() {
          if (this.dataset.placeid) {
            getPlaceDetails(this.dataset.placeid);
          }
        };
      }
      this.region = this.entries[0];
    },
  },
  filters: {
    replaceUnderscore(val) {
      var i,
        frags = val.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    },
  },
};
</script>
