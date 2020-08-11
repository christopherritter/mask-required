<template>
  <v-main>
    <v-container id="place">
      <v-row justify="center">
        <ViewReview
          :dialog-view="showViewModal"
          :full-review="fullReview"
          @close="toggleViewModal()"
        ></ViewReview>
        <EditReview
          :dialog-view="showEditModal"
          :full-review="fullReview"
          @close="toggleEditModal()"
        ></EditReview>
        <DeleteReview
          :dialog-view="showDeleteModal"
          :full-review="fullReview"
          @close="toggleDeleteModal()"
        ></DeleteReview>
      </v-row>
      <v-row>
        <v-col>
          <place-header :place="place"></place-header>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <place-ratings :place="place"></place-ratings>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <place-location :place="place"></place-location>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <place-reviews :place="place"></place-reviews>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import PlaceHeader from "@/components/PlaceHeader";
import PlaceRatings from "@/components/PlaceRatings";
import PlaceLocation from "@/components/PlaceLocation";
import PlaceReviews from "@/components/PlaceReviews";
import ViewReview from "@/components/ViewReview";
import EditReview from "@/components/EditReview";
import DeleteReview from "@/components/DeleteReview";

export default {
  name: "place",
  data() {
    return {
      place: {
        reviews: [],
      },
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showDetails: false,
      fullReview: {},
      userLocation: false,
    };
  },
  async created() {
    this.$store.dispatch("showSearchBar", true);
    var placeId = await this.$route.params.id;
    await this.$store.dispatch("fetchPlace", {
      place_id: placeId,
      rating: 0,
    });
    await this.$store.dispatch("fetchReviews", placeId);
    const newPlace = this.$store.getters.getPlace;
    this.place = newPlace;
  },
  components: {
    PlaceHeader,
    PlaceRatings,
    PlaceLocation,
    PlaceReviews,
    ViewReview,
    EditReview,
    DeleteReview,
  },
  watch: {
    async $route(to, from) {
      await this.$store.dispatch("fetchPlace", {
        place_id: this.$route.params.id,
        rating: 0,
      });
      const newPlace = await this.$store.getters.getPlace;
      this.place = newPlace;
    },
  },
};
</script>

<style lang="scss" scoped>
.hours-title-list-item,
.hours-list-item {
  min-height: 24px;
}

#map {
  height: 8rem;
}
</style>
