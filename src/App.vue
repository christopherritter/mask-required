<template>
  <v-app id="app">
    <site-nav-bar>
      :logged-in="loggedIn"
      v-if="$router.currentRoute.name != 'login'"
    ></site-nav-bar>
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
  components: {
    SiteNavBar,
  }
};
</script>
