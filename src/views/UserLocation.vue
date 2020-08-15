<template>
  <v-main id="user-location" class="container-fluid">
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col>
          <div class="card mt-3">
            <form @submit.prevent class="card-body">
              <div class="alert alert-danger" v-show="error">{{ error }}</div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your address"
                  v-model="address"
                  id="autocomplete"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    :class="{ loading: spinner }"
                    @click="locatorButtonPressed"
                    type="button"
                  >
                    <i class="fas fa-map-marker-alt"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div id="map"></div>
        </v-col>
      </v-row>
    </v-container>
    
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      apiKey: process.env.VUE_APP_GOOGLE_API
    };
  },
  mounted() {
    /* eslint-disable */
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
      // {
      //   bounds: new google.maps.LatLngBounds(
      //     new google.maps.LatLng(40.367474, -82.996216)
      //   )
      // }
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      // console.log(place);
      this.showUserLocationOnTheMap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
    /* eslint-enable */
  },
  methods: {
    locatorButtonPressed() {
      this.spinner = true;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
            this.showUserLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            this.error = "Can't find your address. Please enter it manually.";
            this.spinner = false;
            console.log(error.message);
          }
        );
      } else {
        this.error = "Your browser does not support Geolocation API";
        this.spinner = false;
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/" +
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=" +
            this.apiKey
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
          } else {
            this.address = response.data.results[0].formatted_address;
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.spinner = false;
          // console.log(error.message);
        });
    },
    /* eslint-disable */
    showUserLocationOnTheMap(latitude, longitude) {
      // Create a map object
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },
    /* eslint-enable */
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 500px;
}
</style>
