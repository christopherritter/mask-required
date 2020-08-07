<template>
  <v-main class="mt-0">
    <v-container>
      <!-- <place-types></place-types> -->
      <v-row>
        <v-col>
          <v-card class="p-4 jumbotron text-center" color="#c5f9da">
            <v-row>
              <v-col cols="12" md="5" class="hidden-sm-and-down">
                <svg-img
                  class="jumbotron-image"
                  icon="social-distancing"
                ></svg-img>
              </v-col>
              <v-col md="7">
                <div class="jumbotron-text">
                  <h2 class="jumbotron-header">Find a safe place to shop.</h2>
                  <v-text-field
                    class="px-4 pb-2 jumbotron-search"
                    v-model="address"
                    id="home-autocomplete"
                    solo
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Enter business name or category"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SvgImg from "@/components/Svg-img";
// import PlaceTypes from "@/components/PlaceTypes";

export default {
  name: "Home",
  data: () => ({
    address: null,
    target: false,
    spinner: false,
  }),
  methods: {
    fetchPlace(place) {
      this.$store.dispatch("fetchPlace", place);
    },
    locatorButtonPressed() {
      this.spinner = true;
      this.target = true;
      console.log("Locator button pressed!")

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            this.error = "Can't find your address. Please enter it manually.";
            this.spinner = false;
            this.target = false;
            console.log(error.message);
          }
        );
      } else {
        this.error = "Your browser does not support Geolocation API";
        this.spinner = false;
        this.target = false;
      }
    },
    getAddressFrom(lat, long) {
      console.log("Getting address")
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
            console.log(response.data.error_message)
          } else {
            this.address = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false;
          this.target = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.spinner = false;
          this.target = false;
          // console.log(error.message);
        });
    },
  },
  mounted() {
    var options = {
      types: ["establishment"],
      componentRestrictions: { country: "us" },
      fields: [
        "formatted_address",
        "geometry",
        "name",
        "place_id",
        "url",
        "vicinity",
        "business_status",
        "formatted_phone_number", // More expensive
        "opening_hours", // More expensive (includes isOpen)
        "types",
        "utc_offset_minutes", // Necessary for opening_hours
        "website", // More expensive
      ],
    };

    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("home-autocomplete"),
      options
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      this.fetchPlace(place);

      // if (place.business_status) {
      //   if (this.$router.currentRoute.name != "place") {
      //     this.$router.push("place");
      //   }
      // } else {
      //   if (this.$router.currentRoute.name != "search") {
      //     this.$router.push("search");
      //   }
      // }

      // this.showUserLocationOnTheMap(
      //   place.geometry.location.lat(),
      //   place.geometry.location.lng()
      // );
    });

    this.$store.dispatch("showSearchBar", false);
  },
  components: {
    "svg-img": SvgImg,
    // "place-types": PlaceTypes,
  },
};
</script>

<style lang="scss" scoped>
.jumbotron .jumbotron-image {
  font-size: 25rem;
  float: left;
  margin-bottom: -15rem;
  margin-top: -3.15rem;
}
.jumbotron .jumbotron-text {
  padding-top: 3em;
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
