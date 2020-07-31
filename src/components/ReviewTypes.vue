<template>
  <v-row>
    <v-col
      v-for="type in typesToDisplay"
      :key="type"
      class="d-flex align-stretch"
    >
      <v-card
        outlined
        width="100%"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <v-card-text>{{ type }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isLoadingTypes: false,
      showLessTypes: true,
      hover: false
    };
  },
  computed: {
    typesToDisplay: function() {
      if (this.showLessTypes) {
        return this.types.slice(0, 7);
      } else {
        return this.types;
      }
    },
  },
  props: ["types"],
  methods: {
    getTypes: function() {
      return this.types;
    },
  },
  created: function() {
    this.getTypes();
  },
};
</script>

<style lang="scss" scoped></style>
