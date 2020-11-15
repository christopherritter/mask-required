<template>
  <section id="popular-types-bar">
    <v-row>
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
    <v-row v-if="loading">
      <v-col>
        <v-card height="80" outlined color="grey">
          <v-skeleton-loader
            type="text"
            class="mx-4 mt-6"
            width="75%"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="text"
            class="mx-4 mt-1"
            width="45%"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="80" outlined>
          <v-skeleton-loader
            type="text"
            class="mx-4 my-6"
            width="75%"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="80" outlined>
          <v-skeleton-loader
            type="text"
            class="mx-4 my-6"
            width="75%"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="80" outlined>
          <v-skeleton-loader
            type="text"
            class="mx-4 my-6"
            width="75%"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="80" outlined>
          <v-skeleton-loader
            type="text"
            class="mx-4 my-6"
            width="75%"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="80" outlined>
          <v-skeleton-loader
            type="text"
            class="mx-4 my-6"
            width="45%"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="4" md="2">
        <v-card height="80" outlined color="#c5f9da">
          <v-card-text class="hidden-md-and-down">
            Browse nearby places:
          </v-card-text>
          <v-card-text class="hidden-lg-and-up">
            Browse nearby:
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" md="2" v-for="type in topReviewTypes" :key="type.name">
        <v-card
          height="80"
          outlined
          :style="styleObject"
          @mouseover.native="highlightedCard = type.name"
          @mouseleave.native="highlightedCard = null"
          :class="{
            teal: highlightedCard == type.name,
          }"
          style="cursor: pointer"
          @click="selectType(type.name)"
        >
          <v-card-text
            :class="{
              'white--text': highlightedCard == type.name,
            }"
          >
            {{ type.name + 's' | replaceUnderscore }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" md="2">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-card
              height="80"
              outlined
              :style="styleObject"
              v-bind="attrs"
              v-on="on"
              @mouseover.native="highlightedCard = 'more'"
              @mouseleave.native="highlightedCard = null"
              :class="{
                teal: highlightedCard == 'more',
              }"
              style="cursor: pointer"
            >
              <v-card-text
                :class="{
                  'white--text': highlightedCard == 'more',
                }"
              >
                More...
              </v-card-text>
            </v-card>
          </template>
          <v-list>
            <v-list-item
              v-for="type in typeOverflow"
              :key="type.name"
              @click="selectType(type.name)"
            >
              <v-list-item-title>{{
                type.name | replaceUnderscore
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
      type: "",
      options: {
        types: ["(regions)"],
        componentRestrictions: { country: "us" },
        fields: ["place_id"],
      },
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
      showSearchBox: false,
      showMenu: false,
      error: "",
    };
  },
  async mounted() {
    // if (!this.types.length) {
    //   await this.$store.dispatch("countPlaceTypes");
    //   this.types = this.$store.getters.getTypes;
    // }
    this.$store.dispatch("isLoading", false)
  },
  props: {
    types: Array,
  },
  computed: {
    ...mapState([["validTypes"], "loading"]),
    topReviewTypes() {
      var types = this.types;
      var sortedTypes = types.sort((a, b) => {
          return b.counter - a.counter;
      })
      return types.slice(0, 4);
    },
    typeOverflow() {
      var t,
        types = this.types;
      var i,
        overflow = [];

      for (t = 0; t < types.length; t++) {
        // if (this.validTypes.includes(types[t].name)) {
          if (types[t].counter >= 2) {
            overflow.push(types[t]);
          }
        // }
      }

      for (i = 0; i < 4; i++) {
        overflow.shift();
      }

      return overflow;
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
