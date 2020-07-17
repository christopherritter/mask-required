import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user-location",
    name: "user-location",
    component: () =>
      import(/* webpackChunkName: "user-location" */ "../views/UserLocation.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/close-buy",
    name: "close-buy",
    component: () =>
      import(/* webpackChunkName: "close-buy" */ "../views/CloseBuy.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/nearby",
    name: "nearby",
    component: () =>
      import(/* webpackChunkName: "nearby" */ "../views/Nearby.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/place",
    name: "place",
    component: () =>
      import(/* webpackChunkName: "place" */ "../views/Place.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/review",
    name: "review",
    component: () =>
      import(/* webpackChunkName: "review" */ "../views/Review.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
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

export default router;
