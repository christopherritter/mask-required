<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

    <router-link class="navbar-brand" to="/">Mask Required</router-link>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/user-location" class="nav-link">User Location</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/close-buy" class="nav-link">Close Buy</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/settings" class="nav-link">Settings</router-link>
      </li>
      <li class="nav-item"><a @click="logout()" class="nav-link">Logout</a></li>
    </ul>

  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
