<template>
  <v-dialog v-model="dialogView" scrollable max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ fullReview.title || "Empty Review" }}</span>
      </v-card-title>

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

        {{ fullReview.content || "Nothing to show." }}

        <h6>Who was wearing masks? (optional)</h6>

        <span v-if="fullReview.masks">
          {{ fullReview.masks.employees }}
        </span>

        <span v-if="fullReview.masks">
          {{ fullReview.masks.customers }}
        </span>

        <h6>Could you say a little more about it? (optional)</h6>

        <div v-for="question in questions" :key="'question-' + question.id">
          {{ question.text }}
          <span v-if="fullReview.questions">{{
            fullReview.questions[question.id].value
          }}</span>
          <span v-else>No response</span>
        </div>

        <!-- Specific ratings -->

        <h6>Click to leave a rating</h6>

        <div v-for="rating in ratings" :key="'rating-' + rating.id">
          {{ rating.label }}

          <v-rating
            v-if="fullReview.ratings"
            v-model="fullReview.ratings[rating.id].value"
            dark
            size="25"
          ></v-rating>
        </div>
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
  watch: {
    dialogView(val) {
      !val && this.$emit("close");
    }
  },
  computed: {
    ...mapState([["masks"], ["questions"], ["ratings"]]),
  },
};
</script>
