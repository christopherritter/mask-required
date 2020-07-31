<template>
  <v-main class="mt-0">
    <v-container>
      <review-types></review-types>
    </v-container>
  </v-main>
</template>

<script>
import ReviewTypes from "@/components/ReviewTypes";

export default {
  components: {
    "review-types": ReviewTypes,
  }
};
</script>
