<template>
  <section id="active-regions">
    <v-row>
      <v-col class="d-flex align-center">
        <v-divider class="mb-1"></v-divider>
      </v-col>
      <v-col>
        <h3 class="text-center">Active Communities</h3>
      </v-col>
      <v-col class="d-flex align-center">
        <v-divider class="mb-1"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="region in regions"
        :key="region.place_id"
      >
        <v-card
          @mouseover.native="highlightedCard = region.place_id"
          @mouseleave.native="highlightedCard = null"
          outlined
          :class="{
            'teal white--text': highlightedCard == region.place_id,
          }"
          style="cursor: pointer"
          :style="styleObject"
          @click="viewRegion(region)"
        >
          <v-img
            :src="
              `https://maps.googleapis.com/maps/api/staticmap?center=${region
                .geometry.location.lat +
                ',' +
                region.geometry.location
                  .lng}&zoom=14&size=400x400&key=${apiKey}`
            "
            aspect-ratio="2"
          ></v-img>
          <v-card-title>{{ region.name }}</v-card-title>
          <v-card-subtitle>{{ region.formatted_address }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "active-regions-section",
  data() {
    return {
      regions: null,
      apiKey: this.$store.getters.getGoogleAPIKey,
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
    };
  },
  async created() {
    if (this.regions === null) {
      this.$store.dispatch("fetchActiveRegions").then((regions) => {
        console.log("Setting regions at creation.");
        console.log(regions);
        this.regions = regions;
      });
    }

    this.loading = false;
  },
  methods: {
    async viewRegion(region) {
      await this.$store.dispatch("fetchRegion", { place_id: region.place_id });
      this.$router.push({ name: "nearby-places", params: { id: region.place_id } });
    },
  },
};
</script>
