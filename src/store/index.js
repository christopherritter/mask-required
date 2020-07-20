import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let postsArray = [];

  snapshot.forEach((doc) => {
    let post = doc.data();
    post.id = doc.id;

    postsArray.push(post);
  });

  store.commit("setPosts", postsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    place: {},
    rating: 0,
    reviews: [],
    posts: [],
    showSearch: true,
    masks: {
      employees: [
        "All of the employees were properly wearing masks",
        "Some of the employees were wearing some kind of mask",
        "Hardly any of the employees were wearing their masks properly",
        "None of the employees were properly wearing masks",
      ],
      customers: [
        "All of the customers were wearing masks",
        "Some of the customers were wearing masks",
        "Hardly any of the customers were wearing masks",
        "None of the customers were wearing masks",
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
        text: "Were you asked to stand back from the registers?",
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
      { id: 0, label: "Friendliness" },
      { id: 1, label: "Compliance" },
      { id: 2, label: "Respect" },
    ],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setReviews(state, val) {
      state.reviews = val;
    },
    setPosts(state, val) {
      state.posts = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
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
        title: form.title,
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
      state.place.business_status = place.business_status;
      state.place.formatted_address = place.formatted_address;
      state.place.formatted_phone_number = place.formatted_phone_number;
      state.place.lat = place.geometry.location.lat;
      state.place.lng = place.geometry.location.lng;
      state.place.icon = place.icon;
      state.place.name = place.name;
      state.place.isOpen = place.opening_hours.isOpen();
      state.place.open_hours = place.opening_hours.weekday_text;
      state.place.place_id = place.place_id;
      state.place.price_level = place.price_level;
      state.place.types = place.types;
      state.place.url = place.url;
      state.place.website = place.website;

      dispatch("fetchReviews");
    },
    async createReview({ state, commit }, review) {
      // create review in firebase
      await fb.reviewsCollection.add({
        createdOn: new Date(),
        place: state.place,
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
      });
    },
    async fetchReviews({ state }) {
      // const citiesRef = db.collection("cities");
      const snapshot = await fb.reviewsCollection
        .where("place.place_id", "==", state.place.place_id)
        .get();

      let reviewsArray = [];
      let reviewsRatings = [];

      if (snapshot.empty) {
        console.log("No matching documents.");
        store.commit("setReviews", []);
        return;
      }

      snapshot.forEach((doc) => {
        let review = doc.data();
        review.id = doc.id;

        reviewsRatings.push(review.rating);
        reviewsArray.push(review);
      });

      var totalRatings = reviewsRatings.reduce(function(a, b) {
        return a + b;
      }, 0);

      totalRatings = totalRatings / reviewsArray.length;
      state.rating = Math.round(totalRatings * 2) / 2;
      
      store.commit("setReviews", reviewsArray);
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
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title,
      });

      dispatch("fetchUserProfile", { uid: userId });

      // update all posts by user
      const postDocs = await fb.postsCollection
        .where("userId", "==", userId)
        .get();
      postDocs.forEach((doc) => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });
    },
  },
});

export default store;
