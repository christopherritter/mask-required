<template>
  <v-main id="login">
    <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset>
    <v-container class="fill-height py-0" style="max-width: none">
      <v-row class="fill-height">
        <v-col cols="12" md="6" class="blue d-flex align-center">
          <div class="px-5">
            <h1 class="white--text">Mask Required</h1>
            <p class="white--text">
              This is the first release of a new concept by Christopher Ritter
              which aims to provide a collaborative map of places that require
              masks to be worn by customers and employees.
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
          <form v-if="showLoginForm" @submit.prevent>
            <v-text-field
              label="Email"
              :rules="[ rules.required, rules.email ]"
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email1"
              outlined
            ></v-text-field>
            <v-text-field
              label="Password"
              :rules="[ rules.required ]"
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password1"
              outlined
            ></v-text-field>
            <v-btn @click="login()" color="primary" max-width="100%">Log In</v-btn>
            <div class="pt-3">
              <v-btn text @click="togglePasswordReset()">Forgot Password</v-btn>
              <v-btn text @click="toggleForm()">Create an Account</v-btn>
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
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import PasswordReset from "@/components/PasswordReset";

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
    };
  },
  components: {
    PasswordReset,
  },
  methods: {
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
  computed: {
    ...mapState(["rules"]),
  },
};
</script>
