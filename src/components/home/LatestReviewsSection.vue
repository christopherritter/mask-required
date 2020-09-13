<template>
  <section id="latest-reviews-section">
    <v-row>
      <v-col class="d-flex align-center"
        ><v-divider class="mb-1"></v-divider
      ></v-col>
      <v-col>
        <h3 class="text-center">Latest Reviews</h3>
      </v-col>
      <v-col class="d-flex align-center"
        ><v-divider class="mb-1"></v-divider
      ></v-col>
    </v-row>
    <v-row>
      <v-col v-for="review in reviews" :key="review.reviewId">
        <v-card>
          <v-card-title>{{ review.title }}</v-card-title>
          <v-card-text>{{ review.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "latest-reviews-section",
  data() {
    return {
      reviews: [],
    }
  },
  async created() {
    await this.$store.dispatch("fetchTopReviews").then((reviews) => {
      console.log(reviews)
      this.reviews = reviews;
    });
  }
}
</script>