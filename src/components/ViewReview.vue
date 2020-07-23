<template>
  <v-dialog v-model="dialogView" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ fullReview.title || "Empty Review" }}</span>
      </v-card-title>

      <v-rating
        v-model="fullReview.rating"
        dark
        hover
        color="green"
        background-color="green lighten-2"
        size="35"
        class="mb-5"
      ></v-rating>

      <v-card-text>
        {{ fullReview.content || "Nothing to show." }}
      </v-card-text>

      <v-card-subtitle>Who was wearing masks? (optional)</v-card-subtitle>

      <v-card-text v-if="fullReview.masks">
        {{ fullReview.masks.employees }}
      </v-card-text>

      <v-card-text v-if="fullReview.masks">
        {{ fullReview.masks.customers }}
      </v-card-text>

      <v-card-subtitle
        >Could you say a little more about it? (optional)</v-card-subtitle
      >

      <v-card-text
        v-for="question in questions"
        :key="'question-' + question.id"
      >
        {{ question.text }}
        <span v-if="fullReview.questions">{{
          fullReview.questions[question.id].value
        }}</span>
        <span v-else>No response</span>
      </v-card-text>

      <!-- Specific ratings -->

      <v-card-subtitle>Click to leave a rating</v-card-subtitle>

      <v-card-text v-for="rating in ratings" :key="'rating-' + rating.id">
        {{ rating.label }}

        <v-rating
          v-if="fullReview.ratings"
          v-model="fullReview.ratings[rating.id].value"
          dark
          size="25"
        ></v-rating>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" @click="$emit('close')" text
          >Disagree</v-btn
        >
        <v-btn color="green darken-1" @click="$emit('close')" text>Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["dialogView", "fullReview"],
  computed: {
    ...mapState([["masks"], ["questions"], ["ratings"]]),
  },
};
</script>
