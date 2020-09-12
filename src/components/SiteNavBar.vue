<template>
  <div id="site-nav-bar" v-if="showNavBar">
    <v-app-bar
      color="grey darken-4"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
    >
      <svg-img @click="goHome" icon="logo2" class="logo pr-4" :style="showPointer"></svg-img>
      <v-toolbar-title @click="goHome" class="ml-0 p-3" :style="showPointer">
        Mask Required
      </v-toolbar-title>

      <vg-autocomplete
        v-show="showSearchBar"
        class="pl-4 hidden hidden-sm-and-down"
        id="navbar-autocomplete"
        :flat="true"
        :solo-inverted="true"
        :hide-details="true"
        :label="'Search'"
        :placeholder="''"
        :types="options.types"
        :append-outer-icon="outerIcon"
      ></vg-autocomplete>

      <v-spacer></v-spacer>

      <!-- <v-btn class="hidden-sm-and-up" icon @click="addReview">
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

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

      <v-btn v-if="!loggedIn" class="ml-1" @click="$router.push({ name: 'login' })">
        <span class="hidden-sm-and-down">Signup or Login</span>
        <span class="hidden-md-and-up">Login</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SvgImg from "@/components/SvgImg";
import VgAutocomplete from "@/components/VgAutocomplete";

export default {
  data: () => ({
    showNavBar: true,
    options: {
      types: ["establishment", "geocode"],
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
    this.$store.dispatch("showSearchBar", false);
  },
  components: {
    SvgImg,
    VgAutocomplete,
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
        this.$router.push({ name: "review" });
      } else {
        if (this.$router.currentRoute.name != "search") {
          this.$router.push({ name: "search" });
        }
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapState([["userProfile"], ["userLocation"], ["place"], "showSearchBar"]),
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
    outerIcon() {
      if (this.userLocation.lat) {
        return 'mdi-crosshairs-gps'
      } else {
        return 'mdi-crosshairs'
      }
    },
  },
  watch: {
    async $route(to, from) {
      var routerName = await this.$router.currentRoute.name;
      if (routerName == "login") {
        this.showNavBar = false;
      } else {
        this.showNavBar = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  font-size: 2.75rem;
}
</style>