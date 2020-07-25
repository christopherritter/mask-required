<template>
  <v-main class="mt-10">
    <v-container>
      <v-card class="p-4">
        <v-row>
          <v-col class="text-center">
            <h3
              v-if="
                place.business_status == null && place.formatted_address != null
              "
            >
              Find a safe place to shop in {{ place.vicinity }}.
            </h3>
            <h3 v-else-if="place.business_status == null">
              Find a safe place to shop.
            </h3>
            <h3 v-else>Review a place you've visited.</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              class="px-4 pb-2"
              v-model="address"
              id="home-autocomplete"
              outlined
              hide-details
              prepend-inner-icon="mdi-magnify"
              placeholder="Enter business name or category"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    address: null,
  }),
  methods: {
    selectPlace(place) {
      this.$set(this.place, "vicinity", place.vicinity);
      this.$store.dispatch("selectPlace", place);
    },
  },
  mounted() {
    var options = {
      types: ['establishment'],
      componentRestrictions: {country: 'us'},
      fields: [
        "formatted_address",
        "geometry",
        "name",
        "place_id",
        "url",
        "vicinity",
        "business_status",
        "formatted_phone_number", // More expensive 
        "opening_hours", // More expensive (includes isOpen)
        "types",
        "utc_offset_minutes", // Necessary for opening_hours
        "website" // More expensive
      ],
    };

    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("home-autocomplete"),
      options
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      this.selectPlace(place);

      if (place.business_status) {
        if (this.$router.currentRoute.name != "place") {
          this.$router.push("place");
        }
      } else {
        if (this.$router.currentRoute.name != "search") {
          this.$router.push("search");
        }
      }
    });

    this.$store.state.showSearch = false;
  },

  computed: {
    ...mapState(["place"]),
  },
};
</script>
