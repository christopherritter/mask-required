<template>
  <section>
    <ViewReviewDialog
      :dialog-view="showViewModal"
      :full-review="fullReview"
      @close="toggleViewModal()"
    ></ViewReviewDialog>
    <EditReviewDialog
      :dialog-view="showEditModal"
      :full-review="fullReview"
      :doc-id="place.doc_id"
      @close="toggleEditModal()"
      @refresh="refreshReviews()"
    ></EditReviewDialog>
    <DeleteReviewDialog
      :dialog-view="showDeleteModal"
      :full-review="fullReview"
      :doc-id="place.doc_id"
      @close="toggleDeleteModal()"
      @refresh="refreshReviews()"
    ></DeleteReviewDialog>
    <v-card v-if="place.ratings.total > 0">
      <v-row>
        <v-col class="d-none d-md-flex">
          <v-card-title
            >Reviews
            <span class="reviews-length"
              >({{ place.ratings.total }})</span
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
            ><v-icon left>mdi-plus-circle-outline</v-icon> Write a review</v-btn
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div
        v-for="review in reviews"
        :key="'review-' + review.id"
        class="review"
      >
        <v-card-title class="review-username">{{ review.title }}</v-card-title>
        <v-card-subtitle class="review-created-on">{{
          review.createdOn | formatDate
        }}</v-card-subtitle>
        <v-card-text class="review-content">{{
          review.content | trimLength
        }}</v-card-text>
        <v-card-actions>
          <v-btn text @click="viewReview(review)">Read review</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="userReview(review)"
            text
            class="text-danger"
            @click="deleteReview(review)"
            >delete review</v-btn
          >
          <v-btn v-if="userReview(review)" text @click="editReview(review)"
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
  </section>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "@/firebase";
import moment from "moment";

import ViewReviewDialog from "@/components/place/dialogs/ViewReviewDialog";
import EditReviewDialog from "@/components/place/dialogs/EditReviewDialog";
import DeleteReviewDialog from "@/components/place/dialogs/DeleteReviewDialog";

export default {
  name: "place-reviews-section",
  data() {
    return {
      fullReview: {},
      showDetails: false,
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  props: {
    place: Object,
    reviews: Array
  },
  components: {
    ViewReviewDialog,
    EditReviewDialog,
    DeleteReviewDialog,
  },
  methods: {
    userReview(review) {
      if (this.userProfile.userId == review.userId) {
        return true;
      } else {
        return false;
      }
    },
    // likeReview(id, likesCount) {
    //   this.$store.dispatch("likeReview", { id, likesCount });
    // },
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
    refreshReviews() {
      this.$emit('refresh');
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
  computed: {
    ...mapState([["userProfile"], "loading"]),
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
</style>
