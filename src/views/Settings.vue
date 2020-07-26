<template>
  <v-main id="settings">
    <v-container>
      <v-row class="justify-content-md-center">
        <v-col md="3" lg="4"></v-col>
        <v-col cols="12" md="6" lg="4">
          <v-card class="mt-4">
            <v-card-title>Settings</v-card-title>
            <v-card-text>
              <h6 class="mb-2">Update your profile</h6>
              <transition name="fade">
                <p v-if="showSuccess" class="alert alert-success">
                  Profile updated.
                </p>
              </transition>

              <form @submit.prevent>
                <v-text-field
                  label="Name"
                  v-model.trim="name"
                  type="text"
                  :placeholder="userProfile.name"
                  id="name"
                  outlined
                ></v-text-field>

                <v-text-field
                  label="Job Title"
                  v-model.trim="title"
                  type="text"
                  :placeholder="userProfile.title"
                  id="title"
                  outlined
                ></v-text-field>

                <v-btn @click="updateProfile()" color="primary">
                  Update Profile
                </v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="3" lg="4"></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      title: "",
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        title: this.title !== "" ? this.title : this.userProfile.title,
      });

      this.name = "";
      this.title = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
  },
};
</script>
