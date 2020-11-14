<template>
  <v-main>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row id="review-header">
          <v-col class="px-6">
            <h3>{{ place.name }}</h3>
            <p>{{ place.formatted_address }}</p>
          </v-col>
        </v-row>
        <v-stepper v-model="stepper" vertical>
          <template>
            <v-stepper-step step="1" editable>
              Review your customer experience.
            </v-stepper-step>

            <v-stepper-content :key="`1-content`" step="1">
              <v-card flat>
                <v-select
                  v-model="review.rating"
                  outlined
                  :items="value"
                  :rules="[rules.required, rules.rating]"
                  label="How would you rate this place?"
                  required
                ></v-select>
                <v-text-field
                  :rules="[rules.required, rules.counter]"
                  outlined
                  counter
                  maxlength="80"
                  name="review-title"
                  label="How would you summarize your visit?"
                  v-model="review.title"
                  required
                ></v-text-field>
                <v-textarea
                  outlined
                  name="review-text"
                  label="Tell us more about your experience."
                  v-model="review.content"
                ></v-textarea>
              </v-card>
            </v-stepper-content>
          </template>
          <template>
            <v-stepper-step step="2" editable>
              Who was wearing masks?
            </v-stepper-step>

            <v-stepper-content :key="`2-content`" step="2">
              <v-card flat>
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
              </v-card>
            </v-stepper-content>
          </template>
          <template>
            <v-stepper-step step="3" editable>
              Could you say a little more about it?
            </v-stepper-step>

            <v-stepper-content :key="`3-content`" step="3">
              <v-card flat>
                <v-row
                  v-for="question in questions"
                  :key="'question-' + question.id"
                >
                  <v-col sm="12" md="6">
                    {{ question.text }}
                  </v-col>
                  <v-col sm="12" md="6" class="d-flex justify-end">
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
              </v-card>
            </v-stepper-content>
          </template>
          <template>
            <v-stepper-step step="4" editable>
              Click to leave a rating
            </v-stepper-step>

            <v-stepper-content :key="`4-content`" step="4">
              <v-card flat>
                <v-row
                  v-for="rating in ratings"
                  :key="'rating-' + rating.id"
                  style="flex-wrap: nowrap;"
                >
                  <v-col
                    sm="12"
                    md="6"
                    class="d-flex align-stretch flex-grow-0 flex-shrink-1"
                  >
                    {{ rating.label }}
                  </v-col>
                  <v-col sm="12" md="6" class="flex-grow-1 flex-shrink-0">
                    <v-rating
                      :rules="[rules.required]"
                      v-model="review.ratings[rating.id].value"
                      dark
                      size="30"
                    ></v-rating>
                  </v-col>
                  <v-col class="flex-grow-0 flex-shrink-1"
                    ><v-list-item-icon class="mr-2">
                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" small
                            >mdi-information</v-icon
                          >
                        </template>
                        <span>{{ rating.description }}</span>
                      </v-tooltip>
                    </v-list-item-icon></v-col
                  >
                </v-row>
              </v-card>
            </v-stepper-content>
          </template>
          <template>
            <v-stepper-step step="5" editable>
              Certify your review
              <small class="red--text">Required</small>
            </v-stepper-step>

            <v-stepper-content :key="`5-content`" step="5">
              <v-card flat>
                <p class="text-subtitle-2">
                  This review is based on my own experience and is my genuine
                  opinion of this business. I have no personal or professional
                  relationship with this business, and have not been offered any
                  incentive or payment originating from the business to write
                  this review.
                </p>

                <v-checkbox
                  v-model="review.agreement"
                  label="I certify the above statement is true."
                ></v-checkbox>
              </v-card>
            </v-stepper-content>
          </template>
        </v-stepper>
        <v-row>
          <v-col class="d-md-flex flex-row">
            <v-btn
              class="mt-4"
              @click="nextStep"
              color="green darken-2"
              dark
              :block="isMobile"
            >
              Next step
            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn
              @click="createReview(place)"
              class="mt-4 ml-md-2"
              :disabled="!review.agreement"
              color="primary"
              :block="isMobile"
            >
              Submit review
            </v-btn>
            <v-btn
              @click="cancelReview(place)"
              class="mt-4 ml-2"
              :block="isMobile"
              text
            >
              Cancel review
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "review",
  data() {
    return {
      currentPlace: {},
      stepper: 1,
      steps: 5,
      review: {
        rating: null,
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
      value: [
        { text: "5 - Perfect example of a safe business.", value: 5 },
        { text: "4 - Not perfect but a good place to shop.", value: 4 },
        { text: "3 - Could definitely use some improvement.", value: 3 },
        { text: "2 - Not exactly my favorite place to shop.", value: 2 },
        { text: "1 - I would rather do business elsewhere.", value: 1 },
      ],
      valid: true,
    };
  },
  async created() {
    this.$store.dispatch("showSearchBar", true);
    await this.$store.dispatch("fetchPlace", {
      place_id: this.place.place_id,
    });

    await this.$store.dispatch("fetchReviews", this.place.place_id);

    const newPlace = this.$store.getters.getPlace;
    this.currentPlace = newPlace;
    this.$ga.page(this.$router);
  },
  watch: {
    steps(val) {
      if (this.stepper > val) {
        this.stepper = val;
      }
    },
  },
  computed: {
    ...mapState([
      "userProfile",
      "place",
      ["reviews"],
      "masks",
      ["questions"],
      ["ratings"],
      "rules",
    ]),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val);
    },
    nextStep() {
      if (this.stepper === this.steps) {
        this.stepper = 1;
      } else {
        this.stepper++;
      }
    },
    fetchPlace(place) {
      this.$store.dispatch("fetchPlace", place);
    },
    createReview(place) {
      if (this.$refs.form.validate()) {
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
        this.$refs.form.reset();
        this.$store.dispatch("updateRatings", place.doc_id);
        this.$router.push({ name: "place", params: { id: place.place_id } });
      } else {
        this.$vuetify.goTo("form");
      }
    },
    likeReview(id, likesCount) {
      this.$store.dispatch("likeReview", { id, likesCount });
    },
    cancelReview(place) {
      this.$refs.form.reset();
      this.$router.push({ name: "place", params: { id: place.place_id } });
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
