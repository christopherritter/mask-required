<template>
  <v-main id="close-buy">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4" class="shrink">
          <div class="card mt-3">
            <form class="card-body" @submit.prevent>
              <div class="alert alert-danger" v-show="error">{{ error }}</div>
              <div class="input-group mb-3">
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
              <div class="input-group mb-3">
                <select class="form-control col-md-6 mr-2" v-model="type">
                  <option value="restaurant">Restaurant</option>
                </select>

                <select class="form-control col-md-6 ml-2" v-model="radius">
                  <option value="5">5KM</option>
                  <option value="10">10KM</option>
                  <option value="15">15KM</option>
                  <option value="20">20KM</option>
                </select>
              </div>
              <button
                class="btn btn-primary"
                @click="findCloseBuyButtonPressed"
              >
                Find Close Buy
              </button>
            </form>
          </div>
          <ul class="list-group mt-3 mb-3">
            <li
              class="list-group-item list-group-item-action flex-column align-items-start"
              v-for="place in places"
              :key="place.id"
            >
              <h5 class="mb-1">{{ place.name }}</h5>
              <small class="text-muted">{{ place.vicinity }}</small>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="8" ref="map"></v-col>
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
      apiKey: "AIzaSyCHzVbXJqB_-tUwT2AeUGZ_-HRkvJOHjqI",
      lat: 0,
      lng: 0,
      type: "",
      radius: "",
      places: [],
    };
  },
  mounted() {
    /* eslint-disable */
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
    );
    /* eslint-enable */
  },
  methods: {
    /* eslint-disable */
    locatorButtonPressed() {
      this.spinner = true;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            this.error = "Can't find your address. Please enter it manually.";
            this.spinner = false;
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
        });
    },
    findCloseBuyButtonPressed() {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        this.lat
      },${this.lng}&type=${this.type}&radius=${this.radius * 1000}&key=${
        this.apiKey
      }`;

      axios
        .get(URL)
        .then((response) => {
          this.places = response.data.results;
          this.showPlacesOnMap();
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    showPlacesOnMap() {
      const map = new google.maps.Map(this.$refs["map"], {
        zoom: 15,
        center: new google.maps.LatLng(this.lat, this.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      const infoWindow = new google.maps.InfoWindow();

      for (let i = 0; i < this.places.length; i++) {
        const lat = this.places[i].geometry.location.lat;
        const lng = this.places[i].geometry.location.lng;

        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
        });

        google.maps.event.addListener(marker, "click", () => {
          infoWindow.setContent(
            `<div class="ui header">${this.places[i].name}</div>`
          );
          infoWindow.open(map, marker);
        });
      }
    },
    /* eslint-enable */
  },
};
</script>

<style lang="scss" scoped>
#map {
  position: absolute;
  top: -0.25rem;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}
</style>
