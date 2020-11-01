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
        <v-list-item two-line v-else-if="place.address">
          <v-list-item-content>
            <v-list-item-title>Address</v-list-item-title>
            <v-list-item-subtitle>
              {{ place.address.street_number }}
              {{ place.address.route }},
              {{ place.address.locality }},
              {{ place.address.state }}
              {{ place.address.postal_code }}
            </v-list-item-subtitle>
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
        <v-list-item two-line v-else-if="place.address">
          <v-list-item-content>
            <v-list-item-title>Plus code</v-list-item-title>
            <v-list-item-subtitle>{{
              place.address.plus_code
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
      this.showGeometry();
    } else if (this.place.location) {
      this.showLocation();
    }
  },
  watch: {
    place() {
      this.loading = true;
      if (this.place.geometry) {
        this.showGeometry();
      } else if (this.place.location) {
        this.showLocation();
      }
    },
  },
  methods: {
    async showGeometry() {
      var location = this.$store.getters.getPlaceLocation;

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
    async showLocation() {
      let map = await new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(this.place.location.lat, this.place.location.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      new google.maps.Marker({
        position: new google.maps.LatLng(this.place.location.lat, this.place.location.lng),
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
