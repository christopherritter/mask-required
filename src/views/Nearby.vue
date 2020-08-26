<template>
  <v-main>
    <v-container class="py-0">
      <v-row>
        <v-col>
          <h1>{{ $route.params.name }} Reviews</h1>
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col>
          <v-sheet elevation="2">
            <v-row>
              <v-col cols="2" class="hidden-sm-and-down"
                ><v-skeleton-loader
                  type="avatar"
                  width="48"
                  height="48"
                  class="mt-10"
                  style="margin-left: auto; margin-right: auto"
                ></v-skeleton-loader
              ></v-col>
              <v-col cols="12" md="10">
                <v-row>
                  <v-col>
                    <v-row>
                      <v-col>
                        <v-skeleton-loader
                          type="heading"
                          width="500"
                          height="36"
                          class="mt-md-3 mx-3"
                        ></v-skeleton-loader>
                      </v-col>
                    </v-row>
                    <v-row
                      ><v-col
                        ><v-skeleton-loader
                          type="sentences"
                          width="350"
                          class="mx-3"
                        ></v-skeleton-loader></v-col
                    ></v-row>
                  </v-col>
                  <v-col class="d-flex justify-md-end"
                    ><v-skeleton-loader
                      type="paragraph"
                      width="248"
                      height="48"
                      class="mt-md-4 mx-3 mr-md-6"
                    ></v-skeleton-loader
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-start">
                    <v-skeleton-loader
                      type="chip"
                      width="124"
                      height="48"
                      class="ml-3"
                    ></v-skeleton-loader
                    ><v-skeleton-loader
                      type="chip"
                      width="124"
                      height="48"
                    ></v-skeleton-loader
                    ><v-skeleton-loader
                      type="chip"
                      width="124"
                      height="48"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-skeleton-loader
                      type="paragraph"
                      width="348"
                      height="48"
                      class="mt-md-6 mx-3 mb-4"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col>
          <v-sheet elevation="2">
            <v-row>
              <v-col cols="2" class="hidden-sm-and-down"
                ><v-skeleton-loader
                  type="avatar"
                  width="48"
                  height="48"
                  class="mt-10"
                  style="margin-left: auto; margin-right: auto"
                ></v-skeleton-loader
              ></v-col>
              <v-col cols="12" md="10">
                <v-row>
                  <v-col>
                    <v-row>
                      <v-col>
                        <v-skeleton-loader
                          type="heading"
                          width="500"
                          height="36"
                          class="mx-3 mt-md-3"
                        ></v-skeleton-loader>
                      </v-col>
                    </v-row>
                    <v-row
                      ><v-col>
                        <v-skeleton-loader
                          type="sentences"
                          width="350"
                          class="mx-3"
                        ></v-skeleton-loader></v-col
                    ></v-row>
                  </v-col>
                  <v-col class="d-flex justify-md-end"
                    ><v-skeleton-loader
                      type="paragraph"
                      width="248"
                      height="48"
                      class="mx-3 mt-md-4 mr-6"
                    ></v-skeleton-loader
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-start">
                    <v-skeleton-loader
                      type="chip"
                      width="124"
                      height="48"
                      class="ml-3"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row v-else v-for="place in places" :key="place.place_id">
        <v-col>
          <v-card class="pl-3">
            <v-row>
              <v-col
                cols="2"
                style="cursor: pointer"
                class="grey lighten-3 rounded-l hidden-sm-and-down"
                @click="viewPlace(place)"
              >
                <v-img
                  :src="place.icon"
                  class="rounded-l d-flex justify-center"
                  style="margin: 55px auto;"
                  height="50"
                  width="50"
                ></v-img>
              </v-col>
              <v-col cols="12" md="10">
                <v-row no-gutters>
                  <v-col cols="12" md="6" @click="viewPlace(place)" style="cursor: pointer">
                    <v-row>
                      <v-card-title class="px-3 pt-0 pt-md-4 pb-1">{{
                        place.name
                      }}</v-card-title>
                    </v-row>
                    <v-row
                      v-if="place.ratings"
                      class="d-flex align-md-center justify-md-start"
                    >
                      <v-rating
                        :value="place.ratings.general"
                        background-color="yellow"
                        color="yellow accent-4"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 ml-2"
                      ></v-rating>

                      <span
                        class="caption ml-2"
                        v-if="place.reviews.length >= 2"
                      >
                        ({{ place.reviews.length }} Reviews)
                      </span>
                      <span class="caption ml-2" v-else>
                        ({{ place.reviews.length }} Review)
                      </span>
                    </v-row>
                    <v-row
                      v-else
                      class="d-flex align-md-center justify-md-start"
                    >
                      <v-rating
                        disabled
                        background-color="gray"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 ml-2"
                      ></v-rating>

                      <span class="caption ml-2">(0 Reviews)</span>
                    </v-row>
                    <v-row>
                      <v-card-text class="px-3 py-2">{{
                        place.formatted_address
                      }}</v-card-text>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6" v-if="place.ratings" class="mb-4">
                    <v-row
                      class="d-flex flex-nowrap align-md-center justify-md-end"
                    >
                      <v-icon
                        v-text="ratings[0].icon"
                        class="mt-5 mx-3"
                        small
                      ></v-icon>
                      <strong class="mt-5">Compliance</strong>
                      <v-rating
                        :value="place.ratings.compliance"
                        background-color="yellow"
                        color="yellow accent-4"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 mt-5 ml-2 mr-10"
                      ></v-rating>
                    </v-row>
                    <v-row
                      class="d-flex flex-nowrap align-md-center justify-md-end"
                    >
                      <v-icon
                        v-text="ratings[1].icon"
                        class="mx-3"
                        small
                      ></v-icon>
                      <strong>Notifications</strong>
                      <v-rating
                        :value="place.ratings.notifications"
                        background-color="yellow"
                        color="yellow accent-4"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 ml-2 mr-10"
                      ></v-rating>
                    </v-row>
                    <v-row
                      class="d-flex flex-nowrap align-md-center justify-md-end"
                    >
                      <v-icon
                        v-text="ratings[2].icon"
                        class="mx-3"
                        small
                      ></v-icon>
                      <strong>Enforcement</strong>
                      <v-rating
                        :value="place.ratings.enforcement"
                        background-color="yellow"
                        color="yellow accent-4"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 ml-2 mr-10"
                      ></v-rating>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6" class="mb-4" v-else>
                    <v-row
                      class="d-flex flex-nowrap align-md-center justify-md-end"
                    >
                      <v-icon
                        v-text="ratings[0].icon"
                        class="mt-5 mx-3"
                        small
                      ></v-icon>
                      <strong class="mt-5">Compliance</strong>
                      <v-rating
                        disabled
                        background-color="gray"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 mt-5 ml-2 mr-10"
                      ></v-rating>
                    </v-row>
                    <v-row
                      class="d-flex flex-nowrap align-md-center justify-md-end"
                    >
                      <v-icon
                        v-text="ratings[1].icon"
                        class="mx-3"
                        small
                      ></v-icon>
                      <strong>Notifications</strong>
                      <v-rating
                        disabled
                        background-color="gray"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 ml-2 mr-10"
                      ></v-rating>
                    </v-row>
                    <v-row
                      class="d-flex flex-nowrap align-md-center justify-md-end"
                    >
                      <v-icon
                        v-text="ratings[1].icon"
                        class="mx-3"
                        small
                      ></v-icon>
                      <strong>Enforcement</strong>
                      <v-rating
                        disabled
                        background-color="gray"
                        length="5"
                        dense
                        half-increments
                        hover
                        size="18"
                        readonly
                        class="mb-1 ml-2 mr-10"
                      ></v-rating>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row v-if="place.types" no-gutters>
                  <v-chip-group show-arrows class="mb-2" v-model="type">
                    <v-chip
                      medium
                      color="gray"
                      class="lighten-3"
                      v-for="(t, index) in place.types"
                      :key="index"
                      @click="findNearbyPlaces(t)"
                      :value="t"
                      >{{ t }}</v-chip
                    >
                  </v-chip-group>
                </v-row>
                <v-row v-if="place.reviews">
                  <v-col>
                    <v-row
                      v-for="review in place.reviews"
                      :key="review.reviewId"
                    >
                      <h5 class="pl-4">Recent reviews</h5>
                      <v-card-text v-if="review.title">
                        &ldquo;{{ review.title }}&rdquo;
                      </v-card-text>
                      <v-card-text v-else>
                        This comment lacks a title.
                      </v-card-text>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "nearby",
  data() {
    return {
      places: [],
      region: {},
      error: "",
      spinner: false,
      selected: "",
      type: "",
      loading: true,
    };
  },
  async created() {
    this.$store.dispatch("showSearchBar", true);
    await this.fetchRegion();
    this.loading = false;
  },
  computed: {
    ...mapState([["validTypes"], ["ratings"]]),
  },
  methods: {
    async fetchRegion() {
      var placeId = await this.$route.params.id;

      console.log("Fetching region.")
      await this.$store.dispatch("fetchRegion", {
        place_id: placeId,
      });

      console.log("Getting geohash range.")
      await this.$store.dispatch("getGeohashRange");
      
      console.log("Setting region.")
      const region = this.$store.getters.getRegion;
      this.region = region;

      console.log("Setting inside places.")
      await this.$store.dispatch("findInsidePlaces");
      const places = this.$store.getters.getPlaces;
      this.places = places;
    },
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push({ name: "place", params: { id: place.place_id } });
    },
  },
  // filters: {
  //   replaceUnderscore(val) {
  //     var i,
  //       frags = val.split("_");
  //     for (i = 0; i < frags.length; i++) {
  //       if (frags[i] != "of" && frags[i] != "or") {
  //         frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  //       }
  //     }
  //     return frags.join(" ");
  //   },
  // },
};
</script>
