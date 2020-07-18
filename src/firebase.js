import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCHzVbXJqB_-tUwT2AeUGZ_-HRkvJOHjqI",
  authDomain: "mask-required.firebaseapp.com",
  databaseURL: "https://mask-required.firebaseio.com",
  projectId: "mask-required",
  storageBucket: "mask-required.appspot.com",
  messagingSenderId: "783326866906",
  appId: "1:783326866906:web:80587a7cde78e644f924e3",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const reviewsCollection = db.collection("reviews");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  reviewsCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
