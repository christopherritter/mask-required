<template>
  <v-dialog v-model="dialogView" scrollable max-width="600px">
    <v-card>
      <v-card-title v-if="fullReview.place">
        {{ place.name }}
      </v-card-title>

      <v-card-subtitle class="pt-2" v-if="fullReview.place">
        {{ place.formatted_address }}
      </v-card-subtitle>

      <v-card-text class="mb-6">
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
            <h4 class="mb-2">Who was wearing masks?</h4>

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
            <h4 class="mt-6 mb-2">Additional Information</h4>

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
            <h4 class="mt-6 mb-2">Specific Ratings</h4>

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

          <h4 class="mt-6 mb-2">Certify your review</h4>

          <p class="text-subtitle-2">
            This review is based on my own experience and is my genuine opinion
            of this restaurant. I have no personal or business relationship with
            this establishment, and have not been offered any incentive or
            payment originating from the establishment to write this review.
          </p>

          <v-checkbox
            v-model="fullReview.agreement"
            label="I certify the above statement is true."
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
  props: ["dialogView", "fullReview", "docId"],
  computed: {
    ...mapState([["masks"], ["questions"], ["ratings"], "place"]),
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
        docId: this.docId,
      });
      this.$store.dispatch("updateRatings", this.docId);
      this.$emit('refresh');
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
