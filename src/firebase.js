import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import * as geofirestore from 'geofirestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_GOOGLE_API,
  authDomain: "mask-required.firebaseapp.com",
  databaseURL: "https://mask-required.firebaseio.com",
  projectId: "mask-required",
  storageBucket: "mask-required.appspot.com",
  messagingSenderId: "783326866906",
  appId: "1:783326866906:web:80587a7cde78e644f924e3",
  measurementId: "G-7RX1GPNRBV"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();

// Use db emulator on local host
if (location.hostname === "localhost") {
  db.settings({
    host: "localhost:8080",
    ssl: false
  });
}

const auth = firebase.auth();
const ga = firebase.analytics();
const GeoFirestore = geofirestore.initializeApp(db);

// collection references
// const commentsCollection = db.collection("comments");
const placesCollection = db.collection("places");
const likesCollection = db.collection("likes");
const reviewsCollection = db.collection("reviews");
const usersCollection = db.collection("users");
const regionsCollection = db.collection("regions");
const typesCollection = db.collection("types");

// Create a Firestore collection reference
const placesFirestore = firebase.firestore().collection('places');

// Create a GeoCollection reference
const placesGeoFirestore = GeoFirestore.collection('places');



// export default
export default firebase;

// export utils/refs
export {
  db,
  auth,
  ga,
  GeoFirestore,
  placesCollection,
  likesCollection,
  reviewsCollection,
  usersCollection,
  regionsCollection,
  typesCollection,
  placesFirestore,
  placesGeoFirestore,
};