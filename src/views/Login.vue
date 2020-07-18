<template>
  <v-main id="login">
    <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset>
    <v-container class="fill-height py-0" style="max-width: none">
      <v-row class="fill-height">
        <v-col cols="12" md="6" class="blue">
          <h1>Mask Required</h1>
          <p>
            This is the first release of a new concept by Christopher Ritter
            which aims to provide a collaborative map of places that require
            masks to be worn by customers and employees.
          </p>
        </v-col>
        <v-col cols="12" md="6" :class="{ 'signup-form': !showLoginForm }">
          <form v-if="showLoginForm" @submit.prevent>
            <h1>Welcome Back</h1>
            <div>
              <v-text-field
                label="Email"
                v-model.trim="loginForm.email"
                type="text"
                placeholder="you@email.com"
                id="email1"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                label="Password"
                v-model.trim="loginForm.password"
                type="password"
                placeholder="******"
                id="password1"
              ></v-text-field>
            </div>
            <v-btn @click="login()" color="primary">Log In</v-btn>
            <div class="extras">
              <a @click="togglePasswordReset()">Forgot Password</a>
              <a @click="toggleForm()">Create an Account</a>
            </div>
          </form>
          <form v-else @submit.prevent>
            <h1>Get Started</h1>
            <div>
              <label for="name">Name</label>
              <input
                v-model.trim="signupForm.name"
                type="text"
                placeholder="Savvy Apps"
                id="name"
              />
            </div>
            <div>
              <label for="title">Title</label>
              <input
                v-model.trim="signupForm.title"
                type="text"
                placeholder="Company"
                id="title"
              />
            </div>
            <div>
              <label for="email2">Email</label>
              <input
                v-model.trim="signupForm.email"
                type="text"
                placeholder="you@email.com"
                id="email2"
              />
            </div>
            <div>
              <label for="password2">Password</label>
              <input
                v-model.trim="signupForm.password"
                type="password"
                placeholder="min 6 characters"
                id="password2"
              />
            </div>
            <button @click="signup()" class="button">Sign Up</button>
            <div class="extras">
              <a @click="toggleForm()">Back to Log In</a>
            </div>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
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
};
</script>
