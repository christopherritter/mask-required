<template>
  <v-main>
    <v-container class="py-0">
      <v-row v-if="loading">
        <v-col>
          <v-skeleton-loader
            width="650"
            height="75"
            type="heading"
            class="mt-6"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <h1>{{ region.name }}</h1>
        </v-col>
      </v-row>
      <div v-if="loading">
        <v-skeleton-loader
          width="450"
          height="50"
          type="heading"
        ></v-skeleton-loader>
        <v-row>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
        </v-row>
        <v-skeleton-loader
          width="450"
          height="50"
          class="mt-6"
          type="heading"
        ></v-skeleton-loader>
        <v-row>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              style="border: 1px solid rgba(0,0,0,0.17); border-radius: 4px"
              ><v-skeleton-loader
                height="200"
                type="card-heading, list-item-two-line, list-item-two-line"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      <v-row
        v-else
        v-for="(type, index) in sortedPlaces"
        v-bind:key="index"
        class="place-types"
      >
        <v-col cols="12">
          <h3>{{ type.name | replaceUnderscore }} reviews</h3>
        </v-col>

        <v-slide-group v-model="place" class="py-4" show-arrows>
          <v-slide-item
            v-for="place in type.places"
            v-bind:key="place.place_id"
          >
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
              @click="viewPlace(place)"
            >
              <v-card-title
                :class="{
                  'white--text': highlightedCard == index + place.place_id,
                }"
              >
                {{ place.name | truncateWithEllipse(20) }}
              </v-card-title>
              <v-card-subtitle
                class="pb-2"
                :class="{
                  'white--text': highlightedCard == index + place.place_id,
                }"
              >
                {{ place.formatted_address }}
              </v-card-subtitle>
              <div
                v-if="place.reviews && place.reviews.length > 0"
                class="d-flex flex-row"
              >
                <v-rating
                  v-model="place.ratings.general"
                  background-color="yellow"
                  color="yellow accent-4"
                  length="5"
                  dense
                  half-increments
                  hover
                  size="18"
                  readonly
                  class="ml-4 mb-1"
                ></v-rating>
                <span class="text-caption mt-1 ml-2">
                  {{ place.reviews.length }} reviews
                </span>
              </div>
              <div v-else class="d-flex flex-row">
                <v-rating
                  background-color="gray"
                  color="gray accent-4"
                  length="5"
                  dense
                  half-increments
                  hover
                  size="18"
                  readonly
                  class="ml-4 mb-1"
                ></v-rating>
                <span class="text-caption mt-1 ml-2">
                  0 reviews
                </span>
              </div>
              <v-card-text
                v-if="
                  place.reviews &&
                    place.reviews.length > 0 &&
                    place.reviews[0].title.length > 0
                "
                class="pt-2"
                :class="{
                  'white--text': highlightedCard == index + place.place_id,
                }"
              >
                &ldquo;{{ place.reviews[0].title }}&rdquo;
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-row>
      <v-row v-show="empty">
        <v-col>
          <h3>No reviews for that location.</h3>
        </v-col>
      </v-row>
      <v-row v-show="empty">
        <v-col>
          <v-card outlined>
            <h3 class="mt-12 text-center">Find another location.</h3>
            <v-text-field
              class="px-10 pt-2 pb-14"
              v-model="findLocationAddress"
              id="find-location-autocomplete"
              outlined
              hide-details
              label="City, state, or zip code."
              placeholder=""
            ></v-text-field>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined color="#c5f9da">
            <h3 class="mt-12 text-center">Create your own review.</h3>
            <v-text-field
              class="px-10 pt-2 pb-8"
              v-model="findPlaceAddress"
              id="find-place-autocomplete"
              solo
              label="Business name or category"
              placeholder=""
            ></v-text-field>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "nearby",
  data() {
    return {
      userLocation: {
        lat: null,
        long: null,
      },
      place: {},
      places: [],
      types: [],
      region: {},
      sortedPlaces: [],
      loading: true,
      empty: false,
      error: "",
      showLessTypes: true,
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
      findPlaceAddress: null,
      findLocationAddress: null,
      findPlaceOptions: {
        types: ["establishment"],
        componentRestrictions: { country: "us" },
        fields: ["place_id"],
      },
      findLocationOptions: {
        types: ["(regions)"],
        componentRestrictions: { country: "us" },
        fields: ["place_id"],
      },
    };
  },
  async created() {
    var routerId = this.$router.currentRoute.params.id;
    if (this.region.place_id != routerId) {
      this.$store.dispatch("clearPlaces");
      this.viewLocalPlaces();
    }
    this.loading = false;
  },
  watch: {
    async $route(to, from) {
      this.loading = true;
      if (to.params.id == from.params.id) {
        this.empty = false;
      } else {
        this.empty = false;
        this.$store.dispatch("clearPlaces");
        this.viewLocalPlaces();
      }
      this.loading = false;
    }
  },
  computed: {
    typesToDisplay: function() {
      if (this.showLessTypes) {
        var lessTypes = [];
        for (let i = 0; i < this.sortedPlaces.length; i++) {
          if (this.sortedPlaces[i].counter > 2) {
            lessTypes.push(this.sortedPlaces[i]);
          }
        }
        return lessTypes;
      } else {
        return this.sortedPlaces;
      }
    },
  },
  methods: {
    getUserLocation() {
      this.$store.dispatch("fetchUserLocation");
    },
    async viewLocalPlaces() {
      var placeId = this.$route.params.id;
      var routerId = this.$router.currentRoute.params.id;

      await this.$store.dispatch("fetchRegion", {
        place_id: placeId,
      });
      this.region = this.$store.getters.getRegion;

      await this.$store.dispatch("getGeohashRange");
      await this.$store.dispatch("findLocalPlaces");
      await this.$store.dispatch("fetchReviewTypes");
      await this.sortPlacesIntoTypes();
      return;
    },
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push({ name: "place", params: { id: place.place_id } });
    },
    async sortPlacesIntoTypes() {
      var p, t, s;
      const currentPlaces = this.$store.getters.getPlaces;
      var sortedPlaces = [];
      var sortedTypes = [];

      if (!currentPlaces) {
        this.empty = true;

        let findPlaceAutocomplete = new google.maps.places.Autocomplete(
          document.getElementById("find-place-autocomplete"),
          this.findPlaceOptions
        );

        let findLocationAutocomplete = new google.maps.places.Autocomplete(
          document.getElementById("find-location-autocomplete"),
          this.findLocationOptions
        );

        findPlaceAutocomplete.addListener("place_changed", () => {
          let place = findPlaceAutocomplete.getPlace();
          this.$router.push({ name: "place", params: { id: place.place_id } });
        });

        findLocationAutocomplete.addListener("place_changed", () => {
          var region = this.region;
          let place = findLocationAutocomplete.getPlace();
          
          if (place.place_id != region.place_id) {
            this.$router.push({ name: "nearby", params: { id: place.place_id } });
          }

        });

        this.$store.dispatch("showSearchBar", false);

        return;
      }

      this.$store.dispatch("showSearchBar", true);
      this.empty = false;

      for (p = 0; p < currentPlaces.length; p++) {
        var newPlace = currentPlaces[p];

        // create an updated list of types
        for (t = 0; t < newPlace.types.length; t++) {
          var newType = {
            name: newPlace.types[t],
            counter: 1,
            places: [],
          };

          if (
            sortedTypes.filter((type) => type.name === newType.name).length > 0
          ) {
            var pos = sortedTypes
              .map(function(e) {
                return e.name;
              })
              .indexOf(newType.name);
            sortedTypes[pos].counter = sortedTypes[pos].counter + 1;
          } else {
            sortedTypes.push(newType);
          }
        }
      }

      // sort the places into types
      for (s = 0; s < sortedTypes.length; s++) {
        var currentType = sortedTypes[s];

        for (p = 0; p < currentPlaces.length; p++) {
          var currentPlace = currentPlaces[p];

          if (currentPlace.types.includes(sortedTypes[s].name)) {
            sortedTypes[s].places.push(currentPlace);
          }
        }

        if (
          sortedPlaces.filter((type) => type.name === sortedTypes[s].name)
            .length > 0
        ) {
          console.log("Found something.");
        } else {
          sortedPlaces.push(sortedTypes[s]);
        }
      }

      this.sortedPlaces = sortedPlaces.sort(compareCounters);

      function compareCounters(a, b) {
        // Use toUpperCase() to ignore character casing
        const typeA = a.counter;
        const typeB = b.counter;

        let comparison = 0;
        if (typeA > typeB) {
          comparison = -1;
        } else if (typeA < typeB) {
          comparison = 1;
        }
        return comparison;
      }
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
    truncateWithEllipse(val, stringLength) {
      if (val.length > stringLength) {
        return val.slice(0, stringLength - 1) + "...";
      } else {
        return val;
      }
    },
  },
};
</script>
