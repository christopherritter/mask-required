<template>
  <v-main class="mt-10">
    <v-container>
      <v-card class="p-4">
        <v-row>
          <v-col class="text-center">
            <h3>Review a place you've visited.</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              class="pl-4 hidden-sm-and-down"
              v-model="address"
              id="search-autocomplete"
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              placeholder=""
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    address: null,
  }),
  methods: {
    selectPlace(place) {
      // console.log(place);
      this.$store.state.place = place;
    },
  },
  mounted() {
    this.$store.state.showSearch = false;

    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("search-autocomplete")
      // {
      //   bounds: new google.maps.LatLngBounds(
      //     new google.maps.LatLng(40.367474, -82.996216)
      //   )
      // }
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();

      this.selectPlace(place);

      if (this.$router.currentRoute.name != "place") {
        this.$router.push("place");
      }

      // this.showUserLocationOnTheMap(
      //   place.geometry.location.lat(),
      //   place.geometry.location.lng()
      // );
    });
  },
};
</script>
