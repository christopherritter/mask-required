<template>
  <v-main>
    <!-- full post modal -->
    <!-- <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">close</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li>
                <a>comments {{ fullPost.comments }}</a>
              </li>
              <li>
                <a>likes {{ fullPost.likes }}</a>
              </li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div
              v-for="comment in postComments"
              :key="'comment-' + comment.id"
              class="comment"
            >
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition> -->

    <v-container id="place" fluid>
      <v-row>
        <v-col cols="12" md="8">
          <div class="create-review">
            <form @submit.prevent>
              <!-- Place header -->
              <div class="place-header">
                <h3>{{ place.name }}</h3>
                <p>{{ place.formatted_address }}</p>
              </div>

              <!-- Content of review -->
              <div>
                <h6>Your overall rating of this place.</h6>
                <v-rating
                  v-model="review.rating"
                  dark
                  hover
                  color="green"
                  background-color="green lighten-2"
                  size="35"
                  class="mb-5"
                ></v-rating>
              </div>

              <!-- Title of review -->
              <v-text-field
                outlined
                name="review-title"
                label="Title of your review"
                v-model="review.title"
                placeholder="Summarize your visit or highlight an important detail"
              ></v-text-field>
              <v-textarea
                outlined
                name="review-text"
                label="Your review"
                v-model.trim="review.content"
                placeholder="Tell others about your experience. Did you see people wearing masks?"
              ></v-textarea>

              <h6>Who was wearing masks? (optional)</h6>

              <v-select
                :items="masks.employees"
                v-model="review.masks.employees"
                label="Were employees wearing masks?"
                outlined
              ></v-select>

              <v-select
                :items="masks.customers"
                v-model="review.masks.customers"
                label="Were customers wearing masks?"
                outlined
              ></v-select>

              <!-- Optional ratings -->

              <h6>Could you say a little more about it? (optional)</h6>

              <v-row
                v-for="question in questions"
                :key="'question-' + question.id"
              >
                <v-col sm="12" md="6">
                  {{ question.text }}
                </v-col>
                <v-col sm="12" md="6">
                  <v-radio-group
                    row
                    v-model="review.questions[question.id].value"
                  >
                    <v-radio
                      v-for="answer in question.answers"
                      :key="'answer-' + answer.id"
                      :label="answer.label"
                      :value="answer.value"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>

              <!-- Specific ratings -->

              <h6>Click to leave a rating</h6>

              <v-row v-for="rating in ratings" :key="'rating-' + rating.id">
                <v-col sm="12" md="6">
                  {{ rating.label }}
                </v-col>
                <v-col sm="12" md="6">
                  <v-rating
                    v-model="review.ratings[rating.id].value"
                    dark
                    size="25"
                  ></v-rating>
                </v-col>
              </v-row>

              <!-- I certify this review -->

              <h6>Submit your review</h6>

              <v-checkbox
                v-model="review.agreement"
                label="I certify that this review is based on my own experience and is my genuine opinion of this restaurant, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review. I understand that Tripadvisor has a zero-tolerance policy on fake reviews."
              ></v-checkbox>

              <!-- Create Post button -->

              <v-btn
                @click="createReview()"
                class="mt-4"
                :disabled="!review.agreement"
                color="primary"
              >
                Submit Your Review
              </v-btn>
            </form>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <v-card v-if="reviews.length">
            <div
              v-for="review in reviews"
              :key="'review-' + review.id"
              class="review"
              @click="viewReview(review)"
            >
              <v-card-text
                ><h6>{{ review.title }}</h6>
                {{ review.createdOn | formatDate }}</v-card-text
              >
              <v-card-text>{{ review.content | trimLength }}</v-card-text>
              <v-card-actions>
                <v-btn text @click="likeReview(review.id, review.likes)"
                  >likes {{ review.likes }}</v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
            </div>
          </v-card>
          <v-card v-else>
            <v-card-text class="no-results"
              >There are currently no reviews.</v-card-text
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

export default {
  data() {
    return {
      address: null,
      review: {
        rating: 0,
        title: "",
        content: "",
        masks: {
          employees: "",
          customers: "",
        },
        questions: [
          { id: 0, value: "" },
          { id: 1, value: "" },
          { id: 2, value: "" },
          { id: 3, value: "" },
          { id: 4, value: "" },
          { id: 5, value: "" },
          { id: 6, value: "" },
          { id: 7, value: "" },
          { id: 8, value: "" },
          { id: 9, value: "" },
          { id: 10, value: "" },
          { id: 11, value: "" },
        ],
        ratings: [
          { id: 0, value: 0 },
          { id: 1, value: 0 },
          { id: 2, value: 0 },
        ],
        agreement: false,
      },
      agreement: false,
    };
  },
  mounted() {
    this.$store.state.showSearch = true;
  },
  computed: {
    ...mapState([
      "userProfile",
      "place",
      ["reviews"],
      "masks",
      ["questions"],
      ["ratings"],
    ]),
  },
  methods: {
    selectPlace(place) {
      this.$store.dispatch("selectPlace", place);
    },
    createReview() {
      this.$store.dispatch("createReview", {
        rating: this.review.rating,
        title: this.review.title,
        content: this.review.content,
        masks: {
          employees: this.review.masks.employees,
          customers: this.review.masks.customers,
        },
        questions: this.review.questions,
        ratings: this.review.ratings,
        agreement: this.review.agreement,
      });
      this.review.rating = 0;
      this.review.title = "";
      this.review.content = "";
      this.review.masks = {
        employees: "",
        customers: "",
      };
      this.review.questions = [
        { id: 0, value: "" },
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
        { id: 5, value: "" },
        { id: 6, value: "" },
        { id: 7, value: "" },
        { id: 8, value: "" },
        { id: 9, value: "" },
        { id: 10, value: "" },
        { id: 11, value: "" },
      ];
      this.review.ratings = [
        { id: 0, value: 0 },
        { id: 1, value: 0 },
        { id: 2, value: 0 },
      ];
      this.review.agreement = false;
      this.$router.push("place");
    },
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
