<template>
  <section id="address-search-bar">
    <v-row>
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
  name: "popular-types-bar",
  data() {
    return {
      address: null,
      types: null,
      options: {
        types: ["(regions)"],
        componentRestrictions: { country: "us" },
        fields: [
          "place_id",
        ],
      },
      error: "",
    };
  },
  mounted() {
    if (!types) {
      this.$store.dispatch("countReviewTypes")
    }
  },
  components: {
    VgAutocomplete,
  },
};
</script>
