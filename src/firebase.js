import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_GOOGLE_API,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: "mask-required",
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER,
  appId: process.env.VUE_APP_APP_ID,
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
// const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");
const postsCollection = db.collection("posts");
const reviewsCollection = db.collection("reviews");
const usersCollection = db.collection("users");

// export utils/refs
export {
  db,
  auth,
  likesCollection,
  postsCollection,
  reviewsCollection,
  usersCollection,
};
