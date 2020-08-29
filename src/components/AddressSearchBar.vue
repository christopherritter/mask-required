<template>
  <section id="address-search-bar">
    <v-row>
      <v-col cols="4" md="3" class="d-flex align-stretch">
        <v-card outlined color="#c5f9da" light width="100%">
          <v-card-text><strong>Browse nearby places:</strong></v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8" md="9" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%">
          <v-card-text>
            <v-row no-gutters>
              <!-- <v-col cols="4">Enter city, state, or zip code.</v-col> -->
              <v-col cols="12"
                ><v-text-field
                  class="px-4 py-0 jumbotron-search"
                  v-model="address"
                  id="address-search-bar-autocomplete"
                  dense
                  outlined
                  background-color="white"
                  hide-details
                  label="Enter city, state, or zip code."
                  placeholder=""
                ></v-text-field
              ></v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "address-search-bar",
  data() {
    return {
      address: null,
      options: {
        types: ["(regions)"],
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
    };
  },
  mounted() {
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("address-search-bar-autocomplete"),
      this.options
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      this.$router.push({ name: "nearby", params: { id: place.place_id } });
    });

    this.$store.dispatch("showSearchBar", false);
  },
  methods: {
    async getRegion() {
      var address = this.address;
      await this.$store.dispatch("fetchRegion", address);
      await this.$store.dispatch("getGeohashRange");
      var region = this.$store.getters.getRegion;
      this.$router.push({ name: "nearby", params: { id: area.place_id } });
    },
  },
};
</script>
