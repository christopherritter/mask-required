import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Nearby from "../views/Nearby.vue";
import { auth } from "../firebase";
import store from "../store";

Vue.use(VueRouter);

const DEFAULT_TITLE = "MaskRequired.US";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Are masks required? Search on MaskRequired.US.",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      title: "Sign up to review businesses on MaskRequired.US.",
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      title: "Update your private settings on MaskRequired.US.",
      requiresAuth: true,
    },
  },
  {
    path: "/user-location",
    name: "user-location",
    component: () =>
      import(
        /* webpackChunkName: "user-location" */ "../views/UserLocation.vue"
      ),
    meta: {
      title: "This is an experiment that doesn't belong on MaskRequired.US.",
      requiresAuth: true,
    },
  },
  {
    path: "/close-buy",
    name: "close-buy",
    component: () =>
      import(/* webpackChunkName: "close-buy" */ "../views/CloseBuy.vue"),
    meta: {
      title: "This is an experiment that doesn't belong on MaskRequired.US.",
      requiresAuth: true,
    },
  },
  {
    path: "/nearby/:id",
    name: "nearby",
    component: () =>
      import(/* webpackChunkName: "nearby" */ "../views/Nearby.vue"),
    meta: {
      title: "Find nearby places to shop safely on MaskRequired.US.",
    },
    // beforeEnter: (to, from, next) => {
    //   if (store.state.place.name) next();
    //   else next({ name: "home" });
    // },
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
    meta: {
      title: "Search for safe places to shop on MaskRequired.US.",
    },
  },
  {
    path: "/place/:id",
    name: "place",
    component: () =>
      import(/* webpackChunkName: "place" */ "../views/Place.vue"),
    meta: {
      title: "Collaborative business reviews on MaskRequired.US.",
    },
    // beforeEnter: (to, from, next) => {
    //   if (store.state.place.name) next();
    //   else next({ name: "home" });
    // },
  },
  {
    path: "/review",
    name: "review",
    component: () =>
      import(/* webpackChunkName: "review" */ "../views/Review.vue"),
    meta: {
      title: "Review a business location on MaskRequired.US.",
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.place.name) next();
      else next({ name: "home" });
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () =>
      import(
        /* webpackChunkName: "privacy-policy" */ "../views/PrivacyPolicy.vue"
      ),
    meta: {
      title: "MaskRequired.US Privacy Policy",
    },
  },
  {
    path: "/social-login",
    name: "social-login",
    component: () =>
      import(/* webpackChunkName: "social-login" */ "../views/SocialLogin.vue"),
    meta: {
      title: "Social Login Experiment",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.auth)) {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         console.log("Auth user" + user);
//         next();
//       } else {
//         next({
//           path: "/login",
//         });
//       }
//     });
//   } else if (to.matched.some((record) => record.meta.guest)) {
//     firebase.auth().onAuthStateChanged((user) => {
//       console.log("Guest user" + user);
//       if (user) {
//         next({
//           path: "/search",
//         });
//       } else {
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
