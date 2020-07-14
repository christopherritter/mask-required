<template>
  <div id="siteNav">
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('home')">
        Mask Required
      </v-toolbar-title>

      <v-text-field class="pl-8 pt-5">
        <v-icon slot="prepend" dark>mdi-magnify</v-icon>
      </v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu>
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
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="$router.push('dashboard')">
              Dashboard
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push('user-location')">
              User Location
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push('close-buy')">
              Close Buy
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
