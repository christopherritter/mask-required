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
      color="grey darken-4"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <svg-img icon="logo2" class="logo pr-4"></svg-img>
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
import SvgImg from "@/components/Svg-img";

export default {
  data: () => ({
    address: null,
    drawer: false,
    group: null,
  }),
  mounted() {
    var options = {
      types: ["establishment"],
      componentRestrictions: { country: "us" },
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
        "website", // More expensive
      ],
    };
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("navbar-autocomplete"),
      options
    );
    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      this.fetchPlace(place);

      // if (place.business_status) {
      //   if (this.$router.currentRoute.name != "place") {
      //     this.$router.push("place");
      //   }
      // } else {
      //   if (this.$router.currentRoute.name != "search") {
      //     this.$router.push("search");
      //   }
      // }
    });

    this.$store.dispatch("showSearchBar", false);
    this.showSearchBar = this.$store.getters.getSearchBar;
  },
  props: ["loggedIn"],
  components: {
    "svg-img": SvgImg,
  },
  methods: {
    fetchPlace(place) {
      this.$store.dispatch("fetchPlace", place);
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
    ...mapState([["place"], "showSearchBar"]),
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

<style lang="scss" scoped>
.logo {
  font-size: 2.75rem;
}
</style>