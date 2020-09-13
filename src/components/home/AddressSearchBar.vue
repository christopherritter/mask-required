<template>
  <section id="address-search-bar">
    <v-row>
      <v-col cols="4" md="3" class="d-none d-md-flex">
        <v-card outlined color="#c5f9da" light width="100%">
          <v-card-text><strong>Browse nearby places:</strong></v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9" class="d-flex align-stretch">
        <v-card outlined color="grey lighten-4" width="100%">
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" class="d-flex d-md-none">
                <strong class="mb-1">Browse nearby places:</strong>
              </v-col>
              <v-col cols="12">
                <vg-autocomplete
                  class="py-md-0"
                  :dense="true"
                  :outlined="true"
                  :backgroundColor="'white'"
                  :hideDetails="true"
                  :label="'Enter city, state, or zip code.'"
                  :placeholder="''"
                  :types="options.types"
                ></vg-autocomplete>
                <!-- <v-text-field
                  class="py-md-0 jumbotron-search"
                  v-model="address"
                  id="address-search-bar-autocomplete"
                  dense
                  outlined
                  background-color="white"
                  hide-details
                  label="Enter city, state, or zip code."
                  placeholder=""
                ></v-text-field> -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";
import VgAutocomplete from "@/components/util/VgAutocomplete";

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
    this.$store.dispatch("showSearchBar", false);
  },
  components: {
    VgAutocomplete,
  },
};
</script>
