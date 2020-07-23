<template>
  <v-dialog v-model="dialogView" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ fullReview.title || "Empty Review" }}</span>
      </v-card-title>
      <v-card-text>
        {{ fullReview.content || "Nothing to show." }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" @click="$emit('close')" text>Disagree</v-btn>
        <v-btn color="green darken-1" @click="$emit('close')" text>Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      fullReview: {},
    };
  },
  props: ['dialogView'],
};
</script>
