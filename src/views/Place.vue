<template>
  <v-main>
    <v-container id="place" fluid>
      <v-row>
        <v-col>
          <div class="profile">
            <h3>{{ place.name }}</h3>
            <p>{{ place.formatted_address }}</p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="reviews.length">
            <v-row>
              <v-col>
                <v-card-text>{{ reviews.length }} reviews</v-card-text>
              </v-col>
              <v-col>
                <v-btn
                  color="grey darken-4"
                  dark
                  class="mt-4 mx-4"
                  @click="$router.push('review')"
                  >Write a review</v-btn
                >
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <div v-for="review in reviews" :key="'review-' + review.id" class="review">
              <v-card-title class="review-username">{{
                review.title
              }}</v-card-title>
              <v-card-subtitle class="review-created-on">{{
                review.createdOn | formatDate
              }}</v-card-subtitle>
              <v-card-text class="review-content">{{
                review.content | trimLength
              }}</v-card-text>
              <v-card-actions>
                <v-btn text @click="likeReview(review.id, review.likes)"
                  >likes {{ review.likes }}</v-btn
                >
                <v-btn text @click="viewReview(review)">full review</v-btn>
              </v-card-actions>
              <v-divider></v-divider>
            </div>
          </v-card>
          <v-card v-else>
            <v-card-text class="no-results"
              >There are currently no reviews</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import * as fb from "../firebase";

export default {
  mounted() {
    this.$store.state.showSearch = true;
    this.$store.dispatch("fetchReviews");
  },
  computed: {
    ...mapState(["userProfile", "place", ["reviews"]]),
  },
  methods: {
    likeReview(id, likesCount) {
      this.$store.dispatch("likeReview", { id, likesCount });
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>
