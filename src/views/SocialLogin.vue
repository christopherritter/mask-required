<template>
  <v-main id="login">
    <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset>
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
          :class="{
            'signup-form': !showLoginForm,
            'd-flex align-center text-center justify-center': true,
          }"
        >
          <section id="firebaseui-auth-container"></section>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="showError" multi-line>
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="errorMessage = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import PasswordReset from "@/components/PasswordReset";
import SvgImg from "@/components/Svg-img";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        title: "",
        email: "",
        password: "",
      },
      showLoginForm: true,
      showPasswordReset: false,
      showError: false,
    };
  },
  mounted() {
    this.$store.dispatch("socialLogin");
  },
  components: {
    PasswordReset,
    "svg-img": SvgImg,
  },
  methods: {
    googleLogin() {
      this.$store.dispatch("googleLogin");
    },
    facebookLogin() {
      this.$store.dispatch("facebookLogin");
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title,
      });
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
  },
  watch: {
    errorMessage() {
      if (this.errorMessage.length) {
        this.showError = true;
      }
    },
  },
  computed: {
    ...mapState(["rules", "errorMessage"]),
  },
};
</script>

<style lang="scss" scoped>
.logo {
  font-size: 10rem;
}
</style>
