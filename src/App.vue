<template>
  <v-app id="app">
    <SiteNav v-if="showNav"></SiteNav>
    <router-view/>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'

export default {
  components: {
    SiteNav
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 1
    }
  },
}
</script>
