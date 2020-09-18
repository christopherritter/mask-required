<template>
  <v-main>
    <v-container class="py-0">
      <v-row v-if="loading">
        <v-col>
          <v-skeleton-loader
            width="650"
            height="50"
            type="heading"
            class="mt-8"
          ></v-skeleton-loader>
          <v-skeleton-loader
            width="350"
            height="40"
            type="heading"
            class="my-1"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <h1 style="line-height:4rem" class="mt-8">{{ region.name }}</h1>
          <h4 class="font-weight-medium mb-1">
            {{ region.formatted_address }}
          </h4>
        </v-col>
      </v-row>
      <v-row v-if="loading" class="d-flex flex-row pb-4">
        <v-skeleton-loader
          width="115"
          height="45"
          type="chip"
          class="pl-3"
        ></v-skeleton-loader>
        <v-skeleton-loader
          width="115"
          height="45"
          type="chip"
          class="pl-3"
        ></v-skeleton-loader>
        <v-skeleton-loader
          width="115"
          height="45"
          type="chip"
          class="pl-3"
        ></v-skeleton-loader>
      </v-row>
      <v-row v-else>
        <v-chip-group
          show-arrows
          class="px-0"
          mandatory
          active-class="teal--text"
        >
          <v-chip
            color="white"
            value="view_all"
            @click="
              $router.push({
                name: 'nearby-places',
                params: { id: region.place_id },
              })
            "
            >View All</v-chip
          >
          <v-chip
            color="white"
            v-for="(type, index) in sortedPlaces"
            :key="index"
            @click="filterByType(type)"
            :value="type.name"
            >{{ type.name | replaceUnderscore }}</v-chip
          >
        </v-chip-group>
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
        v-for="(type, index) in typesToDisplay"
        v-bind:key="index"
        class="place-types"
      >
        <v-col cols="12">
          <h3>{{ type.name | replaceUnderscore }} reviews</h3>
        </v-col>

        <v-col cols="12">
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
                  {{ place.name | truncateWithEllipse(18) }}
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
                  class="pt-2 hidden-sm-and-down"
                  :class="{
                    'white--text': highlightedCard == index + place.place_id,
                  }"
                >
                  &ldquo;{{ place.reviews[0].title }}&rdquo;
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
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
            <vg-autocomplete
              class="px-10 pt-2 pb-14"
              id="find-location-autocomplete"
              :outlined="true"
              :label="'City, state, or zip code.'"
              :placeholder="''"
              :types="locationOptions.types"
            ></vg-autocomplete>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined color="#c5f9da">
            <h3 class="mt-12 text-center">Create your own review.</h3>
            <vg-autocomplete
              class="px-10 pt-2 pb-16"
              id="find-place-autocomplete"
              :solo="true"
              :label="'Business name or category'"
              :placeholder="''"
              :types="placeOptions.types"
            ></vg-autocomplete>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import VgAutocomplete from "@/components/util/VgAutocomplete";

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
      type: "view_all",
      types: [],
      region: {},
      sortedPlaces: [],
      loading: true,
      empty: false,
      error: "",
      showLessTypes: false,
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
      placeOptions: {
        types: ["establishment"],
        componentRestrictions: { country: "us" },
        fields: [
          // "formatted_address",
          // "geometry",
          // "name",
          "place_id",
          // "types",
        ],
      },
      locationOptions: {
        types: ["(regions)"],
        componentRestrictions: { country: "us" },
        fields: [
          // "formatted_address",
          // "geometry",
          // "name",
          "place_id",
          // "types",
        ],
      },
    };
  },
  async created() {
    var routerId = this.$router.currentRoute.params.id;
    // var routerType = this.$router.currentRoute.params.type;

    await this.setRegion(routerId);

    // if (routerType) {
    //   this.type = routerType;
    //   this.showLessTypes = true;
    // }

    if (this.region.place_id != routerId) {
      await this.$store.dispatch("clearPlaces");
    }

    await this.viewLocalPlaces();
    this.loading = false;
  },
  watch: {
    async $route(to, from) {
      var routerId = this.$router.currentRoute.params.id;

      this.loading = true;

      if (to.params.id == from.params.id) {
        if (!to.params.type) {
          this.type = "view_all";
        } else {
          this.type = to.params.type;
        }
      } else {
        this.type = null;
        await this.$store.dispatch("clearPlaces");
        this.sortedPlaces = [];
        this.viewLocalPlaces();
      }

      this.loading = false;
    },
  },
  computed: {
    typesToDisplay: function() {
      if (this.showLessTypes) {
        var lessTypes = [];
        for (let i = 0; i < this.sortedPlaces.length; i++) {
          if (this.sortedPlaces[i].name == this.type) {
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
    async setRegion(routerId) {
      await this.$store.dispatch("fetchRegion", {
        place_id: routerId,
      });
      this.region = this.$store.getters.getRegion;
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
      await this.$store.dispatch("countReviewTypes");
      await this.sortPlacesIntoTypes();
      return;
    },
    async filterByType(type) {
      this.$router.push({
        name: "nearby-places-type",
        params: { id: this.region.place_id, type: type.name },
      });
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
  components: {
    VgAutocomplete,
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
