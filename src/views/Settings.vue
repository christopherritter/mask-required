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
                  v-model="name"
                  type="text"
                  id="name"
                  outlined
                  readonly
                ></v-text-field>

                <v-text-field
                  label="Nickname"
                  v-model.trim="nickname"
                  type="text"
                  id="nickname"
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
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      showSuccess: false,
    };
  },
  computed: {
    ...mapFields(["userProfile.name", "userProfile.nickname"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        nickname:
          this.nickname !== "" ? this.nickname : this.userProfile.nickname,
      });

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
  },
};
</script>
