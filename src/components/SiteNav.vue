<template>
  <div id="siteNav">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
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

      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('home')" style="cursor: pointer;">
        Mask Required
      </v-toolbar-title>

      <v-text-field class="pl-8 pt-5" v-model="address" id="autocomplete">
        <v-icon slot="prepend" dark>mdi-magnify</v-icon>
      </v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
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
    address: "",
    drawer: false,
    group: null,
  }),
  methods: {
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
      this.$store.state.place = place;
      if (this.$router.currentRoute != "place") {
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
