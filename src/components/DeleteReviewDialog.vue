<template>
  <v-dialog v-model="dialogView" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Delete Review</span>
      </v-card-title>
      <v-card-text>
        Are you sure you want to delete this review? <span class="subtitle">This cannot be undone.</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary darken-1" @click="$emit('close')" text></v-btn>
        <v-btn color="green darken-1" @click="deleteReview(fullReview)" text>Delete review</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialogView', 'fullReview'],
  methods: {
    deleteReview(review){
      this.$store.dispatch("deleteReview", review);
      this.$emit('close');
    }
  }
};
</script>