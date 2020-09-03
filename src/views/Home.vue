<template>
  <v-main class="mt-0">
    <v-container>
      <address-search-bar></address-search-bar>
      <section id="home-search-card">
        <v-row>
          <v-col>
            <v-card
              class="p-4 mb-md-16 jumbotron text-center"
              flat
              color="#c5f9da"
            >
              <v-row>
                <v-col cols="12" md="5" class="hidden-sm-and-down">
                  <svg-img
                    class="jumbotron-image"
                    icon="social-distancing"
                  ></svg-img>
                </v-col>
                <v-col md="7">
                  <div class="jumbotron-text pt-8 pt-md-12 pl-5 pr-2">
                    <h2 class="jumbotron-header mb-5 mb-sm-3">
                      Find a safe place to shop.
                    </h2>
                    <v-text-field
                      class="pb-0 jumbotron-search"
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
      <!-- <place-types-section></place-types-section> -->
    </v-container>
  </v-main>
</template>

<script>
import SvgImg from "@/components/SvgImg";
import AddressSearchBar from "@/components/AddressSearchBar";
// import PlaceTypesSection from "@/components/PlaceTypesSection";

export default {
  name: "Home",
  data: () => ({
    address: null,
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
    error: "",
  }),
  methods: {
    async fetchPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push("place/" + place.place_id);
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
      this.$ga.event("FindPlace", "click", "Selected Place", {
        cookie_flags: "max-age=7200;secure;samesite=none",
      });
    });

    this.$store.dispatch("showSearchBar", false);
  },
  components: {
    SvgImg,
    AddressSearchBar,
    // PlaceTypesSection,
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
