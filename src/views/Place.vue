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
        <v-col cols="12" sm="12" md="4">
          <v-card>
            <v-card-title>Ratings and reviews</v-card-title>
            <v-card-actions class="pa-4">
              {{ rating }}
              <v-rating
                v-model="rating"
                background-color="white"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
              ></v-rating>
              <span class="caption mr-2"> ({{ reviews }} reviews ) </span>
            </v-card-actions>
            <v-divider></v-divider>
            <v-list dense>
              <v-subheader>RATINGS</v-subheader>
              <v-list-item
                v-for="rating in ratings"
                :key="'rating' + rating.id"
              >
                <v-list-item-icon>
                  <v-icon v-text="rating.icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="rating.label"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-rating
                    v-model="rating.value"
                    background-color="purple lighten-3"
                    color="purple"
                    small
                  ></v-rating>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card>
            <v-card-title>Details</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card>
            <v-card-title>Location and contact</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="reviews.length">
            <v-row>
              <v-col>
                <v-card-title
                  >Reviews
                  <span class="reviews-length"
                    >({{ reviews.length }})</span
                  ></v-card-title
                >
              </v-col>
              <v-col>
                <v-btn
                  color="grey darken-4"
                  dark
                  class="my-2 mx-5 text-right"
                  @click="$router.push('review')"
                  >Write a review</v-btn
                >
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <div
              v-for="review in reviews"
              :key="'review-' + review.id"
              class="review"
            >
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
  data() {
    return {
      rating: 4.5,
      reviews: 30,
      ratings: [
        { id: 0, icon: "mdi-clock", label: "Compliance", value: 3 },
        { id: 1, icon: "mdi-account", label: "Safety", value: 3 },
        { id: 2, icon: "mdi-flag", label: "Concern", value: 3 },
      ],
    };
  },
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
