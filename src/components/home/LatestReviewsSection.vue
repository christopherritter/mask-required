<template>
  <section id="latest-reviews-section">
    <v-row>
      <v-col class="d-flex align-center">
        <v-divider class="mb-1"></v-divider>
      </v-col>
      <v-col>
        <h3 class="text-center">Latest Reviews</h3>
      </v-col>
      <v-col class="d-flex align-center">
        <v-divider class="mb-1"></v-divider>
      </v-col>
    </v-row>
    <v-row v-if="loading && reviewsExist">
      <v-col cols="12" md="6" lg="4">
        <v-card height="325" outlined>
          <v-card-text>
            <v-skeleton-loader type="heading" class="mt-2"></v-skeleton-loader>
            <v-skeleton-loader
              type="paragraph"
              class="my-6"
            ></v-skeleton-loader>
          </v-card-text>
          <v-skeleton-loader
            type="list-item-avatar-three-line"
            class="mt-16"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card height="325" outlined>
          <v-card-text>
            <v-skeleton-loader type="heading" class="mt-2"></v-skeleton-loader>
            <v-skeleton-loader
              type="paragraph"
              class="my-6"
            ></v-skeleton-loader>
          </v-card-text>
          <v-skeleton-loader
            type="list-item-avatar-three-line"
            class="mt-16"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card height="325" outlined>
          <v-card-text>
            <v-skeleton-loader type="heading" class="mt-2"></v-skeleton-loader>
            <v-skeleton-loader
              type="paragraph"
              class="my-6"
            ></v-skeleton-loader>
          </v-card-text>
          <v-skeleton-loader
            type="list-item-avatar-three-line"
            class="mt-16"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card height="325" outlined>
          <v-card-text>
            <v-skeleton-loader type="heading" class="mt-2"></v-skeleton-loader>
            <v-skeleton-loader
              type="paragraph"
              class="my-6"
            ></v-skeleton-loader>
          </v-card-text>
          <v-skeleton-loader
            type="list-item-avatar-three-line"
            class="mt-16"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card height="325" outlined>
          <v-card-text>
            <v-skeleton-loader type="heading" class="mt-2"></v-skeleton-loader>
            <v-skeleton-loader
              type="paragraph"
              class="my-6"
            ></v-skeleton-loader>
          </v-card-text>
          <v-skeleton-loader
            type="list-item-avatar-three-line"
            class="mt-16"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card height="325" outlined>
          <v-card-text>
            <v-skeleton-loader type="heading" class="mt-2"></v-skeleton-loader>
            <v-skeleton-loader
              type="paragraph"
              class="my-6"
            ></v-skeleton-loader>
          </v-card-text>
          <v-skeleton-loader
            type="list-item-avatar-three-line"
            class="mt-16"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!loading && reviewsExist">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="review in reviews"
        :key="review.reviewId"
      >
        <v-card
          height="325"
          outlined
          :style="styleObject"
          @mouseover.native="highlightedCard = review.reviewId"
          @mouseleave.native="highlightedCard = null"
          :class="{
            'teal white--text': highlightedCard == review.reviewId,
          }"
          style="cursor: pointer"
          @click="viewPlace({ place_id: review.place.place_id })"
        >
          <v-row no-gutters style="height: 216px;">
            <v-col cols="12" class="flex-grow-1 flex-shrink-0">
              <v-card-title>{{
                review.title | truncateWithEllipse(70)
              }}</v-card-title>
              <v-card-text>
                {{ review.content | truncateWithEllipse(250) }}
              </v-card-text>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="flex-grow-1 flex-shrink-1">
              <v-card-text>
                <v-divider></v-divider>

                <v-row no-gutters>
                  <v-col class="flex-grow-0 flex-shrink-1">
                    <v-avatar class="mt-2 mr-4" color="teal" size="64">
                      <span class="white--text headline">{{
                        review.rating
                      }}</span>
                    </v-avatar>
                  </v-col>
                  <v-col class="flex-grow-1 flex-shrink-1">
                    <v-row no-gutters>
                      <v-col cols="12" class="pt-2">
                        <span class="subtitle-2">
                          {{ review.place.name | truncateWithEllipse(36) }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <span class="caption">
                          {{
                            review.place.formatted_address
                              | truncateWithEllipse(42)
                          }}
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
    <v-row justify="center" v-else>
      <generate-reviews class="mb-16"></generate-reviews>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "@/firebase";
import GenerateReviews from "@/components/util/GenerateReviews";

export default {
  name: "latest-reviews-section",
  data() {
    return {
      reviews: [],
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
      loading: true,
      reviewsExist: false,
    };
  },
  async created() {
    var collectionSize = await fb.reviewsCollection
      .limit(1)
      .get()
      .then((query) => query.size);

    if (!collectionSize) {
      return
    }

    await this.$store.dispatch("fetchTopReviews").then((reviews) => {
      reviews.map((review) => {
        var topReview = review;

        this.$store
          .dispatch("fetchPlace", { place_id: review.place.place_id })
          .then((place) => {
            topReview.place = place;
          });

        this.reviews.push(topReview);
      });
    });
    this.reviewsExist = true;
    this.loading = false;
  },
  methods: {
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", { place_id: place.place_id });
      this.$router.push({ name: "place", params: { id: place.place_id } });
    },
  },
  components: {
    GenerateReviews,
  },
  filters: {
    truncateWithEllipse(val, stringLength) {
      if (!val) {
        // not sure why this is erroring out.
        return;
      }
      if (val.length > stringLength) {
        return val.slice(0, stringLength - 1) + "...";
      } else {
        return val;
      }
    },
  },
};
</script>
