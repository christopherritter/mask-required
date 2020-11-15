<template>
  <v-autocomplete
    v-model="model"
    :value="search"
    item-text="Description"
    item-value="PlaceId"
    :type="type"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    clear-icon="mdi-close-box"
    clearable
    :dense="dense"
    :outlined="outlined"
    :background-color="backgroundColor"
    :hide-details="hideDetails"
    :label="label"
    :placeholder="placeholder"
    :prepend-icon="prependIcon"
    return-object
    :solo="solo"
    :hide-selected="hideSelected"
    hide-no-data
    append-icon=""
    :append-outer-icon="appendOuterIcon"
    :prepend-inner-icon="prependInnerIcon"
    :flat="flat"
    :solo-inverted="soloInverted"
    @click:append-outer="getUserLocation"
  ></v-autocomplete>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    results: {},
    model: null,
    search: null,
    error: "",
    spinner: false,
  }),
  props: [
    "dense",
    "outlined",
    "backgroundColor",
    "hideDetails",
    "label",
    "placeholder",
    "prependIcon",
    "hideSelected",
    "appendIcon",
    "type",
    "types",
    "solo",
    "prependInnerIcon",
    "flat",
    "soloInverted",
    "appendOuterIcon",
  ],
  computed: {
    ...mapState(["userLocation", "loading"]),
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.description.length > this.descriptionLimit
            ? entry.description.slice(0, this.descriptionLimit) + "..."
            : entry.description;
        const PlaceId = entry.place_id;

        return Object.assign({}, entry, { Description, PlaceId });
      });
    },
  },
  watch: {
    search(val) {
      // Items have already been requested
      if (this.$store.getters.getLoading) return;

      // this.$store.dispatch("isLoading", true);

      // if (!this.search) {
      //   this.$store.dispatch("isLoading", false);
      //   return;
      // }

      this.getPlacePredictions(this.search);
    },
    model(newVal, oldVal) {
      if (newVal) {
        var isGeocode = newVal.types.includes("geocode");
        var isEstablishment = newVal.types.includes("establishment");

        if (isGeocode && this.type) {
          this.$store.dispatch("isLoading", true)
          this.$router.push({
            name: "nearby-places-type",
            params: { id: newVal.place_id, type: this.type },
          });
        } else {
          if (isGeocode) {
            this.$store.dispatch("isLoading", true)
            this.$router.push({
              name: "nearby-places",
              params: { id: newVal.place_id },
            });
          } else if (isEstablishment) {
            this.$store.dispatch("isLoading", true)
            this.$router.push({
              name: "place",
              params: { id: newVal.place_id },
            });
          }
        }
      } else {
        this.model = null;
        this.entries = [];
      }
    },
  },
  methods: {
    // Get user location
    getUserLocation() {
      this.spinner = true;
      if (!this.userLocation.lat) {
        // console.log("Fetching user location.");
        this.$store.dispatch("fetchUserLocation");
      } else {
        // console.log("Forgetting user location.");
        this.$store.dispatch("clearUserLocation");
      }
      this.spinner = false;
    },

    // Get place predictions
    getPlacePredictions(search) {
      var autocompleteService = new google.maps.places.AutocompleteService();

      if (this.userLocation.lat) {
        autocompleteService.getPlacePredictions(
          {
            location: new google.maps.LatLng(
              this.userLocation.lat,
              this.userLocation.long
            ),
            radius: 500,
            input: search,
            types: this.types,
            componentRestrictions: { country: "us" },
          },
          this.callback
        );
      } else if (search) {
        autocompleteService.getPlacePredictions(
          {
            input: search,
            types: this.types,
            componentRestrictions: { country: "us" },
          },
          this.callback
        );
      }
    },

    // Get place details
    getPlaceDetails(placeId) {
      var request = {
        placeId: placeId,
      };

      placesService.getDetails(request, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var center = place.geometry.location;
          var marker = new google.maps.Marker({
            position: center,
            map: map,
          });

          map.setCenter(center);

          // Hide autocomplete results
          results.style.display = "none";
        }
      });
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

      this.$store.dispatch("isLoading", false);
    },
  },
};
</script>
