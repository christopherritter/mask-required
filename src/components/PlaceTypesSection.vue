<template>
  <section>
    <h2 class="text-center">Recent reviews</h2>
    <p class="subtitle text-center" v-if="this.userLocation.lat">
      Read the latest reviews of local businesses and other nearby places.
    </p>
    <p class="subtitle text-center" v-else>
      Allow your browser to get your location in order to browse nearby places.
      <a
        href="javascript:"
        @click.prevent="getUserLocation"
        class="text-decoration-none"
        >Get your location.</a
      >
    </p>
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
        <v-slide-item v-for="place in type.places" v-bind:key="place.place_id">
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
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "place-types-section",
  data() {
    return {
      place: null,
      types: [],
      userLocation: {
        lat: null,
        long: null,
      },
      loading: true,
      showLessTypes: true,
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
    };
  },
  computed: {
    typesToDisplay: function() {
      if (this.showLessTypes) {
        var lessTypes = [];
        for (let i = 0; i < this.types.length; i++) {
          if (this.types[i].counter > 2) {
            lessTypes.push(this.types[i]);
          }
        }
        return lessTypes;
      } else {
        return this.types;
      }
    },
  },
  async created() {
    if (this.$store.state.userLocation.lat === null) {
      await this.$store.dispatch("fetchUserLocation");
    }
    if (this.$store.state.upperRange === null) {
      await this.$store.dispatch("getGeohashRange");
    }
    if (this.$store.state.types === null) {
      await this.$store.dispatch("fetchReviewTypes");
    }
    this.userLocation = this.$store.getters.getUserLocation;

    var i,
      currentTypes = this.$store.getters.getTypes;

    for (i = 0; i < currentTypes.length; i++) {
      await this.$store
        .dispatch("findNearbyPlaces", currentTypes[i].name)
        .then(() => {
          if (currentTypes[i].counter > 2)
          currentTypes[i].places = this.$store.getters.getPlaces;
        });
    }
    this.types = currentTypes;
    this.loading = false;
  },
  methods: {
    getUserLocation() {
      this.$store.dispatch("fetchUserLocation");
    },
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push({ name: "place", params: { id: place.place_id } });
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
