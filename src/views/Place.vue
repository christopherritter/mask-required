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
              <v-spacer></v-spacer>
              {{ rating }}
              <v-spacer></v-spacer>
              <v-rating
                v-model="rating"
                background-color="yellow"
                color="yellow accent-4"
                length="5"
                dense
                half-increments
                hover
                size="18"
                readonly
              ></v-rating>
              <v-spacer></v-spacer>
              <span class="caption mr-2">
                ({{ reviews.length }} reviews )
              </span>
            </v-card-actions>
            <v-divider></v-divider>
            <v-list dense>
              <v-subheader>RATINGS</v-subheader>
              <v-list-item
                v-for="rating in ratings"
                :key="'rating' + rating.id"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="rating.icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="rating.label"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="py-0">
                  <v-rating
                    v-model="rating.value"
                    background-color="purple lighten-3"
                    color="purple"
                    length="5"
                    dense
                    small
                    readonly
                  ></v-rating>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card>
            <v-card-title>Details</v-card-title>

            <v-alert v-if="place.isOpen" dense text type="success">
              Currently Open
            </v-alert>
            <v-alert v-else dense text type="warning">
              Currently Closed
            </v-alert>

            <v-list v-if="place.open_hours" dense>
              <v-list-item class="hours-title-list-item">
                <v-list-item-title class="hours-title">Hours</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="hours in place.open_hours"
                :key="hours"
                class="hours-list-item"
              >
                <v-list-item-subtitle>{{ hours }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card>
            <v-card-title>Location and contact</v-card-title>
            <div id="map"></div>
            <v-list dense>
              <v-list-item v-if="place.formatted_phone_number" two-line>
                <v-list-item-content>
                  <v-list-item-title>Phone</v-list-item-title>
                  <v-list-item-subtitle>{{
                    place.formatted_phone_number
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="place.formatted_phone_number" two-line>
                <v-list-item-content>
                  <v-list-item-title>Website</v-list-item-title>
                  <v-list-item-subtitle>{{
                    place.website
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-list-item v-if="place.url" two-line>
                <v-list-item-content>
                  <v-list-item-title>Location</v-list-item-title>
                  <v-list-item-subtitle>{{ place.url }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> -->
            </v-list>
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
      ratings: [
        { id: 0, icon: "mdi-clock", label: "Compliance", value: 0 },
        { id: 1, icon: "mdi-account", label: "Safety", value: 0 },
        { id: 2, icon: "mdi-flag", label: "Concern", value: 0 },
      ],
    };
  },
  mounted() {
    this.$store.state.showSearch = true;
    this.showLocation( this.place.lat, this.place.lng );
    this.$store.dispatch("fetchReviews");
  },
  computed: {
    ...mapState(["userProfile", "place", ["reviews"], "rating"]),
  },
  methods: {
    likeReview(id, likesCount) {
      this.$store.dispatch("likeReview", { id, likesCount });
    },
    showLocation(lat, lng) {
      this.$store.dispatch("showLocation", { lat, lng });
    }
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

<style lang="scss" scoped>
.hours-title-list-item,
.hours-list-item {
  min-height: 24px;
}

#map {
  height: 8rem;
  background: salmon;
}
</style>
