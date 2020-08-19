<template>
  <v-main class="mt-0">
    <v-container>
      <place-types-bar></place-types-bar>
      <section id="home-search-card">
        <v-row>
          <v-col>
            <v-card class="p-4 mb-16 jumbotron text-center" flat color="#c5f9da">
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
      </section>
      <place-types-section></place-types-section>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SvgImg from "@/components/SvgImg";
import PlaceTypesBar from "@/components/PlaceTypesBar";
import PlaceTypesSection from "@/components/PlaceTypesSection";

export default {
  name: "Home",
  data: () => ({
    address: null,
    target: false,
    spinner: false,
    apiKey: process.env.VUE_APP_NOT_SECRET_CODE,
    options: {
      types: ["establishment"],
      componentRestrictions: { country: "us" },
      fields: [
        // "formatted_address",
        // "geometry",
        // "name",
        "place_id",
        // "types",
      ],
    },
    error: ""
  }),
  methods: {
    async fetchPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push("place/" + place.place_id);
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
            console.log(response.data.error_message);
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
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("home-autocomplete"),
      this.options
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      this.$router.push({ name: "place", params: { id: place.place_id } });
      // this.fetchPlace(place);

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
    SvgImg,
    PlaceTypesBar,
    PlaceTypesSection,
  },
};
</script>

<style lang="scss" scoped>
.jumbotron .jumbotron-image {
  font-size: 25rem;
  float: left;
  margin-bottom: -6rem;
  margin-top: -3.15rem;
}
.jumbotron .jumbotron-text {
  padding-top: 3em;
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
