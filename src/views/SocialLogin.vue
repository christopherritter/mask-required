<template>
  <v-main id="login">
    <v-container class="fill-height py-0" style="max-width: none">
      <v-row class="fill-height text-center">
        <v-col cols="12" md="6" class="grey darken-4 d-flex align-center">
          <div class="px-5">
            <svg-img icon="logo2" class="logo pr-4"></svg-img>
            <h1 class="white--text">Mask Required</h1>
            <p class="white--text">
              MaskRequired.US helps customers find and rate local businesses
              that enforce mask requirements and other CDC guidelines in their
              stores.
            </p>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex align-center text-center justify-center"
        >
          <section id="firebaseui-auth-container"></section>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import SvgImg from "@/components/SvgImg";

export default {
  mounted() {
    this.$store.dispatch("socialLogin", {});
  },
  components: {
    SvgImg,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  font-size: 10rem;
}
</style>
