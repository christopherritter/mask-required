<template>
  <v-app id="app">
    <site-nav-bar v-if="showNavBar"></site-nav-bar>
    <router-view />
    <v-footer class="font-weight-light" :class="{ 'mt-12': showNavBar }">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} <strong>MaskRequired.US</strong>.
        Read our <a @click="$router.push({ name: 'privacy-policy' })">privacy policy</a>.
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

<style lang="scss">
.pac-container .pac-item {
  padding: 0.4rem 0.75rem;
  .pac-item-query {
    font-size: 1.25em;
  }
}
</style>