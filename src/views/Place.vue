<template>
  <v-main>
    <v-container id="place">
      <v-row>
        <v-col>
          <v-row v-if="loading" no-gutter>
            <v-skeleton-loader
              type="heading"
              width="600"
              height="48"
              class="mt-3 mb-0"
            ></v-skeleton-loader>
          </v-row>
          <v-row v-if="loading" no-gutter>
            <v-skeleton-loader
              type="sentences"
              width="420"
              height="52"
              class="mt-0 mb-0"
            ></v-skeleton-loader>
          </v-row>
          <place-header-bar v-else :place="currentPlace"></place-header-bar>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-sheet v-if="loading" elevation="2">
            <v-skeleton-loader height="330" type="card"></v-skeleton-loader>
          </v-sheet>
          <place-ratings-card v-else :place="currentPlace"></place-ratings-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-sheet v-if="loading" elevation="2">
            <v-skeleton-loader height="330" type="card"></v-skeleton-loader>
          </v-sheet>
          <place-location-card
            v-show="!loading"
            :place="currentPlace"
          ></place-location-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet v-if="loading" elevation="2">
            <v-row>
              <v-col>
                <v-skeleton-loader
                  height="48"
                  width="420"
                  type="heading"
                  class="ml-6 mt-4 mb-0"
                ></v-skeleton-loader>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-skeleton-loader
                  height="52"
                  width="280"
                  type="actions"
                  class="mr-4 mt-0 mb-0"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-sheet>
          <place-reviews-section
            v-else
            :place="currentPlace"
            :reviews="reviews"
            @refresh="fetchPlace()"
            v-on:confirm-delete="fetchPlace(id)"
          ></place-reviews-section>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

import PlaceHeaderBar from "@/components/place/PlaceHeaderBar";
import PlaceRatingsCard from "@/components/place/PlaceRatingsCard";
import PlaceLocationCard from "@/components/place/PlaceLocationCard";
import PlaceReviewsSection from "@/components/place/PlaceReviewsSection";

export default {
  name: "place",
  data() {
    return {
      currentPlace: {},
      reviews: [],
    };
  },
  async created() {
    this.$store.dispatch("showSearchBar", true);
    this.fetchPlace();
    this.$ga.page(this.$router);
  },
  components: {
    PlaceHeaderBar,
    PlaceRatingsCard,
    PlaceLocationCard,
    PlaceReviewsSection,
  },
  watch: {
    $route(to, from) {
      this.fetchPlace();
    },
  },
  computed: {
    ...mapState(["place", "loading"]),
  },
  methods: {
    async fetchPlace() {
      var placeId = await this.$route.params.id;

      this.$store.dispatch("isLoading", true)

      await this.$store.dispatch("fetchPlace", {
        place_id: placeId
      });

      this.currentPlace = await this.$store.getters.getPlace;

      this.$store.dispatch("fetchReviews", this.currentPlace.doc_id).then((results) => {
        this.reviews = results;
      });

      this.$store.dispatch("isLoading", false)
    },
  },
};
</script>
