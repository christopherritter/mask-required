<template>
  <v-autocomplete
    v-model="model"
    :value="search"
    item-text="Description"
    item-value="PlaceId"
    :items="items"
    :loading="isLoading"
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
    :append-icon="appendIcon"
    :prepend-inner-icon="prependInnerIcon"
    :flat="flat"
    :solo-inverted="soloInverted"
  ></v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    results: {},
    isLoading: false,
    model: null,
    search: null,
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
    "types",
    "solo",
    "prependInnerIcon",
    "flat",
    "soloInverted",
  ],
  computed: {
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
      if (this.isLoading) return;

      this.isLoading = true;

      if (!this.search) {
        this.isLoading = false;
        return;
      }

      this.getPlacePredictions(this.search);
    },
    model(newVal, oldVal) {
      if (newVal) {
        var isGeocode = newVal.types.includes("geocode");
        var isEstablishment = newVal.types.includes("establishment");

        if (isGeocode) {
          this.$router.push({
            name: "nearby-places",
            params: { id: newVal.place_id },
          });
        } else if (isEstablishment) {
          this.$router.push({
            name: "place",
            params: { id: newVal.place_id },
          });
        }
      } else {
        this.model = null;
        this.entries = [];
      }
    },
  },

  methods: {
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

      var items = document.getElementsByClassName("pac-item");

      // Results items click
      for (var i = 0, item; (item = items[i]); i++) {
        item.onclick = function() {
          if (this.dataset.placeid) {
            getPlaceDetails(this.dataset.placeid);
          }
        };
      }
      this.isLoading = false;
    },
  },
};
</script>
