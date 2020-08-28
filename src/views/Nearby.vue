<template>
  <v-main>
    <v-container class="py-0">
      <v-row>
        <v-col>
          <h1>{{ region.name }} Reviews</h1>
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
      <div
        v-else
        v-for="(type, index) in typesToDisplay"
        v-bind:key="index"
        class="place-types"
      >
        <h3>{{ type.name | replaceUnderscore }} reviews</h3>

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
      </div>
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
      error: "",
      showLessTypes: true,
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
    };
  },
  async created() {
    var placeId = this.$route.params.id;
    var routerId = this.$router.currentRoute.params.id;

    this.$store.dispatch("showSearchBar", true);

    // console.log("Fetching region.");
    await this.$store.dispatch("fetchRegion", {
      place_id: placeId,
    });
    this.region = this.$store.getters.getRegion;

    // console.log("Waiting for geohash range.");
    await this.$store.dispatch("getGeohashRange");

    // console.log("Waiting for local places.");
    await this.$store.dispatch("findLocalPlaces");

    // if (this.$store.state.types === null) {
    await this.$store.dispatch("fetchReviewTypes");
    // }

    // console.log("Generating types.");
    await this.sortPlacesIntoTypes();

    // this.region = this.$store.getters.getRegion;
    // this.types = this.$store.getters.getTypes;
    // this.places = this.$store.getters.getPlaces;
    this.loading = false;
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
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push({ name: "place", params: { id: place.place_id } });
    },
    async sortPlacesIntoTypes() {
      var p, t;
      const currentPlaces = this.$store.getters.getPlaces;
      const currentTypes = this.$store.getters.getTypes;
      var sortedPlaces = [];

      // console.log("Here are the places we're categorizing:");
      // console.log(currentPlaces);
      // console.lo

      for (t = 0; t < currentTypes.length; t++) {
        var newType = currentTypes[t];
        newType.places = [];
        console.log("Here's the new type:");
        console.log(newType)

        for (p = 0; p < currentPlaces.length; p++) {
          if ( currentPlaces[p].types.indexOf(currentTypes[t].name) > -1 ) {
            newType.places.push(currentPlaces[p]);
          }
        }

        // for (p = 0; p < currentPlaces.length; p++) {
        //   console.log("Place IDs: " + currentTypes[t].name, newType.name);
        //   if (
        //     newType.places.filter(
        //       (place) => place.name === currentPlaces[p].name
        //     )
        //   ) {
        //     console.log("We already got one!");
        //   } else {
        //     newType.places.push(currentPlaces[p]);
        //   }
        // }
        sortedPlaces.push(newType);
      }

      // for (p = 0; p < currentPlaces.length; p++) {
      //   console.log("Here is the place: ");
      //   console.log(currentPlaces[p]);
      //   for (t = 0; t < currentTypes.length; t++) {
      //     var newType = currentTypes[t];
      //     newType.places = [];

      //     console.log("Here is the new type:")
      //     console.log(newType);

      //     if ( newType.places.filter(place => place.place_id === currentPlaces[p].place_id) ) {
      //       console.log("We already got one!")
      //     } else {
      //       newType.places.push(currentPlaces[p]);
      //     }

      //   }
      // }

      // for (p = 0; p < currentPlaces.length; p++) {
      //   console.log("Here is the place: ");
      //   console.log(currentPlaces[p]);
      //   for (t = 0; t < currentPlaces[p].types.length; t++) {
      //     console.log(currentPlaces[p].types[t]);
      //     // if (currentPlaces[p].types.indexOf(currentPlaces[p].types[t])) {
      //     //   return;
      //     // }
      //     console.log("Pushing place type: " + currentPlaces[p].types[t]);
      //     sortedPlaces.push(currentPlaces[p].types[t]);
      //   }
      // }

      this.sortedPlaces = sortedPlaces;

      // await this.$store.dispatch("findLocalPlaces").then(() => {
      //   var currentPlaces = this.$store.getters.getPlaces;
      //   var currentTypes = this.$store.getters.getTypes;

      //   console.log("Sorting local places.");
      //   console.log(currentPlaces);
      //   console.log(currentPlaces.length);
      //   console.log(currentTypes)
      //   console.log(currentTypes.length);

      //   for (let p = 0; p < currentPlaces.length; p++) {
      //     console.log("Here's the list of places:");
      //     console.log(currentPlaces);
      //     for (let t = 0; t < currentTypes.length; t++) {
      //       console.log("Checking place for " + currentTypes[t].name);
      //       if (currentPlaces[p].types.includes(currentTypes[t].name)) {
      //         currentTypes.places.push(places[p]);
      //       }
      //     }
      //   }
      // });

      // for (i = 0; i < currentTypes.length; i++) {
      //   await this.$store
      //     .dispatch("findNearbyPlaces", currentTypes[i].name)
      //     .then(() => {
      //       if (currentTypes[i].counter > 2)
      //         currentTypes[i].places = this.$store.getters.getPlaces;
      //     });
      // }
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
