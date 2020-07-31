import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase";
import * as fb from "../firebase";
import router from "../router/index";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    userProfile: {
      name: "",
      nickname: "",
    },
    place: {},
    rating: 0,
    reviews: [],
    types: [],
    showSearch: true,
    masks: {
      employees: [
        "All of the employees were properly wearing masks",
        "Most of the employees were wearing some kind of mask",
        "Only a few employees were wearing their masks properly",
        "None of the employees were properly wearing masks",
        "I didn't see any employees.",
      ],
      customers: [
        "All of the customers were wearing masks",
        "Most of the customers were wearing masks",
        "Only a few customers were wearing masks",
        "None of the customers were wearing masks",
        "I didn't see any customers.",
      ],
    },
    questions: [
      {
        id: "0",
        text: "Did they limit the number of people inside the store?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "1",
        text: "Were you instructed to stand back from the registers?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "2",
        text: "Were there any plastic shields protecting the cashiers?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "3",
        text: "Was there any hand sanitizer available to the customers?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "4",
        text: "Did they provide free masks to customers without one?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "5",
        text: "Did they regularly wipe down everything that customer use?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "6",
        text: "Do they have home delivery or curb-side pick-up options?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "7",
        text: "Did you see signs that clearly state the store policies?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "8",
        text: "Was someone enforcing store policies at the front door?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "9",
        text: "Were the customers spaced six feet apart from each other?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "10",
        text: "Were there physical barriers separating the customers?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
      {
        id: "11",
        text: "Did you see signs to direct the flow of traffic?",
        answers: [
          {
            id: "0",
            label: "Yes",
            value: "yes",
          },
          {
            id: "1",
            label: "No",
            value: "no",
          },
          {
            id: "2",
            label: "Unsure",
            value: "unsure",
          },
        ],
      },
    ],
    ratings: [
      {
        id: 0,
        icon: "mdi-shield-check",
        label: "Compliance",
        description:
          "How well did they comply with official health regulations?",
        value: 0,
      },
      {
        id: 1,
        icon: "mdi-alarm-light",
        label: "Notification",
        description:
          "Did they effectively notify customers about store policies?",
        value: 0,
      },
      {
        id: 2,
        icon: "mdi-police-badge",
        label: "Enforcement",
        description:
          "How would you rate the enforcement of their in-store policies?",
        value: 0,
      },
    ],
    rules: {
      required: (value) => !!value || "This is a required field",
      counter: (value) => value.length <= 80 || "Max 80 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      minLength: (value) => value.length >= 100 || "Min 100 characters",
    },
    errorMessage: "",
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    setUser(state, val) {
      state.user = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPlace(state, val) {
      state.place = val;
    },
    setReviews(state, val) {
      state.reviews = val;
    },
    setTypes(state, val) {
      state.types = val;
    },
    setComplianceRating(state, ratings) {
      var averageRating = ratings.reduce(function(a, b) {
        return a + b;
      }, 0);

      averageRating = averageRating / ratings.length;
      var roundedAverageRating = Math.round(averageRating * 2) / 2;

      state.ratings[0].value = roundedAverageRating;
    },
    setNotificationRating(state, ratings) {
      var averageRating = ratings.reduce(function(a, b) {
        return a + b;
      }, 0);

      averageRating = averageRating / ratings.length;
      var roundedAverageRating = Math.round(averageRating * 2) / 2;

      state.ratings[1].value = roundedAverageRating;
    },
    setEnforcementRating(state, ratings) {
      var averageRating = ratings.reduce(function(a, b) {
        return a + b;
      }, 0);

      averageRating = averageRating / ratings.length;
      var roundedAverageRating = Math.round(averageRating * 2) / 2;

      state.ratings[2].value = roundedAverageRating;
    },
    setErrorMessage(state, val) {
      state.errorMessage = val;
    },
    // increaseTypeCounter(state, val) {
    //   state.types[val]++;
    // }
  },
  actions: {
    async login({ dispatch }, form) {
      store.commit("setErrorMessage", "");
      // sign user in
      const { user } = await fb.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .catch((err) => {
          store.commit("setErrorMessage", err.message);
        });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async googleLogin({ dispatch }) {
      store.commit("setErrorMessage", "");

      const provider = new firebase.auth.GoogleAuthProvider();

      // firebase.auth().signInWithRedirect(provider);

      firebase
        .auth()
        .signInWithPopup(provider)
        // .getRedirectResult()
        .then((result) => {
          // console.log(result);
          var user = result.user;
          dispatch("fetchUserProfile", user);
        })
        .catch((err) => {
          var errorCode = err.code;
          var errorMessage = err.message;

          store.commit("setErrorMessage", errorMessage);
        });
    },
    async facebookLogin({ dispatch }) {
      var provider = new firebase.auth.FacebookAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // console.log("Signing in with Facebook provider.");
          // console.log(user);
          dispatch("fetchUserProfile", user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          // console.log("Facebook error! " + error.message);
          this.errorMessage = error.message;

          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    async socialLogin({ dispatch }) {
      let ui = firebaseui.auth.AuthUI.getInstance();

      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }

      var uiConfig = {
        signInSuccessUrl: "/search",
        signInOptions: [
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
      };

      ui.start("#firebaseui-auth-container", uiConfig);

      dispatch("fetchUserProfile");
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const currentUser = await firebase.auth().currentUser;

      if (currentUser) {
        console.log("Current user found:");
        // commit("setUser", currentUser);

        const userProfile = await fb.usersCollection.doc(currentUser.uid).get();

        if (userProfile.exists) {
          // set user profile in state
          commit("setUserProfile", userProfile.data());
        } else {
          // create user profile
          await fb.usersCollection.doc(user.uid).set({
            name: user.displayName,
            nickname: "",
            userId: user.uid,
          });

          commit("setUserProfile", user);
        }
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        nickname: form.nickname,
        userId: user.uid,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },
    async selectPlace({ state, dispatch }, place) {
      // console.log(place);
      let newPlace = {
        formatted_address: place.formatted_address,
        formatted_phone_number: place.formatted_phone_number || "",
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        name: place.name,
        place_id: place.place_id,
        types: place.types || [],
        url: place.url,
        vicinity: place.vicinity,
        website: place.website || "",
        rating: 0,
      };

      if (place.opening_hours) {
        // newPlace.business_status = place.business_status;
        // newPlace.formatted_phone_number = place.formatted_phone_number || "";
        newPlace.isOpen = place.opening_hours.isOpen();
        newPlace.open_hours = place.opening_hours.weekday_text;
        // newPlace.types = place.types || [];
        // newPlace.website = place.website || "";
      }

      store.commit("setPlace", newPlace);
      dispatch("fetchReviews");
    },
    async createReview({ state, commit }, review) {
      // create review in firebase
      const newReview = await fb.reviewsCollection
        .add({
          createdOn: new Date(),
          place: {
            place_id: state.place.place_id,
            types: state.place.types,
          },
          rating: review.rating,
          title: review.title,
          content: review.content,
          masks: review.masks,
          questions: review.questions,
          ratings: review.ratings,
          userId: fb.auth.currentUser.uid,
          userName: state.userProfile.name,
          likes: 0,
          agreement: review.agreement,
        })
        .then(function(newReview) {
          newReview.update({
            reviewId: fb.auth.currentUser.uid + "_" + newReview.id,
          });
        });
    },
    async fetchReviews({ state }) {
      // const citiesRef = db.collection("cities");
      const snapshot = await fb.reviewsCollection
        .where("place.place_id", "==", state.place.place_id)
        .get();

      let reviewsArray = [];
      let reviewsRatings = [];
      let complianceRatings = [];
      let notificationRatings = [];
      let enforcementRatings = [];

      if (snapshot.empty) {
        // console.log("No matching documents.");
        store.commit("setReviews", []);
        store.commit("setComplianceRating", []);
        store.commit("setNotificationRating", []);
        store.commit("setEnforcementRating", []);
        return;
      }

      snapshot.forEach((doc) => {
        let review = doc.data();
        review.id = doc.id;

        if (review.ratings && review.ratings[0].value) {
          complianceRatings.push(review.ratings[0].value);
        }

        if (review.ratings && review.ratings[1].value) {
          notificationRatings.push(review.ratings[1].value);
        }

        if (review.ratings && review.ratings[2].value) {
          enforcementRatings.push(review.ratings[2].value);
        }

        reviewsRatings.push(review.rating);
        reviewsArray.push(review);
      });

      var totalRating = reviewsRatings.reduce(function(a, b) {
        return a + b;
      }, 0);

      totalRating = totalRating / reviewsArray.length;
      state.rating = Math.round(totalRating * 2) / 2;

      store.commit("setReviews", reviewsArray);
      store.commit("setComplianceRating", complianceRatings);
      store.commit("setNotificationRating", notificationRatings);
      store.commit("setEnforcementRating", enforcementRatings);
    },
    async likeReview({ commit }, review) {
      const userId = fb.auth.currentUser.uid;
      const docId = `${userId}_${review.id}`;

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get();
      if (doc.exists) {
        return;
      }

      // create post
      await fb.likesCollection.doc(docId).set({
        reviewId: review.id,
        userId: userId,
      });

      // update post likes count
      fb.reviewsCollection.doc(review.id).update({
        likes: review.likesCount + 1,
      });
    },
    async editReview({ commit }, review) {
      fb.reviewsCollection.doc(review.id).update(review);
    },
    async deleteReview({ commit }, review) {
      fb.reviewsCollection.doc(review.id).delete();
    },
    async fetchTypes({ state }) {
      // const citiesRef = db.collection("cities");
      const reviews = await fb.reviewsCollection.get();
      let typesArray = [];

      if (reviews.empty) {
        console.log("No matching documents.");
        return;
      }

      reviews.forEach((doc) => {
        let review = doc.data();
        review.id = doc.id;

        if (review.place.types) {
          for (let t = 0; t < review.place.types.length; t++) {
            let type = {
              name: review.place.types[t],
              counter: 0,
            };
            
            let result = containsType(type, typesArray);
            if (!result) {
              typesArray.push(type);
            } else {
              typesArray.filter(obj => {
                obj.counter++;
              })
            }
          }
        }
      });

      store.commit("setTypes", typesArray);

      function containsType(type, list) {
        var i;
        for (i = 0; i < list.length; i++) {
          if (list[i].name == type.name) {
            return true;
          }
        }
        
        return false;
      }
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        nickname: user.nickname,
      });

      dispatch("fetchUserProfile", { uid: userId });

      // update all reviews by user
      const reviewDocs = await fb.reviewsCollection
        .where("userId", "==", userId)
        .get();
      reviewDocs.forEach((doc) => {
        fb.reviewsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });
    },
    
  },
});

export default store;
