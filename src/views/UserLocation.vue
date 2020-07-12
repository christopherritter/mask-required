<template>
  <main id="user-location" class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-sm-4">
        <form class="ui segment large form" @submit.prevent>
          <div class="ui message red" v-show="error">{{ error }}</div>
          <div class="ui segment">
            <div class="field">
              <div
                class="ui right icon input large"
                :class="{ loading: spinner }"
              >
                <input
                  type="text"
                  placeholder="Enter your address"
                  v-model="address"
                  id="autocomplete"
                />
                <i class="dot circle link icon" @click="locatorButtonPressed"></i>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div id="map"></div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
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
      this.showUserLocationOnTheMap(place.geometry.location.lat(), place.geometry.location.lng());
    })
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
              position.coords.longitude);
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
            "&key=AIzaSyCHzVbXJqB_-tUwT2AeUGZ_-HRkvJOHjqI"
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            // console.log(response.data.error_message)
          } else {
            this.address = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
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
        center: new google.maps.LatLng( latitude, longitude ),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      new google.maps.Marker({
        position: new google.maps.LatLng( latitude, longitude ),
        map: map
      })
    }
    /* eslint-enable */
  },
};
</script>
