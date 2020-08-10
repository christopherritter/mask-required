<template>
  <v-main>
    <v-container id="place">
      <v-row justify="center">
        <ViewReview
          :dialog-view="showViewModal"
          :full-review="fullReview"
          @close="toggleViewModal()"
        ></ViewReview>
        <EditReview
          :dialog-view="showEditModal"
          :full-review="fullReview"
          @close="toggleEditModal()"
        ></EditReview>
        <DeleteReview
          :dialog-view="showDeleteModal"
          :full-review="fullReview"
          @close="toggleDeleteModal()"
        ></DeleteReview>
      </v-row>
      <v-row>
        <v-col>
          <div class="place-header">
            <v-row no-gutters>
              <h3>{{ place.name }}</h3>
            </v-row>

            <v-row no-gutters>
              <v-card-text class="pa-0">{{
                place.formatted_address
              }}</v-card-text>
            </v-row>
            <v-row no-gutters align="center" justify="start">
              <v-rating
                v-if="place.reviews && place.reviews.length > 0"
                v-model="ratings.general"
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

              <v-chip v-if="place.reviews && place.reviews.length > 0" small color="white" :ripple="false">
                {{ place.reviews.length }} reviews
              </v-chip>

              <v-chip v-else small color="white" :ripple="false">
                0 reviews
              </v-chip>

              <v-divider vertical class="ma-2">|</v-divider>

              <v-chip-group v-if="userLocation" show-arrows class="px-0">
                <v-chip
                  small
                  color="white"
                  v-for="(t, index) in place.types"
                  :key="index"
                  @click="findNearbyPlaces(t)"
                  :value="t"
                  >{{ t | replaceUnderscore }}</v-chip
                >
              </v-chip-group>

              <v-chip-group v-else show-arrows class="px-0">
                <v-chip
                  disabled
                  small
                  color="white"
                  v-for="(t, index) in place.types"
                  :key="index"
                  >{{ t | replaceUnderscore }}</v-chip
                >
              </v-chip-group>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" :md="columnWidth">
          <v-card v-if="place.reviews && place.reviews.length > 0">
            <v-card-title>Ratings and reviews</v-card-title>
            <v-card-actions class="px-4 pb-4">
              <v-avatar color="teal" size="64">
                <span class="white--text headline">{{
                  place.ratings.general
                }}</span>
              </v-avatar>
              <v-spacer></v-spacer>
              <v-rating
                v-model="place.ratings.general"
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
              <span class="caption mr-2 font-weight-medium">
                ( {{ place.reviews.length }} reviews )
              </span>
            </v-card-actions>
            <v-divider class="my-0"></v-divider>
            <v-list dense class="pl-2">
              <v-subheader>RATINGS</v-subheader>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="ratings[0].icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Compliance</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="py-0">
                  <v-rating
                    v-model="place.ratings.compliance"
                    background-color="purple lighten-3"
                    color="purple"
                    length="5"
                    dense
                    small
                    readonly
                  ></v-rating>
                </v-list-item-content>
                <v-list-item-icon class="mr-2">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" small
                        >mdi-information</v-icon
                      >
                    </template>
                    <span>{{ ratings[0].description }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="ratings[1].icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ ratings[1].label }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="py-0">
                  <v-rating
                    v-model="place.ratings.notifications"
                    background-color="purple lighten-3"
                    color="purple"
                    length="5"
                    dense
                    small
                    readonly
                  ></v-rating>
                </v-list-item-content>
                <v-list-item-icon class="mr-2">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" small
                        >mdi-information</v-icon
                      >
                    </template>
                    <span>{{ ratings[1].description }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="ratings[2].icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ ratings[2].label }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="py-0">
                  <v-rating
                    v-model="place.ratings.enforcement"
                    background-color="purple lighten-3"
                    color="purple"
                    length="5"
                    dense
                    small
                    readonly
                  ></v-rating>
                </v-list-item-content>
                <v-list-item-icon class="mr-2">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" small
                        >mdi-information</v-icon
                      >
                    </template>
                    <span>{{ ratings[2].description }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card v-else>
            <v-card-title>Ratings and reviews</v-card-title>
            <v-card-actions class="px-4 pb-4">
              <v-avatar color="teal" size="64">
                <span class="white--text headline">0</span>
              </v-avatar>
              <v-spacer></v-spacer>
              <v-rating
                background-color="gray"
                color="gray darken-3"
                length="5"
                dense
                half-increments
                hover
                size="18"
                readonly
              ></v-rating>
              <v-spacer></v-spacer>
              <span class="caption mr-2 font-weight-medium">
                ( 0 reviews )
              </span>
            </v-card-actions>
            <v-divider class="my-0"></v-divider>
            <v-list dense class="pl-2">
              <v-subheader>RATINGS</v-subheader>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="ratings[0].icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ ratings[0].label }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="py-0">
                  <v-rating
                    background-color="gray lighten-3"
                    color="gray"
                    length="5"
                    dense
                    small
                    readonly
                  ></v-rating>
                </v-list-item-content>
                <v-list-item-icon class="mr-2">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" small
                        >mdi-information</v-icon
                      >
                    </template>
                    <span>{{ ratings[0].description }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="ratings[1].icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ ratings[1].label }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="py-0">
                  <v-rating
                    background-color="gray lighten-3"
                    color="gray"
                    length="5"
                    dense
                    small
                    readonly
                  ></v-rating>
                </v-list-item-content>
                <v-list-item-icon class="mr-2">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" small
                        >mdi-information</v-icon
                      >
                    </template>
                    <span>{{ ratings[1].description }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="ratings[2].icon" small></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ ratings[2].label }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="py-0">
                  <v-rating
                    background-color="gray lighten-3"
                    color="gray"
                    length="5"
                    dense
                    small
                    readonly
                  ></v-rating>
                </v-list-item-content>
                <v-list-item-icon class="mr-2">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" small
                        >mdi-information</v-icon
                      >
                    </template>
                    <span>{{ ratings[2].description }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col v-if="showDetails" cols="12" sm="12" :md="columnWidth">
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
        <v-col cols="12" sm="12" :md="columnWidth">
          <v-card>
            <v-card-title>Location and address</v-card-title>
            <div id="map"></div>
            <v-list dense>
              <v-list-item two-line v-if="place.formatted_address">
                <v-list-item-content>
                  <v-list-item-title>Address</v-list-item-title>
                  <v-list-item-subtitle>{{
                    place.formatted_address
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line v-if="place.plus_code">
                <v-list-item-content>
                  <v-list-item-title>Plus code</v-list-item-title>
                  <v-list-item-subtitle>{{
                    place.plus_code.compound_code
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="place.reviews && place.reviews.length > 0">
            <v-row>
              <v-col>
                <v-card-title
                  >Reviews
                  <span class="reviews-length"
                    >({{ place.reviews.length }})</span
                  ></v-card-title
                >
              </v-col>
              <v-col class="text-right">
                <v-btn
                  class="ma-2 mr-6"
                  large
                  raised
                  color="success"
                  @click="$router.push({ name: 'review' })"
                  ><v-icon left>mdi-plus-circle-outline</v-icon> Write a
                  review</v-btn
                >
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <div
              v-for="review in place.reviews"
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
                <v-spacer></v-spacer>
                <v-btn
                  v-if="userReview(review)"
                  text
                  class="text-danger"
                  @click="deleteReview(review)"
                  >delete review</v-btn
                >
                <v-btn
                  v-if="userReview(review)"
                  text
                  @click="editReview(review)"
                  >edit review</v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
            </div>
          </v-card>
          <v-card v-else>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title class="no-results">
                  There are currently no reviews
                </v-card-title>
              </v-col>
              <v-col md="6" class="text-right">
                <v-btn
                  class="ma-2 mr-6"
                  large
                  raised
                  color="success"
                  @click="$router.push({ name: 'review' })"
                >
                  <v-icon left>mdi-plus-circle-outline</v-icon> Add Review
                </v-btn>
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
import moment from "moment";
import ViewReview from "@/components/ViewReview";
import EditReview from "@/components/EditReview";
import DeleteReview from "@/components/DeleteReview";

export default {
  name: "place",
  data() {
    return {
      place: {
        reviews: []
      },
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showDetails: false,
      fullReview: {},
      userLocation: false,
    };
  },
  async created() {
    var placeId = await this.$route.params.id;

    this.$store.dispatch("showSearchBar", true);

    // console.log("Fetching reviews when created:");
    await this.$store.dispatch("fetchPlace", {
      place_id: placeId,
      rating: 0,
    });

    console.log("Fetching reviews when created.")
    await this.$store.dispatch("fetchReviews", placeId);

    console.log("Setting this place in view when created:");
    const newPlace = await this.$store.getters.getPlace;

    console.log(newPlace);
    this.place = newPlace;
    console.log("Got place, showing location.");
    this.showLocation(
      this.place.geometry.location.lat,
      this.place.geometry.location.lng
    );
    // // if (this.place.isOpen) {
    // //   this.showDetails = true;
    // // }
    if (this.$store.state.userLocation.lat === null) {
      await this.$store.dispatch("fetchUserLocation");
    } else {
      this.userLocation = true;
    }
  },
  components: {
    ViewReview,
    EditReview,
    DeleteReview,
  },
  watch: {
    async $route(to, from) {
      console.log("Fetching reviews when route updated:");
      await this.$store.dispatch("fetchPlace", {
        place_id: this.$route.params.id,
        rating: 0,
      });

      console.log("Setting this place in view when route updated.");
      const newPlace = await this.$store.getters.getPlace;
      console.log(newPlace);
      this.place = newPlace;

      console.log("Got place, showing location via route.");
      this.showLocation(
        this.place.geometry.location.lat,
        this.place.geometry.location.lng
      );
    },
  },
  computed: {
    ...mapState([["userProfile"], ["ratings"]]),
    columnWidth() {
      if (this.showDetails) {
        return 4;
      } else {
        return 6;
      }
    },
  },
  methods: {
    showLocation(latitude, longitude) {
      // Create a map object
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },
    async findNearbyPlaces(type) {
      await this.$store.dispatch("findNearbyPlaces", type);
      this.$router.push({ name: "nearby", params: { name: type } });
    },
    userReview(review) {
      if (this.userProfile.userId == review.userId) {
        return true;
      } else {
        return false;
      }
    },
    likeReview(id, likesCount) {
      this.$store.dispatch("likeReview", { id, likesCount });
    },
    viewReview(review) {
      this.fullReview = review;
      this.showViewModal = true;
    },
    editReview(review) {
      this.fullReview = review;
      this.showEditModal = true;
    },
    deleteReview(review) {
      this.fullReview = review;
      this.showDeleteModal = true;
    },
    toggleViewModal() {
      this.showViewModal = false;
    },
    toggleEditModal() {
      this.showEditModal = false;
    },
    toggleDeleteModal() {
      this.showDeleteModal = false;
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
    replaceUnderscore(val) {
      var i,
        frags = val.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
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
}
</style>
