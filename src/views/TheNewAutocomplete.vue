<template>
  <v-container>
    <v-row>
      <v-col class="pt-12 mt-12">
        <v-card color="teal darken-2" dark>
          <v-card-title class="headline teal darken-3">
            Search for Public APIs
          </v-card-title>
          <v-card-text>
            Explore hundreds of free API's ready for consumption! For more
            information visit
            <a
              class="grey--text text--lighten-3"
              href="https://github.com/toddmotto/public-apis"
              target="_blank"
              >the Github repository</a
            >.
          </v-card-text>
          <v-card-text>
            <vg-autocomplete
              :label="'Public APIs'"
              :placeholder="'Start typing to Search'"
              :prepend-icon="'mdi-database-search'"
              :hide-selected="true"
              :types="types"
            ></vg-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list v-if="model" class="red lighten-3">
              <v-list-item v-for="(field, i) in fields" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="field.value"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="field.key"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expand-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!model"
              color="grey darken-3"
              @click="model = null"
            >
              Clear
              <v-icon right>mdi-close-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VgAutocomplete from "@/components/util/VgAutocomplete";
export default {
  name: "the-new-autocomplete",
  data() {
    return {
      model: null,
      types: ["establishment", "geocode"]
    }
  },
  components: {
    VgAutocomplete,
  },
}
</script>