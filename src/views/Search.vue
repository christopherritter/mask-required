<template>
  <v-main class="mt-10">
    <v-container>
      <v-row>
        <v-col class="text-center">
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
                  <h2
                    v-if="
                      place.business_status == null &&
                        place.formatted_address != null
                    "
                  >
                    Find a safe place to shop in {{ place.vicinity }}.
                  </h2>
                  <h2 v-else-if="place.business_status == null">
                    Find a safe place to shop.
                  </h2>
                  <h2 v-else>Review a place you've visited.</h2>
                  <v-text-field
                    class="px-4 pb-2"
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
import { mapState } from "vuex";
import SvgImg from "@/components/Svg-img";

export default {
  data: () => ({
    address: null,
  }),
  methods: {
    fetchPlace(place) {
      this.$set(this.place, "vicinity", place.vicinity);
      this.$store.dispatch("fetchPlace", place);
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
    });

    this.$store.dispatch("showSearchBar", true);
  },
  components: {
    "svg-img": SvgImg,
  },
  computed: {
    ...mapState(["place"]),
  },
};
</script>

<style lang="scss" scoped>
.jumbotron .jumbotron-image {
  font-size: 25rem;
  float: left;
  margin-bottom: -15rem;
}
.jumbotron .jumbotron-text {
  padding-top: 3em;
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>