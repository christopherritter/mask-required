<template>
  <v-dialog v-model="dialogView" scrollable max-width="600px">
    <v-card>
      <v-card-title v-if="fullReview.place">
        {{ fullReview.place.name }}
      </v-card-title>

      <v-card-subtitle class="pt-2" v-if="fullReview.place">
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

        <h4 class="mb-2">{{ fullReview.title }}</h4>

        <p>{{ fullReview.content || "Nothing to show." }}</p>

        <div v-if="fullReview.masks">
          <h4 class="mt-6 mb-4">Who was wearing masks?</h4>

          <p>{{ fullReview.masks.employees }}</p>

          <p>{{ fullReview.masks.customers }}</p>
        </div>

        <div v-if="fullReview.questions">
          <h4 class="mt-6 mb-2">Additional Information</h4>

          <v-row v-for="question in questions" :key="'question-' + question.id">
            <v-col cols="10">{{ question.text }}</v-col>
            <v-col cols="2">{{
              fullReview.questions[question.id].value | capitalize
            }}</v-col>
          </v-row>
        </div>

        <!-- Specific ratings -->

        <div v-if="fullReview.ratings" class="mb-8">
          <h4 class="mt-6 mb-2">Specific Ratings</h4>

          <v-row
            v-for="rating in ratings"
            :key="'rating-' + rating.id"
            style="flex-wrap: nowrap;"
          >
            <v-col
              cols="3"
              class="d-flex align-center flex-grow-1 flex-shrink-0 py-0"
              >{{ rating.label }}</v-col
            >
            <v-col class="flex-grow-0 flex-shrink-1 py-0" cols="9"
              ><v-rating
                readonly
                v-model="fullReview.ratings[rating.id].value"
                dark
                size="25"
              ></v-rating
            ></v-col>
          </v-row>
        </div>
      </v-card-text>

      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>Disagree</v-btn>
        <v-btn @click="$emit('close')" text>Agree</v-btn>
      </v-card-actions> -->
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
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
