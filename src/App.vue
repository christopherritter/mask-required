<template>
  <v-app id="app">
    <Navbar
      :logged-in="loggedIn"
      v-if="$router.currentRoute.name != 'login'"
    ></Navbar>
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
import { mapState } from "vuex";
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["userProfile"]),
    loggedIn() {
      if (Object.keys(this.userProfile).length > 1) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {},
};
</script>
