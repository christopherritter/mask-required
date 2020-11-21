<template>
  <v-main>
    <v-container id="admin">
      <v-row>
        <v-col>
          <h1>Data Generator</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="emptyPlaces">
            <v-card-title>
              Generate Places
            </v-card-title>
            <v-card-text>
              <p>Click on the button to generate test data.</p>
              <generate-places></generate-places>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card v-if="emptyReviews">
            <v-card-title>
              Generate Reviews
            </v-card-title>
            <v-card-text>
              <p>Click on the button to generate test data.</p>
              <generate-reviews></generate-reviews>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card v-if="emptyRegions">
            <v-card-title>
              Generate Regions
            </v-card-title>
            <v-card-text>
              <p>Click on the button to generate test data.</p>
              <generate-regions></generate-regions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import * as fb from "../firebase";
import GeneratePlaces from "@/components/util/GeneratePlaces";
import GenerateReviews from "@/components/util/GenerateReviews";
import GenerateRegions from "@/components/util/GenerateRegions";

export default {
  name: "admin",
  data() {
    return {
      model: null,
      types: ["establishment", "geocode"],
      emptyPlaces: false,
      emptyReviews: false,
      emptyRegions: false,
    };
  },
  async created() {
    this.countPlaces().then((results) => {
      if (results == 0) {
        this.emptyPlaces = true;
      } else {
        this.emptyPlaces = false;
      }
    });
    this.countReviews().then((results) => {
      if (results == 0) {
        this.emptyReviews = true;
      } else {
        this.emptyReviews = false;
      }
    });
    this.countRegions().then((results) => {
      if (results == 0) {
        this.emptyRegions = true;
      } else {
        this.emptyRegions = false;
      }
    });
  },
  components: {
    GenerateRegions,
    GenerateReviews,
    GeneratePlaces,
  },
  methods: {
    async countPlaces() {
      let placeSize = 0;
      await fb.placesCollection
        .limit(1)
        .get()
        .then((results) => {
          if (results.size >= 1) {
            placeSize = results.size;
          }
        });
      return placeSize;
    },
    async countReviews() {
      let placeSize = 0;
      await fb.placesCollection
        .limit(1)
        .get()
        .then((results) => {
          if (results.size >= 1) {
            placeSize = results.size;
          }
        });
      return placeSize;
    },
    async countRegions() {
      let regionSize = 0;
      await fb.regionsCollection
        .limit(1)
        .get()
        .then((results) => {
          if (results.size >= 1) {
            regionSize = results.size;
          }
        });
      return regionSize;
    },
  },
};
</script>
