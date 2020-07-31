<template>
  <v-main class="mt-0">
    <v-container>
      <review-types :types="types"></review-types>
    </v-container>
  </v-main>
</template>

<script>
import ReviewTypes from "@/components/ReviewTypes";

export default {
  data() {
    return {
      types: [
        "Department Store",
        "Supermarket",
        "Grocery or Supermarket",
        "Electronics Store",
        "Home Goods Store",
        "Food",
        "Point of Interest",
        "Clothing Store",
        "Store",
        "Establishment",
      ],
    };
  },
  components: {
    "review-types": ReviewTypes,
  },
  mounted() {
    this.getTypes();
  },
  methods: {
    getTypes() {
      return this.types;
    },
  },
};
</script>
