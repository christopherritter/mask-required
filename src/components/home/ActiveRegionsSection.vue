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
      <v-col sm="6" md="3" v-for="region in regions" :key="region.place_id">
        <v-card>
          <v-card-title>{{ region.name }}</v-card-title>
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
    }
  },
  async created() {
    if (this.regions === null) {
      this.$store.dispatch("fetchActiveRegions").then((regions) => {
        console.log("Setting regions at creation.")
        console.log(regions)
        this.regions = regions;
      });
    }

    this.loading = false;
  },
};
</script>
