<template>
  <div id="placeHeader" class="place-header">
    <v-row no-gutters>
      <h3>{{ place.name }}</h3>
    </v-row>

    <v-row no-gutters>
      <v-card-text class="pa-0">{{ place.formatted_address }}</v-card-text>
    </v-row>
    <v-row no-gutters align="center" justify="start">
      <v-rating
        v-if="place.reviews && place.reviews.length > 0"
        v-model="place.ratings.general"
        background-color="yellow"
        color="yellow accent-4"
        length="5"
        dense
        half-increments
        hover
        size="18"
        readonly
        class="mb-1"
      ></v-rating>

      <v-rating
        v-else
        background-color="gray"
        color="gray accent-4"
        length="5"
        dense
        half-increments
        hover
        size="18"
        readonly
        class="mb-1"
      ></v-rating>

      <v-chip
        v-if="place.reviews && place.reviews.length > 0"
        small
        color="white"
        :ripple="false"
      >
        {{ place.reviews.length }} reviews
      </v-chip>

      <v-chip v-else small color="white" :ripple="false">
        0 reviews
      </v-chip>

      <v-divider vertical class="ma-2">|</v-divider>

      <v-chip-group v-if="userLocation" show-arrows class="px-0">
        <v-chip
          small
          color="white"
          v-for="(t, index) in place.types"
          :key="index"
          @click="findNearbyPlaces(t)"
          :value="t"
          >{{ t | replaceUnderscore }}</v-chip
        >
      </v-chip-group>

      <v-chip-group v-else show-arrows class="px-0">
        <v-chip
          disabled
          small
          color="white"
          v-for="(t, index) in place.types"
          :key="index"
          >{{ t | replaceUnderscore }}</v-chip
        >
      </v-chip-group>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "place-header",
  data() {
    return {
      userLocation: false,
    };
  },
  props: {
    place: Object,
  },
  created() {
    if (this.$store.state.userLocation.lat === null) {
      this.$store.dispatch("fetchUserLocation");
    } else {
      this.userLocation = true;
    }
  },
  filters: {
    replaceUnderscore(val) {
      var i,
        frags = val.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    },
  },
};
</script>
