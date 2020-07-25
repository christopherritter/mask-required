<template>
  <div id="siteNav">
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer> -->
    <v-app-bar
      color="gray darken-3"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title @click="goHome" class="ml-0 p-3" :style="showPointer">
        Mask Required
      </v-toolbar-title>

      <v-text-field
        v-show="showSearch"
        class="pl-4 hidden hidden-sm-and-down"
        v-model="address"
        id="navbar-autocomplete"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        placeholder=""
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon @click="addReview">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->

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
import { mapState } from "vuex";
export default {
  data: () => ({
    address: null,
    drawer: false,
    group: null,
  }),
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
        "formatted_phone_number",
        "opening_hours",
        "types",
        "website"
      ],
    };
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("navbar-autocomplete"),
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
  },
  methods: {
    selectPlace(place) {
      this.$store.dispatch("selectPlace", place);
    },
    goHome() {
      if (this.$router.currentRoute.name != "home") {
        this.$router.push({ name: "home" });
      }
    },
    addReview() {
      if (this.place && this.place.business_status) {
        this.$router.push("review");
      } else {
        if (this.$router.currentRoute.name != "search") {
          this.$router.push("search");
        }
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapState(["place"]),
    showSearch() {
      return this.$store.state.showSearch;
    },
    showPointer() {
      if (this.$router.currentRoute.name == "home") {
        return { pointer: "none" };
      } else {
        return { cursor: "pointer" };
      }
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
