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
          <v-card>
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
          <v-card>
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
          <v-card>
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
import GeneratePlaces from "@/components/util/GeneratePlaces";
import GenerateReviews from "@/components/util/GenerateReviews";
import GenerateRegions from "@/components/util/GenerateRegions";

export default {
  name: "admin",
  data() {
    return {
      model: null,
      types: ["establishment", "geocode"]
    }
  },
  components: {
    GenerateRegions,
    GenerateReviews,
    GeneratePlaces,
  },
}
</script>