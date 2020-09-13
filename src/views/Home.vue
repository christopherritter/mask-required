<template>
  <v-main class="mt-0">
    <v-container>
      <address-search-bar></address-search-bar>
      <primary-search-bar></primary-search-bar>
      <popular-type-section></popular-type-section>
    </v-container>
  </v-main>
</template>

<script>
import AddressSearchBar from "@/components/home/AddressSearchBar";
import PopularTypeSection from "@/components/home/PopularTypeSection";
import PrimarySearchBar from "@/components/home/PrimarySearchBar";

export default {
  name: "Home",
  components: {
    AddressSearchBar,
    PrimarySearchBar,
    PopularTypeSection
  },
};
</script>