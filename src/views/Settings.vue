<template>
  <main id="settings" class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-sm-4">
        <div class="card mt-4">
          <h5 class="card-header">Settings</h5>
          <div class="card-body">
            <h5 class="card-title">Update your profile</h5>
            <transition name="fade">
              <p v-if="showSuccess" class="alert alert-success">
                Profile updated.
              </p>
            </transition>

            <form class="mt-1" @submit.prevent>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  v-model.trim="name"
                  type="text"
                  :placeholder="userProfile.name"
                  class="form-control"
                  id="name"
                />
              </div>

              <div class="form-group">
                <label for="title">Job Title</label>
                <input
                  v-model.trim="title"
                  type="text"
                  :placeholder="userProfile.title"
                  class="form-control"
                  id="title"
                />
              </div>

              <button @click="updateProfile()" class="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
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
