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
        <v-rating
          v-model="fullReview.rating"
          dark
          hover
          color="green"
          background-color="green lighten-2"
          size="35"
          class="mb-5"
        ></v-rating>

        <h5>{{ fullReview.title }}</h5>

        <p>{{ fullReview.content || "Nothing to show." }}</p>

        <div v-if="fullReview.masks">
          <h6>Who was wearing masks? (optional)</h6>

          <p>{{ fullReview.masks.employees }}</p>

          <p>{{ fullReview.masks.customers }}</p>
        </div>

        <div v-if="fullReview.questions">
          <h6>Could you say a little more about it? (optional)</h6>

          <div v-for="question in questions" :key="'question-' + question.id">
            {{ question.text }} {{ fullReview.questions[question.id].value }}
          </div>
        </div>

        <!-- Specific ratings -->

        <div v-if="fullReview.ratings">
          <h6>Click to leave a rating</h6>

          <div v-for="rating in ratings" :key="'rating-' + rating.id">
            {{ rating.label }}

            <v-rating
              v-model="fullReview.ratings[rating.id].value"
              dark
              size="25"
            ></v-rating>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>Disagree</v-btn>
        <v-btn @click="$emit('close')" text>Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["dialogView", "fullReview"],
  watch: {
    dialogView(val) {
      !val && this.$emit("close");
    },
  },
  computed: {
    ...mapState([["masks"], ["questions"], ["ratings"]]),
  },
};
</script>
