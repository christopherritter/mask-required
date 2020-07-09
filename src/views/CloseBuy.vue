<template>
  <div class="six wide column">
    <form class="ui segment large form">
      <div class="ui segment">
        <div class="field">
          <div class="ui right icon input large">
            <input
              type="text"
              placeholder="Enter your address"
              v-model="coordinates"
            />
            <i class="dot circle link icon" @click="locatorButtonPressed"></i>
          </div>
        </div>
        <div class="field">
          <div class="two fields">
            <div class="field">
              <select v-model="type">
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            <div class="field">
              <select v-model="radius">
                <option value="5">5 KM</option>
                <option value="10">10 KM</option>
                <option value="15">15 KM</option>
                <option value="20">20 KM</option>
              </select>
            </div>
          </div>
        </div>
        <button class="ui button" @click="findCloseBuyButtonPressed">
          Find CloseBuy
        </button>
      </div>
    </form>
    <div class="ui segment" style="max-height:500px;overflow:scroll">
      <div class="ui divided items">
        <div class="item" v-for="place in places" :key="place.id">
          <div class="content">
            <div class="header">{{ place.name }}</div>
            <div class="meta">{{ place.vicinity }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      type: "",
      radius: "",
      places: [],
    };
  },
  computed: {
    coordinates() {
      return `${this.lat}, ${this.lng}`;
    },
  },
  methods: {
    /* eslint-disable */
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        },
        (error) => {
          console.log("Error getting location");
        }
      );
    },
    /* eslint-enable */
    findCloseBuyButtonPressed() {
      const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDfwF-xQ0RLDqNcOmPy6Xhp-b0OvPvgJ_c`;
      axios
        .get(URL)
        .then((response) => {
          this.places = response.data.results;
          // this.addLocationsToGoogleMaps();
        })
        .catch((error) => {
          console.log(error.message);
          console.log('Places: ' + this.places.length);
        });
    },
  },
};
</script>
