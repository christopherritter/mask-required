<template>
  <section id="popular-places-section">
    <v-row>
      <v-col class="d-flex align-center flex-grow-1 flex-shrink-1">
        <v-divider class="mb-1"></v-divider>
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0">
        <h3 class="text-center">
          Popular {{ (type.name + "s") | replaceUnderscore }}
        </h3>
      </v-col>
      <v-col class="d-flex align-center flex-grow-1 flex-shrink-1">
        <v-divider class="mb-1"></v-divider>
      </v-col>
    </v-row>
    <v-row v-if="placesExist">
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="3"
        class="hidden-sm-and-down"
        style="font-size: 1.25rem"
      >
        <p>
          Here are some {{ (type.name + "s") | replaceUnderscore }} that people
          are currently searching for.
        </p>
        <p>
          Select a card to leave a review if you are familar with any of these
          places.
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="9">
        <v-row v-if="loading">
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="200" outlined>
              <v-skeleton-loader
                type="article"
                class="mt-2"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="200" outlined>
              <v-skeleton-loader
                type="article"
                class="mt-2"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="200" outlined>
              <v-skeleton-loader
                type="article"
                class="mt-2"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="200" outlined>
              <v-skeleton-loader
                type="article"
                class="mt-2"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="200" outlined>
              <v-skeleton-loader
                type="article"
                class="mt-2"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="200" outlined>
              <v-skeleton-loader
                type="article"
                class="mt-2"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="4"
            v-for="place in placesToDisplay"
            :key="place.place_id"
          >
            <v-card
              height="200"
              outlined
              @mouseover.native="highlightedCard = place.place_id"
              @mouseleave.native="highlightedCard = null"
              :style="styleObject"
              :class="{
                'teal white--text': highlightedCard == place.place_id,
              }"
              style="cursor: pointer"
              @click="viewPlace(place)"
            >
              <v-card-title
                :class="{
                  'white--text': highlightedCard == place.place_id,
                }"
              >
                {{ place.name | truncateWithEllipse(24) }}
              </v-card-title>
              <v-card-subtitle
                class="pb-2"
                :class="{
                  'white--text': highlightedCard == place.place_id,
                }"
              >
                {{ place.formatted_address }}
              </v-card-subtitle>
              <div
                v-if="place.ratings && place.ratings.total > 0"
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
                  {{ place.ratings.total }} reviews
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
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "@/firebase";

export default {
  name: "popular-places-section",
  data() {
    return {
      type: {},
      places: [],
      showLessPlaces: true,
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
      placesExist: false,
      loading: true,
    };
  },
  async created() {
    var collectionSize = await fb.placesCollection
      .limit(1)
      .get()
      .then((query) => query.size);

    if (collectionSize) {
      this.placesExist = true;
    }

    if (this.$store.state.types === null) {
      // await this.$store.dispatch("countPlaceTypes");
    }

    var currentTypes = this.types;
    this.type = currentTypes[0];

    this.$store.dispatch("fetchPlaces", this.type.name).then((places) => {
      this.places = places;
      this.loading = false;
    });
    
  },
  methods: {
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      // this.$store.dispatch("isLoading", true);
      this.$router.push({ name: "place", params: { id: place.place_id } });
    },
  },
  props: {
    types: Array,
  },
  computed: {
    ...mapState(["userLocation"]),
    placesToDisplay: function() {
      var places = this.places;
      return places.slice(0, 6);
    },
  },
  // watch: {
  //   types(newVal, oldVal) {
  //     if (this.types.length > 0) {
  //       this.loading = false;
  //     }
  //   },
  // },
  filters: {
    replaceUnderscore(val) {
      var i,
        frags = val.split("_");
      for (i = 0; i < frags.length; i++) {
        if (frags[i] != "of" && frags[i] != "or") {
          frags[i] = frags[i].slice(0);
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
