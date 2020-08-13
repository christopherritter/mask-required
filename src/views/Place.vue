<template>
  <v-main>
    <v-container id="place">
      <v-row>
        <v-col>
          <place-header-bar :place="place"></place-header-bar>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <place-ratings-card :place="place"></place-ratings-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <place-location-card :place="place"></place-location-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <place-reviews-section :place="place"></place-reviews-section>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import PlaceHeaderBar from "@/components/PlaceHeaderBar";
import PlaceRatingsCard from "@/components/PlaceRatingsCard";
import PlaceLocationCard from "@/components/PlaceLocationCard";
import PlaceReviewsSection from "@/components/PlaceReviewsSection";

export default {
  name: "place",
  data() {
    return {
      place: {
        reviews: [],
      },
      userLocation: false,
    };
  },
  async created() {
    this.$store.dispatch("showSearchBar", true);
    var placeId = await this.$route.params.id;
    await this.$store.dispatch("fetchPlace", {
      place_id: placeId,
    });
    await this.$store.dispatch("fetchReviews", placeId);
    const newPlace = this.$store.getters.getPlace;
    this.place = newPlace;
  },
  components: {
    PlaceHeaderBar,
    PlaceRatingsCard,
    PlaceLocationCard,
    PlaceReviewsSection,
  },
  watch: {
    async $route(to, from) {
      console.log("Watcher activated on place.")
      var placeId = this.$route.params.id;
      await this.$store.dispatch("fetchPlace", {
        place_id: placeId,
      });
      console.log("Getting new place from store.")
      var newPlace = this.$store.getters.getPlace;
      console.log(newPlace)
      this.place = newPlace;
    },
  },
};
</script>
