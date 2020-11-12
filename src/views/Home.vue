<template>
  <v-main class="mt-0">
    <v-container>
      <popular-types-bar :types="types"></popular-types-bar>
      <primary-search-bar></primary-search-bar>
      <popular-places-section :types="types"></popular-places-section>
      <latest-reviews-section></latest-reviews-section>
      <active-regions-section class="mb-16"></active-regions-section>
    </v-container>
  </v-main>
</template>

<script>
import PopularTypesBar from "@/components/home/PopularTypesBar";
import ActiveRegionsSection from "@/components/home/ActiveRegionsSection";
import LatestReviewsSection from "@/components/home/LatestReviewsSection";
import PopularPlacesSection from "@/components/home/PopularPlacesSection";
import PrimarySearchBar from "@/components/home/PrimarySearchBar";

export default {
  name: "Home",
  data() {
    return {
      types: [],
      loading: true,
    };
  },
  async created() {
    await this.$store.dispatch("viewTypes").then((results) => {
      this.types = results;
      this.loading = false;
    });
    this.$ga.page(this.$router);
  },
  components: {
    PopularTypesBar,
    ActiveRegionsSection,
    LatestReviewsSection,
    PrimarySearchBar,
    PopularPlacesSection,
  },
};
</script>
