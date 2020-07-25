<template>
  <v-main>
    <v-container id="place" fluid>
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
            <h3>{{ place.name }}</h3>

            <v-row>
              <v-col class="d-flex flex-row pb-0">
                <v-chip medium color="white">{{
                  place.formatted_address
                }}</v-chip>
                <v-chip medium color="white">|</v-chip>
                <v-chip medium color="white">{{
                  place.formatted_phone_number
                }}</v-chip>
                <v-chip medium color="white">|</v-chip>
                <v-chip medium color="white">{{ place.website }}</v-chip>
                <!-- <v-chip v-if="place.isOpen" medium color="success">
                  Currently Open
                </v-chip>
                <v-chip v-else medium color="warning">
                  Currently Closed
                </v-chip> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex flex-row pt-0">
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
                <v-chip medium color="white">
                  <v-avatar left>
                    {{ reviews.length }}
                  </v-avatar>
                  Reviews
                </v-chip>
                <v-chip medium color="white">|</v-chip>
                <v-chip
                  medium
                  v-for="type in place.types"
                  :key="type"
                  color="white"
                >
                  {{ type | replaceUnderscore }}
                </v-chip>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-card>
            <v-card-title>Ratings and reviews</v-card-title>
            <v-card-actions class="px-4 pb-4">
              <v-avatar color="teal" size="64">
                <span class="white--text headline">{{ rating }}</span>
              </v-avatar>
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
              <span class="caption mr-2 font-weight-medium">
                ( {{ reviews.length }} reviews )
              </span>
            </v-card-actions>
            <v-divider class="my-0"></v-divider>
            <v-list dense class="pl-2">
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
              <v-list-item v-if="place.website" two-line>
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
              <v-col class="text-right">
                <v-btn
                  class="ma-2 mr-6"
                  large
                  raised
                  color="success"
                  @click="$router.push('review')"
                  ><v-icon left>mdi-plus-circle-outline</v-icon> Write a
                  review</v-btn
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
                  @click="$router.push('review')"
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
  data() {
    return {
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      fullReview: {},
    };
  },
  mounted() {
    this.$store.state.showSearch = true;
    this.$store.dispatch("fetchReviews");
    this.showLocation(this.place.location.lat, this.place.location.lng);
  },
  components: {
    ViewReview,
    EditReview,
    DeleteReview,
  },
  watch: {
    place(newValue, oldValue) {
      this.showLocation(this.place.location.lat, this.place.location.lng);
    },
    reviews() {
      this.$store.dispatch("fetchReviews");
    },
  },
  computed: {
    ...mapState([["userProfile"], "place", ["reviews"], "rating", ["ratings"]]),
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
        map: map
      });
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
