<template>
  <div id="site-nav-bar">
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
      color="grey darken-4"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <svg-img @click="goHome" icon="logo2" class="logo pr-4" :style="showPointer"></svg-img>
      <v-toolbar-title @click="goHome" class="ml-0 p-3" :style="showPointer">
        Mask Required
      </v-toolbar-title>

      <v-text-field
        v-show="showSearchBar"
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

      <v-btn v-show="showSearchBar" class="hidden-sm-and-up" icon @click="addReview">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->

      <v-menu v-if="loggedIn">
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

      <v-btn v-if="!loggedIn" @click="$router.push('login')">
        Signup / Login
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SvgImg from "@/components/SvgImg";

export default {
  data: () => ({
    address: null,
    drawer: false,
    group: null,
    options: {
      types: ["establishment"],
      componentRestrictions: { country: "us" },
      fields: [
        // "formatted_address",
        // "geometry",
        // "name",
        "place_id",
        // "types",
      ],
    },
  }),
  mounted() {
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("navbar-autocomplete"),
      this.options
    );
    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      this.fetchPlace(place);
    });

    this.$store.dispatch("showSearchBar", false);
  },
  components: {
    SvgImg,
  },
  methods: {
    async fetchPlace(place) {
      // await this.$store.dispatch("fetchPlace", place);
      if (this.$router.currentRoute.name != "place") {
        this.$router.push({ name: "place", params: { id: place.place_id } });
      } else {
        this.$router.push(place.place_id)
      }
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
    ...mapState([["userProfile"], ["place"], "showSearchBar"]),
    showPointer() {
      let currentRoute = this.$router.currentRoute.name;
      if (currentRoute == "home") {
        return { cursor: "pointer" };
      } else {
        return { cursor: "pointer" };
      }
    },
    loggedIn() {
      if (Object.keys(this.userProfile).length > 1) {
        return true
      } else {
        return false
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

<style lang="scss" scoped>
.logo {
  font-size: 2.75rem;
}
</style>