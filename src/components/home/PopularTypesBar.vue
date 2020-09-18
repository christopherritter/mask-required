<template>
  <section id="popular-types-bar">
    <v-row justify="center">
      <v-dialog v-model="showSearchBox" max-width="600">
        <v-card>
          <v-card-title class="headline">
            Browse nearby {{ type | replaceUnderscore }}s
          </v-card-title>
          <v-card-text>
            <vg-autocomplete
              class="py-md-0"
              :dense="false"
              :outlined="true"
              :backgroundColor="'white'"
              :hideDetails="true"
              :label="'Enter city, state, or zip code.'"
              :placeholder="''"
              :types="options.types"
              :type="type"
            ></vg-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-1" text @click="showSearchBox = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col>
        <v-card height="80" outlined color="teal" dark>
          <v-card-subtitle>
            Browse nearby places:
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col v-for="type in topReviewTypes" :key="type.name">
        <v-card
          height="80"
          outlined
          :style="styleObject"
          @mouseover.native="highlightedCard = type.name"
          @mouseleave.native="highlightedCard = null"
          :class="{
            'teal white--text': highlightedCard == type.name,
          }"
          style="cursor: pointer"
          @click="selectType(type.name)"
        >
          <v-card-subtitle>
            {{ type.name | replaceUnderscore }}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="80" outlined :style="styleObject">
          <v-card-subtitle>
            More...
          </v-card-subtitle>
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
      types: [],
      type: "",
      options: {
        types: ["(regions)"],
        componentRestrictions: { country: "us" },
        fields: ["place_id"],
      },
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
      loading: true,
      showSearchBox: false,
      error: "",
    };
  },
  async mounted() {
    if (!this.types.length) {
      await this.$store.dispatch("countReviewTypes");
      this.types = this.$store.getters.getTypes;
    }
  },
  computed: {
    topReviewTypes() {
      return this.types.slice(0, 4);
    },
  },
  methods: {
    selectType(type) {
      this.type = type;
      this.showSearchBox = true;
    },
  },
  components: {
    VgAutocomplete,
  },
  filters: {
    replaceUnderscore(val) {
      var i,
        frags = val.split("_");

      for (i = 0; i < frags.length; i++) {
        if (frags[i] != "of" && frags[i] != "or") {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
      }
      return frags.join(" ");
    },
  },
};
</script>
