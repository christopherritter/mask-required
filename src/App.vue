<template>
  <v-app id="app">
    <SiteNav :logged-in="loggedIn" v-if="$router.currentRoute.name != 'login'"></SiteNav>
    <router-view />
    <v-footer class="font-weight-light">
      <v-col class="text-center" cols="12">
        &copy;{{ new Date().getFullYear() }}
        <strong>Christopher Ritter</strong>. All rights reserved.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import SiteNav from "@/components/SiteNav";

export default {
  components: {
    SiteNav,
  },
  computed: {
    ...mapState(["userProfile"]),
    loggedIn() {
      return Object.keys(this.userProfile).length > 1;
    },
  },
  methods: {
    
  },
};
</script>
