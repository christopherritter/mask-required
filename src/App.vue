<template>
  <v-app id="app">
    <site-nav-bar></site-nav-bar>
    <router-view />
    <v-footer class="font-weight-light">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} <strong>MaskRequired.US</strong>.
        Read our <a @click="$router.push({ name: 'privacy-policy' })">privacy policy</a>.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import SiteNavBar from "@/components/global/SiteNavBar";

export default {
  components: {
    SiteNavBar,
  },
};
</script>