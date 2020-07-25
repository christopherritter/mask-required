<template>
  <v-main class="mt-10">
    <v-container>
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
import SvgImg from "@/components/Svg-img";

export default {
  name: "Home",
  data: () => ({
    address: null,
  }),
  methods: {
    selectPlace(place) {
      this.$store.dispatch("selectPlace", place);
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
      this.selectPlace(place);

      if (place.business_status) {
        if (this.$router.currentRoute.name != "place") {
          this.$router.push("place");
        }
      } else {
        if (this.$router.currentRoute.name != "search") {
          this.$router.push("search");
        }
      }

      // this.showUserLocationOnTheMap(
      //   place.geometry.location.lat(),
      //   place.geometry.location.lng()
      // );
    });

    this.$store.state.showSearch = false;
  },
  components: {
    "svg-img": SvgImg,
  },
};
</script>

<style lang="scss" scoped>
.jumbotron .jumbotron-image {
  float: left;
  width: 35rem;
  margin-bottom: -15rem;
}
.jumbotron .jumbotron-text {
  padding-top: 3em;
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
