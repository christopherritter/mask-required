<template>
  <section id="primary-search-bar">
    <v-row>
      <v-col>
        <v-card class="p-4 mb-md-16 jumbotron text-center" flat color="#c5f9da">
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
                <vg-autocomplete
                  class="pb-0"
                  id="home-autocomplete"
                  :solo="true"
                  :prepend-inner-icon="'mdi-magnify'"
                  :placeholder="'Enter business name or category'"
                  :types="options.types"
                  :append-outer-icon="outerIcon"
                ></vg-autocomplete>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";
import SvgImg from "@/components/util/SvgImg";
import VgAutocomplete from "@/components/util/VgAutocomplete";

export default {
  name: "Home",
  data: () => ({
    currentLocation: null,
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
  mounted() {
    this.$store.dispatch("showSearchBar", false);
  },
  computed: {
    ...mapState(["userLocation"]),
    outerIcon() {
      if (this.userLocation.lat) {
        return 'mdi-crosshairs-gps'
      } else {
        return 'mdi-crosshairs'
      }
    }
  },
  components: {
    SvgImg,
    VgAutocomplete,
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