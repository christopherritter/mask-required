<template>
  <section id="placeHeader" class="place-header">
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

      <v-divider vertical class="ma-2 hidden-sm-and-down">|</v-divider>

      <v-chip-group show-arrows class="px-0">
        <v-chip
          small
          color="white"
          :ripple="false"
          v-for="(type, index) in place.types"
          :key="index"
          >{{ type | replaceUnderscore }}</v-chip
        >
      </v-chip-group>
      <!-- <v-chip-group show-arrows class="px-0">
        <v-chip
          small
          color="white"
          v-for="(type, index) in place.types"
          :key="index"
          @click="findNearbyPlaces(type)"
          :value="type"
          >{{ type | replaceUnderscore }}</v-chip
        >
      </v-chip-group> -->
    </v-row>
  </section>
</template>

<script>
export default {
  name: "place-header",
  data() {
    return {
      // userLocation: {
      //   lat: null,
      //   long: null,
      // },
    };
  },
  props: {
    place: Object,
  },
  // async created() {
  //   // find address component with locality and administrative_area_level_1 type
  //   var a, t, addressComponents = this.place.address_components;

  //   function findLocality() {
  //     for (a = 0; a < addressComponents.length; a++) {
  //       for (t = 0; t < addressComponents[a].types.length; t++) {
  //         if ((addressComponents[a].types[t] == "locality")) {
  //           return addressComponents[a]
  //         }
  //       }
  //     }
  //   }

  //   function findState() {
  //     for (a = 0; a < addressComponents.length; a++) {
  //       for (t = 0; t < addressComponents[a].types.length; t++) {
  //         if ((addressComponents[a].types[t] == "administrative_area_level_1")) {
  //           return addressComponents[a]
  //         }
  //       }
  //     }
  //   }

  //   var localityObj = findLocality();
  //   var stateObj = findState();

  //   console.log("Here's the locality:")
  //   console.log(localityObj.long_name);

  //   console.log("Here's the state:")
  //   console.log(stateObj.long_name);

  //   // get the location of the locality and administrative_area_level_1 from Google Places

  //   console.log("Fetching region by address.");

  //   await this.$store.dispatch("fetchRegionByAddress", { locality: localityObj, state: stateObj } );
  //   var newRegion = this.$store.getters.getRegion;
  //   // set the location of the locality and administrative_area_level_1 in store
  // },
  methods: {
    async findNearbyPlaces(type) {
      await this.$store.dispatch("findNearbyPlaces", type);
      this.$router.push({
        name: "nearby-places-type",
        params: { id: this.place.place_id, name: type },
      });
    },
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
