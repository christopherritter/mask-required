<template>
  <section>
    <v-card>
      <v-card-title>Location and address</v-card-title>
      <div id="map"></div>
      <v-list dense>
        <v-list-item two-line v-if="place.formatted_address">
          <v-list-item-content>
            <v-list-item-title>Address</v-list-item-title>
            <v-list-item-subtitle>{{
              place.formatted_address
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line v-if="place.plus_code">
          <v-list-item-content>
            <v-list-item-title>Plus code</v-list-item-title>
            <v-list-item-subtitle>{{
              place.plus_code.compound_code
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "place-location",
  props: {
    place: Object,
  },
  created() {
    if (this.place.geometry) {
      this.showLocation();
    }
  },
  watch: {
    place() {
      this.loading = true;
      if (this.place.geometry) {
        this.showLocation();
      }
    },
  },
  methods: {
    async showLocation() {
      var location = this.$store.getters.getPlaceLocation;

      // Create a map object
      let map = await new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(location.lat, location.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 8rem;
}
</style>
