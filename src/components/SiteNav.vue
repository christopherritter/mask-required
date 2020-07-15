<template>
  <div id="siteNav">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-title @click="$router.push('user-location')">
            User Location
          </v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-title @click="$router.push('close-buy')">
            Close Buy
          </v-list-item-title>
        </v-list-item>
        
        <v-list-item link>
          <v-list-item-title @click="$router.push('nearby')">
            Nearby
          </v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="gray darken-3"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('home')" class="ml-0 p-3" style="cursor: pointer;">
        Mask Required
      </v-toolbar-title>

      <v-text-field
        class="pl-4 hidden-sm-and-down"
        v-model="address"
        id="autocomplete"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        placeholder=""
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon @click="$router.push('review')">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="$router.push('settings')">
              Settings
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout()">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    address: null,
    drawer: false,
    group: null,
  }),
  methods: {
    selectPlace(place) {
      // console.log(place);
      this.$store.state.place = place;
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  mounted() {
    /* eslint-disable */
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
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
    /* eslint-enable */
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
