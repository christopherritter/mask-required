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
          <div>
            <v-btn
              @click="facebookLogin"
              color="#1877f2"
              class="btn-facebook mb-4"
              large
              dark
              block
            >
              <v-icon class="mr-2">mdi-facebook</v-icon>
              Log in with Facebook
            </v-btn>
            <v-btn
              @click="googleLogin"
              color="#4285f4"
              class="btn-google mb-4"
              large
              dark
              block
            >
              <v-icon class="mr-2">mdi-google</v-icon>
              Log in with Google
            </v-btn>

            <v-avatar color="grey lighten-3" class="mb-4" size="32">
              <h6>OR</h6>
            </v-avatar>

            <form v-if="showLoginForm" @submit.prevent>
              <v-text-field
                label="Email"
                :rules="[rules.required, rules.email]"
                v-model.trim="loginForm.email"
                type="text"
                placeholder="your@email.com"
                id="email1"
                outlined
              ></v-text-field>
              <v-text-field
                label="Password"
                :rules="[rules.required]"
                v-model.trim="loginForm.password"
                type="password"
                placeholder="******"
                id="password1"
                outlined
              ></v-text-field>
              <v-btn @click="login()" color="teal" large block dark
                >Log In</v-btn
              >
              <div class="pt-3">
                <v-btn large text @click="togglePasswordReset()"
                  >Forgot Password</v-btn
                >
                <v-btn large text @click="toggleForm()"
                  >Create an Account</v-btn
                >
              </div>
            </form>
            <form v-else @submit.prevent>
              <h1>Get Started</h1>
              <v-text-field
                label="Name"
                v-model.trim="signupForm.name"
                type="text"
                placeholder="Savvy Apps"
                id="name"
              ></v-text-field>
              <v-text-field
                label="Title"
                v-model.trim="signupForm.title"
                type="text"
                placeholder="Company"
                id="title"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model.trim="signupForm.email"
                type="text"
                placeholder="you@email.com"
                id="email2"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model.trim="signupForm.password"
                type="password"
                placeholder="min 6 characters"
                id="password2"
              ></v-text-field>
              <v-btn @click="signup()" class="button">Sign Up</v-btn>
              <div class="extras">
                <v-btn text @click="toggleForm()">Back to Log In</v-btn>
              </div>
            </form>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="showError"
      multi-line
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="errorMessage = false"
        >
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
    }
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
