<template>
  <v-container id="reviews" fluid>
    <v-row no-gutters>
      <v-col
        id="sidebar"
        cols="12"
        md="4"
      ></v-col>
      <v-col
        id="map"
        cols="12"
        md="8"
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Reviews",
  computed: {
    reviewsHeight() {
      const reviewsDOM = document.getElementById("reviews");
      return reviewsDOM ? reviewsDOM.offsetHeight : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
#reviews {
  position: absolute;
  top: 3.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  max-width: none;
}
#sidebar {
  background-color: red;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
#map {
  background-color: blue;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
