<template>
  <v-dialog v-model="dialogView" scrollable max-width="600px">
    <v-card>
      <v-card-title v-if="fullReview.place">
        {{ fullReview.place.name }}
      </v-card-title>

      <v-card-subtitle v-if="fullReview.place">
        {{ fullReview.place.formatted_address }}
      </v-card-subtitle>

      <v-card-text>
        <form @submit.prevent>
          <!-- Content of review -->
          <div>
            <v-rating
              :rules="rules"
              v-model="fullReview.rating"
              dark
              hover
              color="green"
              background-color="green lighten-2"
              size="35"
              class="mb-5"
            ></v-rating>
          </div>

          <v-text-field
            :rules="rules"
            outlined
            name="review-title"
            label="Title of your review"
            v-model="fullReview.title"
            placeholder="Summarize your visit or highlight an important detail"
          ></v-text-field>
          <v-textarea
            :rules="rules"
            outlined
            name="review-text"
            label="Your review"
            v-model.trim="fullReview.content"
            placeholder="Tell others about your experience. Did you see people wearing masks?"
          ></v-textarea>

          <div v-if="fullReview.masks">
            <h6>Who was wearing masks? (optional)</h6>

            <v-select
              :items="masks.employees"
              v-model="fullReview.masks.employees"
              label="Were employees wearing masks?"
              outlined
            ></v-select>

            <v-select
              :items="masks.customers"
              v-model="fullReview.masks.customers"
              label="Were customers wearing masks?"
              outlined
            ></v-select>
          </div>

          <!-- Optional ratings -->

          <div v-if="fullReview.questions">
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
                  v-model="fullReview.questions[question.id].value"
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
          </div>

          <!-- Specific ratings -->

          <div v-if="fullReview.ratings">
            <h6>Click to leave a rating</h6>

            <v-row v-for="rating in ratings" :key="'rating-' + rating.id">
              <v-col sm="12" md="6">
                {{ rating.label }}
              </v-col>
              <v-col sm="12" md="6">
                <v-rating
                  v-model="fullReview.ratings[rating.id].value"
                  dark
                  size="25"
                ></v-rating>
              </v-col>
            </v-row>
          </div>

          <!-- I certify this review -->

          <h6>Submit your review</h6>

          <v-checkbox
            v-model="fullReview.agreement"
            label="I certify that this review is based on my own experience and is my genuine opinion of this restaurant, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review."
          ></v-checkbox>

          <!-- Create Post button -->

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$emit('close')">
              Cancel
            </v-btn>
            <v-btn
              @click="editReview()"
              :disabled="!fullReview.agreement"
              color="success"
            >
              Update review
            </v-btn>
          </v-card-actions>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        // (value) => (value || "").length <= 20 || "Max 20 characters",
        // (value) => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
      ],
    };
  },
  props: ["dialogView", "fullReview"],
  computed: {
    ...mapState([["masks"], ["questions"], ["ratings"]]),
  },
  watch: {
    dialogView(val) {
      !val && this.$emit("close");
    },
  },
  methods: {
    editReview() {
      this.$store.dispatch("editReview", {
        id: this.fullReview.id,
        rating: this.fullReview.rating,
        title: this.fullReview.title,
        content: this.fullReview.content,
        masks: {
          employees: this.fullReview.masks.employees,
          customers: this.fullReview.masks.customers,
        },
        questions: this.fullReview.questions,
        ratings: this.fullReview.ratings,
        agreement: this.fullReview.agreement,
      });
      this.$emit("close");
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
