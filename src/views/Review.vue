<template>
  <v-main>

    <!-- full post modal -->
    <transition name="fade">
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
              :key="comment.id"
              class="comment"
            >
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>

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
                  full-icon="mdi-circle"
                  half-icon="mdi-circle-half-full"
                  empty-icon="mdi-circle-outline"
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

              <!-- What kind of visit

              <h6>What sort of visit was this?</h6>
              <v-radio-group row>
                <v-radio label="Couples" value="couples"></v-radio>
                <v-radio label="Family" value="family"></v-radio>
                <v-radio label="Friends" value="friends"></v-radio>
                <v-radio label="Business" value="business"></v-radio>
                <v-radio label="Solo" value="solo"></v-radio>
              </v-radio-group> -->

              <h6>Who was wearing masks? (optional)</h6>
              <!-- Were employees wearing masks? -->

              <v-select
                :items="review.masks.employees"
                label="Were employees wearing masks?"
                outlined
              ></v-select>

              <!-- Were customers wearing masks? -->

              <v-select
                :items="review.masks.customers"
                label="Were customers wearing masks?"
                outlined
              ></v-select>

              <!-- Optional ratings -->

              <h6>Could you say a little more about it? (optional)</h6>
              <v-row v-for="question in review.questions" :key="question.id">
                <v-col sm="12" md="6">
                  {{ question.text }}
                </v-col>
                <v-col sm="12" md="6">
                  <v-radio-group row>
                    <v-radio
                      v-for="answer in question.answers"
                      :key="answer.id"
                      :label="answer.label"
                      :value="answer.value"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>

              <!-- Specific ratings -->

              <h6>Click to leave a rating</h6>
              <v-row>
                <v-col sm="12" md="6">
                  Friendliless
                </v-col>
                <v-col sm="12" md="6">
                  <v-rating
                    dark
                    size="25"
                    full-icon="mdi-circle"
                    half-icon="mdi-circle-half-full"
                    empty-icon="mdi-circle-outline"
                  ></v-rating>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="6">
                  Compliance
                </v-col>
                <v-col sm="12" md="6">
                  <v-rating
                    dark
                    size="25"
                    full-icon="mdi-circle"
                    half-icon="mdi-circle-half-full"
                    empty-icon="mdi-circle-outline"
                  ></v-rating>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="6">
                  Respect
                </v-col>
                <v-col sm="12" md="6">
                  <v-rating
                    dark
                    size="25"
                    full-icon="mdi-circle"
                    half-icon="mdi-circle-half-full"
                    empty-icon="mdi-circle-outline"
                  ></v-rating>
                </v-col>
              </v-row>

              <!-- Price of place
              <h6>How expensive is this restaurant?</h6>

              <v-radio-group row>
                <v-radio label="Cheap eats" value="cheap-eats"></v-radio>
                <v-radio label="Mid-range" value="mid-range"></v-radio>
                <v-radio label="Fine dining" value="fine-dining"></v-radio>
              </v-radio-group> -->

              <!-- What dishes do you recommend?

              <h6>What dish or dishes do you recommend?</h6>

              <v-text-field outlined name="review-title"></v-text-field> -->

              <!-- I certify this review -->

              <h6>Submit your review</h6>

              <v-checkbox
                label="I certify that this review is based on my own experience and is my genuine opinion of this restaurant, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review. I understand that Tripadvisor has a zero-tolerance policy on fake reviews."
              ></v-checkbox>

              <!-- Create Post button -->
              <v-btn
                @click="createReview()"
                class="mt-4"
                :disabled="review.content === ''"
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
              v-for="post in posts"
              :key="post.id"
              class="post"
              @click="viewPost(post)"
            >
              <v-card-text
                ><h6>{{ post.userName }}</h6>
                {{ post.createdOn | formatDate }}</v-card-text
              >
              <v-card-text>{{ post.content | trimLength }}</v-card-text>
              <v-card-actions>
                <v-btn text @click="likePost(post.id, post.likes)"
                  >likes {{ post.likes }}</v-btn
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
          employees: [
            "All of the employees were properly wearing masks",
            "Some of the employees were wearing some kind of mask",
            "Hardly any of the employees were wearing their masks properly",
            "None of the employees were properly wearing masks",
          ],
          customers: [
            "All of the customers were wearing masks",
            "Some of the customers were wearing masks",
            "Hardly any of the customers were wearing masks",
            "None of the customers were wearing masks",
          ],
        },
        questions: [
          {
            id: "0",
            text: "Did they limit the number of people inside the store?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "1",
            text: "Were you asked to stand back from the registers?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "2",
            text: "Were there any plastic shields protecting the cashiers?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "3",
            text: "Was there any hand sanitizer available to the customers?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "4",
            text: "Did they provide free masks to customers without one?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "5",
            text: "Did they regularly wipe down everything that customer use?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "6",
            text: "Do they have home delivery or curb-side pick-up options?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "7",
            text: "Did you see signs that clearly state the store policies?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "8",
            text: "Was someone enforcing store policies at the front door?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "9",
            text: "Were the customers spaced six feet apart from each other?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "10",
            text: "Were there physical barriers separating the customers?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
          {
            id: "11",
            text: "Did you see signs to direct the flow of traffic?",
            answers: [
              {
                id: "0",
                label: "Yes",
                value: "yes",
              },
              {
                id: "1",
                label: "No",
                value: "no",
              },
              {
                id: "2",
                label: "Unsure",
                value: "unsure",
              },
            ],
          },
        ],
        ratings: ["Friendliness", "Compliance", "Respect"],
      },
      post: {
        content: "",
      },
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
      showTooltip: true,
    };
  },
  mounted() {
    this.$store.state.showSearch = true;
  },
  computed: {
    ...mapState(["userProfile", "place", ["reviews"], ["posts"]]),
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
      });
      this.review.content = "";
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
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
