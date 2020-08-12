<template>
  <v-app id="app">
    <site-nav-bar v-if="showNavBar"></site-nav-bar>
    <router-view />
    <v-footer class="font-weight-light mt-12">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} <strong>MaskRequired.US</strong>.
        Read our <a @click="$router.push('privacy-policy')">privacy policy</a>.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import SiteNavBar from "@/components/SiteNavBar";

export default {
  data() {
    return {
      showNavBar: true,
    };
  },
  components: {
    SiteNavBar,
  },
  async created() {
    var routerName = await this.$router.currentRoute.name;
    if (routerName == "login") {
      this.showNavBar = false;
    }
  },
  watch: {
    async $route(to, from) {
      var routerName = await this.$router.currentRoute.name;
      if (routerName == "login") {
        this.showNavBar = false;
      }
    },
  },
};
</script>
