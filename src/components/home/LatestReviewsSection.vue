<template>
  <section id="latest-reviews-section">
    <v-row>
      <v-col class="d-flex align-center">
        <v-divider class="mb-1"></v-divider>
      </v-col>
      <v-col>
        <h3 class="text-center">Recent Reviews</h3>
      </v-col>
      <v-col class="d-flex align-center">
        <v-divider class="mb-1"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="review in reviews" :key="review.reviewId">
        <v-card height="325" outlined :style="styleObject">
          <v-row no-gutters style="height: 216px;">
            <v-col cols="12" class="flex-grow-1 flex-shrink-0">
              <v-card-title>{{ review.title }}</v-card-title>
              <v-card-text>{{ review.content | trimLength }}</v-card-text>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="flex-grow-1 flex-shrink-1">
              <v-card-text>
                <v-divider></v-divider>
                
                <v-row no-gutters>
                  <v-col cols="3" class="hidden-md-and-down">
                    <v-avatar color="teal" size="64">
                      <span class="white--text headline">{{
                        review.rating
                      }}</span>
                    </v-avatar>
                  </v-col>
                  <v-col cols="9" md="12" lg="9">
                    <v-row no-gutters>
                      <v-col cols="12" class="pt-2">
                        <span class="subtitle-2">
                          {{ review.place.name | truncateWithEllipse(38) }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <span class="caption">
                          {{ review.place.formatted_address | truncateWithEllipse(40) }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row no-gutters align="center" justify="start">
                      <v-rating
                        v-if="
                          review.place.reviews &&
                            review.place.reviews.length > 0
                        "
                        v-model="review.place.ratings.general"
                        background-color="yellow"
                        color="yellow accent-4"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1"
                      ></v-rating>

                      <v-rating
                        v-else
                        background-color="gray"
                        color="gray accent-4"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1"
                      ></v-rating>

                      <v-chip
                        v-if="
                          review.place.reviews &&
                            review.place.reviews.length > 0
                        "
                        small
                        color="white"
                        :ripple="false"
                      >
                        {{ review.place.reviews.length }} reviews
                      </v-chip>

                      <v-chip v-else small color="white" :ripple="false">
                        0 reviews
                      </v-chip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
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
      styleObject: { "border-color": "#7dbc96" },
    };
  },
  async created() {
    await this.$store.dispatch("fetchTopReviews").then((reviews) => {
      reviews.map((review) => {
        // console.log(review.place.place_id)
        this.$store
          .dispatch("fetchPlace", { place_id: review.place.place_id })
          .then(() => {
            // console.log(this.$store.getters.getPlace)
            review.place = this.$store.getters.getPlace;
          });
      });
      this.reviews = reviews;
    });
  },
  filters: {
    trimLength(val) {
      if (val.length < 240) {
        return val;
      }
      return `${val.substring(0, 240)}...`;
    },
    truncateWithEllipse(val, stringLength) {
      if (val.length > stringLength) {
        return val.slice(0, stringLength - 1) + "...";
      } else {
        return val;
      }
    },
  },
};
</script>
