<template>
  <section id="popular-type-section">
    <v-row>
      <v-col class="d-flex align-center"
        ><v-divider class="mb-1"></v-divider
      ></v-col>
      <v-col>
        <h3 class="text-center">Popular {{ type.name + "s" | replaceUnderscore }}</h3>
      </v-col>
      <v-col class="d-flex align-center"
        ><v-divider class="mb-1"></v-divider
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="3" style="font-size: 1.25rem">Here are some popular {{ type.name  + "s" | replaceUnderscore }} that people are currently searching for.</v-col>
      <v-col cols="12" sm="12" md="8" lg="9">
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="4" v-for="place in placesToDisplay" :key="place.place_id">
            <v-card height="200">
              <v-card-title>{{ place.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "popular-type-section",
  data() {
    return {
      type: {},
      places: [],
      loading: true,
      showLessPlaces: true,
      styleObject: { "border-color": "#7dbc96" },
      highlightedCard: null,
      hover: false,
    };
  },
  async created() {
    if (this.$store.state.types === null) {
      await this.$store.dispatch("fetchReviewTypes");
    }

    var i,
      currentTypes = this.$store.getters.getTypes;

    // for (i = 0; i < currentTypes.length; i++) {
    await this.$store.dispatch("fetchPlaces", currentTypes[0].name);
    // currentTypes[0].places = this.$store.getters.getPlaces;
    // }

    this.type = currentTypes[0];
    this.places = this.$store.getters.getPlaces;
    this.loading = false;
  },
  methods: {
    async viewPlace(place) {
      await this.$store.dispatch("fetchPlace", place);
      this.$router.push({ name: "place", params: { id: place.place_id } });
    },
  },
  computed: {
    ...mapState(["userLocation"]),
    placesToDisplay: function() {
      var places = this.places;
      return places.slice(0, 6);
    },
  },

  watch: {
    types(newVal, oldVal) {
      if (this.types.length > 0) {
        this.loading = false;
      }
    }
  },
  filters: {
    replaceUnderscore(val) {
      var i,
        frags = val.split("_");
      for (i = 0; i < frags.length; i++) {
        if (frags[i] != "of" && frags[i] != "or") {
          frags[i] = frags[i].slice(0);
        }
      }
      return frags.join(" ");
    },
    truncateWithEllipse(val, stringLength) {
      if (val.length > stringLength) {
        return val.slice(0, stringLength - 1) + "...";
      } else {
        return val;
      }
    },
  },
};
</script>
