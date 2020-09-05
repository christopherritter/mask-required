<template>
  <v-container>
    <v-row>
      <v-col class="pt-12 mt-12">
        <v-card color="teal darken-2" dark>
          <v-card-title class="headline teal darken-3">
            Search for Public APIs
          </v-card-title>
          <v-card-text>
            Explore hundreds of free API's ready for consumption! For more
            information visit
            <a
              class="grey--text text--lighten-3"
              href="https://github.com/toddmotto/public-apis"
              target="_blank"
              >the Github repository</a
            >.
          </v-card-text>
          <v-card-text>
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              color="white"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="PlaceId"
              label="Public APIs"
              placeholder="Start typing to Search"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list v-if="model" class="red lighten-3">
              <v-list-item v-for="(field, i) in fields" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="field.value"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="field.key"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expand-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!model"
              color="grey darken-3"
              @click="model = null"
            >
              Clear
              <v-icon right>mdi-close-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      // Items have already been loaded
      // if (this.items.length > 0) return;
      

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      if (!this.search) {
        this.isLoading = false;
        return
      }

      this.getPlacePredictions(this.search);


      // // Lazily load input items
      // fetch("https://api.publicapis.org/entries")
      //   .then((res) => res.json())
      //   .then((res) => {
      //     const { count, entries } = res;
      //     this.count = count;
      //     this.entries = entries;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => (this.isLoading = false));
    },
    model( newVal, oldVal) {
      this.$router.push({ name: 'nearby-places', params: { id: newVal.place_id }})
    }
  },

  methods: {
    // Get place predictions
    getPlacePredictions(search) {
      var autocompleteService = new google.maps.places.AutocompleteService();

      this.entries = [];

      autocompleteService.getPlacePredictions(
        {
          input: search,
          types: ["establishment", "geocode"],
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
      // Empty results container
      // this.results.innerHTML = "";

      // Place service status error
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        this.entries.push({
          description: "Your search returned no result. Status: " + status,
        });
        // this.results.innerHTML =
        //   '<div class="pac-item pac-item-error">Your search returned no result. Status: ' +
        //   status +
        //   "</div>";
        // return;
      }

      // Build output with custom addresses
      // this.results.innerHTML +=
      //   '<div class="pac-item custom"><span class="pac-icon pac-icon-marker"></span>My home address</div>';
      // this.results.innerHTML +=
      //   '<div class="pac-item custom"><span class="pac-icon pac-icon-marker"></span>My work address</div>';

      // Build output for each prediction
      for (var i = 0, prediction; (prediction = predictions[i]); i++) {
        // Insert output in results container

        // this.results.innerHTML +=
        //   '<div class="pac-item" data-placeid="' +
        //   prediction.place_id +
        //   '" data-name="' +
        //   prediction.terms[0].value +
        //   '"><span class="pac-icon pac-icon-marker"></span>' +
        //   prediction.description +
        //   "</div>";
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
