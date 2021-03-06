import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase";
import * as fb from "../firebase";
import router from "../router/index";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getField, updateField } from "vuex-map-fields";
import axios from "axios";
import geohash from "ngeohash";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    userProfile: {},
    userLocation: {
      lat: null,
      long: null,
    },
    region: {
      name: null,
      place_id: null,
      geometry: null,
      types: null,
      address: null,
      formatted_address: null,
    },
    place: {
      types: null,
      address: null,
      createdOn: null,
      doc_id: null,
      name: null,
      location: {
        lat: null,
        lng: null,
      },
      place_id: null,
      ratings: {
        enforcement: null,
        general: null,
        total: null,
        compliance: null,
        notifications: null,
      },
    },
    places: null,
    rating: null,
    reviews: null,
    types: null,
    showSearchBar: null,
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
      rating: (value) => value !== null || "Leave a rating between 1 and 5.",
    },
    errorMessage: "",
    fields: "",
    googleAPIKey: process.env.VUE_APP_GOOGLE_API,
    fixieKey: process.env.VUE_APP_FIXIE_KEY,
    validTypes: [
      "accounting",
      "airport",
      "amusement_park",
      "aquarium",
      "art_gallery",
      "atm",
      "bakery",
      "bank",
      "bar",
      "beauty_salon",
      "bicycle_store",
      "book_store",
      "bowling_alley",
      "bus_station",
      "cafe",
      "campground",
      "car_dealer",
      "car_rental",
      "car_repair",
      "car_wash",
      "casino",
      "cemetery",
      "church",
      "city_hall",
      "clothing_store",
      "convenience_store",
      "courthouse",
      "dentist",
      "department_store",
      "doctor",
      "drugstore",
      "electrician",
      "electronics_store",
      "embassy",
      "fire_station",
      "florist",
      "funeral_home",
      "furniture_store",
      "gas_station",
      "gym",
      "hair_care",
      "hardware_store",
      "hindu_temple",
      "home_goods_store",
      "hospital",
      "insurance_agency",
      "jewelry_store",
      "laundry",
      "lawyer",
      "library",
      "light_rail_station",
      "liquor_store",
      "local_government_office",
      "locksmith",
      "lodging",
      "meal_delivery",
      "meal_takeaway",
      "mosque",
      "movie_rental",
      "movie_theater",
      "moving_company",
      "museum",
      "night_club",
      "painter",
      "park",
      "parking",
      "pet_store",
      "pharmacy",
      "physiotherapist",
      "plumber",
      "police",
      "post_office",
      "primary_school",
      "real_estate_agency",
      "restaurant",
      "roofing_contractor",
      "rv_park",
      "school",
      "secondary_school",
      "shoe_store",
      "shopping_mall",
      "spa",
      "stadium",
      "storage",
      "subway_station",
      "supermarket",
      "synagogue",
      "taxi_stand",
      "tourist_attraction",
      "train_station",
      "transit_station",
      "travel_agency",
      "university",
      "veterinary_care",
      "zoo",
    ],
    geohashRange: 20,
    upperRange: null,
    lowerRange: null,
    loading: true,
  },
  getters: {
    getField,
    getTypes: (state) => state.types,
    getUserLocation: (state) => state.userLocation,
    getRegion: (state) => state.region,
    getPlaceLocation: (state) => state.place.geometry.location,
    getGeohashRange: (state) => state.geohashRange,
    getUpperRange: (state) => state.upperRange,
    getLowerRange: (state) => state.lowerRange,
    getPlaces: (state) => state.places,
    getPlace: (state) => state.place,
    getReviews: (state) => state.reviews,
    getSearchBar: (state) => state.showSearchbar,
    getGoogleAPIKey: (state) => state.googleAPIKey,
    getFixieKey: (state) => state.fixieKey,
    getLoading: (state) => state.loading,
  },
  mutations: {
    updateField,
    setRange(state, val) {
      state.lowerRange = val.lower;
      state.upperRange = val.upper;
    },
    setUser(state, val) {
      state.user = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setUserLocation(state, val) {
      state.userLocation.lat = val.latitude;
      state.userLocation.long = val.longitude;
    },
    setRegion(state, val) {
      state.region.name = val.name;
      state.region.place_id = val.place_id;
      state.region.geometry = val.geometry;
      state.region.types = val.types;
      state.region.address = val.address;
      state.region.formatted_address = val.formatted_address;
    },
    setPlace(state, val) {
      state.place = val;
    },
    setPlaces(state, val) {
      state.places = val;
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
    setSearchBar(state, val) {
      state.showSearchBar = val;
    },
    setLoading(state, val) {
      state.loading = val;
    },
  },
  actions: {
    // Authentication
    async login({ dispatch }) {
      let ui = firebaseui.auth.AuthUI.getInstance();

      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }

      var uiConfig = {
        signInSuccessUrl: "/",
        signInOptions: [
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
      };

      ui.start("#firebaseui-auth-container", uiConfig);

      dispatch("fetchUserProfile");
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

    // Users
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const currentUser = await firebase.auth().currentUser;

      if (currentUser) {
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
    async fetchUserLocation({ commit }) {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          commit("setUserLocation", { latitude, longitude });
        });
      }
    },
    async clearUserLocation({ commit }) {
      commit("setUserLocation", {
        lat: null,
        long: null,
      });
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

    // Regions

    // Fetches existing region with place ID.
    async fetchRegion({ dispatch, commit }, place) {
      var regionId = place.place_id;
      const snapshot = await fb.regionsCollection
        .where("place_id", "==", regionId)
        .get();
      var newRegion = {};

      if (snapshot.empty) {
        await dispatch("createRegion", place).then(() => {
          return;
        });
      } else {
        snapshot.forEach((doc) => {
          newRegion = doc.data();

          if (!newRegion.address || !newRegion.location) {
            dispatch("updateRegion", newRegion);
          }
        });

        commit("setRegion", newRegion);
      }
    },

    // Creates a new region with Google Places API data.
    async createRegion({ commit, getters }, place) {
      var apiKey = getters.getFixieKey;
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,place_id,geometry,types,address_component,formatted_address&key=${apiKey}`;
      var newRegion = {
        name: "",
        place_id: "",
        createdOn: {},
        types: [],
        address: {},
        formatted_address: "",
      };

      await axios
        .get(URL)
        .then((response) => {
          var result = response.data.result;

          newRegion.name = result.name;
          newRegion.formatted_address = result.formatted_address;
          newRegion.place_id = result.place_id;
          newRegion.createdOn = new Date();
          newRegion.types = result.types;

          for (let a = 0; a < result.address_components.length; a++) {
            switch (result.address_components[a].types[0]) {
              case "street_number":
                newRegion.address.street_number =
                  result.address_components[a].long_name;
                break;
              case "route":
                newRegion.address.route =
                  result.address_components[a].short_name;
                break;
              case "locality":
                newRegion.address.locality =
                  result.address_components[a].long_name;
                break;
              case "administrative_area_level_3":
                newRegion.address.township =
                  result.address_components[a].long_name;
                break;
              case "administrative_area_level_2":
                newRegion.address.county =
                  result.address_components[a].long_name;
                break;
              case "administrative_area_level_1":
                newRegion.address.state =
                  result.address_components[a].long_name;
                break;
              case "country":
                newRegion.address.country =
                  result.address_components[a].short_name;
                break;
              case "postal_code":
                newRegion.address.postal_code =
                  result.address_components[a].long_name;
            }
          }

          newRegion.location = {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          };

          fb.regionsCollection.add(newRegion);
          commit("setRegion", newRegion);
        })
        .catch((error) => {
          console.log(error.message);
          this.errorMessage = error.message;
        });
    },

    // Retrieves list of recently created regions.
    async fetchActiveRegions() {
      const snapshot = await fb.regionsCollection
        .orderBy("createdOn")
        .limitToLast(6)
        .get();

      let regionsArray = [];

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        let region = doc.data();
        region.id = doc.id;
        regionsArray.push(region);
      });

      return regionsArray;
    },

    // Update older regions that lack the proper fields.
    async updateRegion({ dispatch }, region) {
      var regionId = region.place_id;
      const snapshot = await fb.regionsCollection
        .where("place_id", "==", regionId)
        .get();

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        var docId = doc.id;
        var newRegion = doc.data();
        newRegion.updatedOn = new Date();

        // REMINDER: Add doc_id when creating place.
        if (!newRegion.doc_id) {
          newRegion.doc_id = docId;
        }

        if (!newRegion.address) {
          // console.log("This place doesn't have an address.");
          newRegion.address = {};

          for (let a = 0; a < newRegion.address_components.length; a++) {
            switch (newRegion.address_components[a].types[0]) {
              case "street_number":
                newRegion.address.street_number =
                  newRegion.address_components[a].long_name;
                break;
              case "route":
                newRegion.address.route =
                  newRegion.address_components[a].short_name;
                break;
              case "locality":
                newRegion.address.locality =
                  newRegion.address_components[a].long_name;
                break;
              case "administrative_area_level_3":
                newRegion.address.township =
                  newRegion.address_components[a].long_name;
                break;
              case "administrative_area_level_2":
                newRegion.address.county =
                  newRegion.address_components[a].long_name;
                break;
              case "administrative_area_level_1":
                newRegion.address.state =
                  newRegion.address_components[a].long_name;
                break;
              case "country":
                newRegion.address.country =
                  newRegion.address_components[a].short_name;
                break;
              case "postal_code":
                newRegion.address.postal_code =
                  newRegion.address_components[a].long_name;
            }
          }

          delete newRegion.address_components;
          delete newRegion.plus_code;
        }

        if (!newRegion.location) {
          // console.log("This place doesn't have a location.");

          newRegion.location = {
            lat: newRegion.geometry.location.lat,
            lng: newRegion.geometry.location.lng,
          };

          delete newRegion.geometry;
          delete newRegion.icon;
        }

        fb.placesCollection
          .doc(docId)
          .set(newRegion)
          .then(function() {
            dispatch("updateReviews", {
              docId: docId,
              placeId: newRegion.place_id,
            });
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      });
    },

    // Places

    // Fetches existing place with place ID.
    async fetchPlace({ dispatch, commit }, place) {
      var placeId = place.place_id;
      const snapshot = await fb.placesCollection
        .where("place_id", "==", placeId)
        .get();
      var newPlace = {};

      if (snapshot.empty) {
        await dispatch("createPlace", place).then((results) => {
          commit("setPlace", results);
        });
        return;
      }

      snapshot.forEach((doc) => {
        newPlace = doc.data();

        // if (
        //   !newPlace.address ||
        //   !newPlace.address.township ||
        //   !newPlace.ratings ||
        //   !newPlace.location ||
        //   !newPlace.doc_id
        // ) {
        //   dispatch("updatePlace", newPlace);
        // }
      });

      commit("setPlace", newPlace);
      return newPlace;
    },

    // Creates a new place with Google Places API data.
    async createPlace({ state, getters, dispatch }, place) {
      var apiKey = getters.getFixieKey;
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,place_id,geometry,plus_code,types,address_component,formatted_address&key=${apiKey}`;
      var newPlace = {};

      await axios
        .get(URL)
        .then((response) => {
          var result = response.data.result;
          // var latitude = newPlace.geometry.location.lat;
          // var longitude = newPlace.geometry.location.lng;
          // var newGeohash = geohash.encode(latitude, longitude);
          var newTypes = [];

          newPlace.name = result.name;
          newPlace.formatted_address = result.formatted_address;
          newPlace.place_id = result.place_id;
          newPlace.createdOn = new Date();
          // newPlace.geohash = newGeohash;
          // newPlace.coordinates = new firebase.firestore.GeoPoint(
          //   latitude,
          //   longitude
          // );
          newPlace.location = {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          };
          newPlace.address = {};

          for (let a = 0; a < result.address_components.length; a++) {
            switch (result.address_components[a].types[0]) {
              case "street_number":
                newPlace.address.street_number =
                  result.address_components[a].long_name;
                break;
              case "route":
                newPlace.address.route =
                  result.address_components[a].short_name;
                break;
              case "locality":
                newPlace.address.locality =
                  result.address_components[a].long_name;
                break;
              case "administrative_area_level_3":
                newPlace.address.township =
                  result.address_components[a].long_name;
                break;
              case "administrative_area_level_2":
                newPlace.address.county =
                  result.address_components[a].long_name;
                break;
              case "administrative_area_level_1":
                newPlace.address.state = result.address_components[a].long_name;
                break;
              case "country":
                newPlace.address.country =
                  result.address_components[a].short_name;
                break;
              case "postal_code":
                newPlace.address.postal_code =
                  result.address_components[a].long_name;
            }
          }
          newPlace.address.plus_code = result.plus_code.compound_code;

          for (let t = 0; t < result.types.length; t++) {
            if (state.validTypes.includes(result.types[t])) {
              newTypes.push(result.types[t]);
            }
          }
          newPlace.types = newTypes;

          newPlace.ratings = {
            general: 0,
            compliance: 0,
            notifications: 0,
            enforcement: 0,
            total: 0,
          };
        })
        .catch((error) => {
          console.log(error.message);
          this.errorMessage = error.message;
        });

      await dispatch("addPlace", newPlace);

      return newPlace;
    },

    // Add the new place to Google Firebase.
    async addPlace({}, place) {
      var newPlace = place;

      await fb.placesCollection.add(newPlace).then((doc) => {
        newPlace.doc_id = doc.id;
        fb.placesCollection.doc(doc.id).update({
          doc_id: doc.id,
        });
      });

      return newPlace;
    },

    // Find existing places of a specific type.
    async fetchPlaces({}, type) {
      var placesArray = [];

      const places = await fb.placesCollection
        .where("types", "array-contains-any", [type])
        .get();

      if (places.empty) {
        return;
      }

      places.forEach((doc) => {
        var searchResult = doc.data();
        placesArray.push(searchResult);
      });

      return placesArray;
    },

    // Find existing places within a specified region.
    async findRegionalPlaces({ commit }, address) {
      var places;
      let regionalPlaces = [];

      if (address.locality) {
        places = await fb.placesCollection
          .where("address.locality", "==", address.locality)
          .where("address.county", "==", address.county)
          .where("address.state", "==", address.state)
          .get();
      } else if (address.township) {
        places = await fb.placesCollection
          .where("address.township", "==", address.township)
          .where("address.county", "==", address.county)
          .where("address.state", "==", address.state)
          .get();
      } else if (address.county) {
        places = await fb.placesCollection
          .where("address.county", "==", address.county)
          .where("address.state", "==", address.state)
          .get();
      } else if (address.state) {
        places = await fb.placesCollection
          .where("address.state", "==", address.state)
          .get();
      }

      if (places.empty) {
        return;
      }

      places.forEach((doc) => {
        regionalPlaces.push(doc.data());
      });

      commit("setPlaces", regionalPlaces);
    },

    // Find places of a specific type near location using Firebase GeoFirestore.
    async findNearbyPlaces({ state, commit, dispatch }, type) {
      // console.log("Fetching nearby places for " + type + "s.")
      var nearbyPlaces = [];

      // Retrieve the current coordinates using the navigator API
      const places = await fb.placesGeoFirestore
        .where("types", "array-contains-any", [type])
        .where("geohash", ">=", state.lowerRange)
        .where("geohash", "<=", state.upperRange)
        .get();

      if (places.empty) {
        return;
      }

      places.forEach((doc) => {
        var searchResult = doc.data();
        nearbyPlaces.push(searchResult);
      });

      commit("setPlaces", nearbyPlaces);
    },

    // Find places near location with GeoFirestore GeoPoint.
    async findLocalPlaces({ state, commit, dispatch }) {
      const latitude = state.region.geometry.location.lat;
      const longitude = state.region.geometry.location.lng;
      const query = fb.placesGeoFirestore.near({
        center: new firebase.firestore.GeoPoint(latitude, longitude),
        radius: 12,
      });

      // Retrieve the current coordinates using the navigator API
      const places = await query.get();
      let localPlaces = [];

      if (places.empty) {
        return;
      }

      places.forEach((doc) => {
        var searchResult = doc.data();
        localPlaces.push(searchResult);
      });

      commit("setPlaces", localPlaces);
    },

    // Update older places that lack the proper fields.
    async updatePlace({ getters }, place) {
      var placeId = place.place_id;
      var docId = "";
      var newPlace = {};
      const snapshot = await fb.placesCollection
        .where("place_id", "==", placeId)
        .get();

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        docId = doc.id;
        newPlace = doc.data();

        if (!newPlace.address.township) {
          fetchTownship();
        }

      });

      async function fetchTownship() {
        var apiKey = getters.getFixieKey;
        const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,place_id,geometry,plus_code,types,address_component,formatted_address&key=${apiKey}`;
        newPlace.address = {};

        await axios
          .get(URL)
          .then((response) => {
            var result = response.data.result;

            for (let a = 0; a < result.address_components.length; a++) {
              switch (result.address_components[a].types[0]) {
                case "street_number":
                  newPlace.address.street_number =
                    result.address_components[a].long_name;
                  break;
                case "route":
                  newPlace.address.route =
                    result.address_components[a].short_name;
                  break;
                case "locality":
                  newPlace.address.locality =
                    result.address_components[a].long_name;
                  break;
                case "administrative_area_level_3":
                  newPlace.address.township =
                    result.address_components[a].long_name;
                  break;
                case "administrative_area_level_2":
                  newPlace.address.county =
                    result.address_components[a].long_name;
                  break;
                case "administrative_area_level_1":
                  newPlace.address.state =
                    result.address_components[a].long_name;
                  break;
                case "country":
                  newPlace.address.country =
                    result.address_components[a].short_name;
                  break;
                case "postal_code":
                  newPlace.address.postal_code =
                    result.address_components[a].long_name;
              }
            }

            updateTownship(newPlace);
          })
          .catch((error) => {
            console.log(error.message);
            this.errorMessage = error.message;
          });
      }

      async function updateTownship(results) {
        if (results.address.township) {
          fb.placesCollection
            .doc(docId)
            .update({
              address: results.address,
            })
            .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      }
    },

    // Clear places and ranges set in store.
    clearPlaces({ commit }) {
      commit("setPlaces", null);
      commit("setRange", { lower: null, upper: null });
    },

    // Ratings and reviews

    async createReview({ state, dispatch }, review) {
      // create review in firebase
      fb.placesCollection
        .doc(state.place.doc_id)
        .collection("reviews")
        .add({
          createdOn: new Date(),
          place: {
            place_id: state.place.place_id,
            doc_id: state.place.doc_id,
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
        .then((results) => {
          results.update({
            reviewId: fb.auth.currentUser.uid + "_" + results.id,
          });

          dispatch("updateRatings", state.place.doc_id);
        });
    },
    async fetchReviews({}, doc_id) {
      const snapshot = await fb.placesCollection
        .doc(doc_id)
        .collection("reviews")
        .get();

      let reviewsArray = [];

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        let review = doc.data();
        review.id = doc.id;
        reviewsArray.push(review);
      });

      reviewsArray.sort(function(a, b) {
        return b.createdOn - a.createdOn;
      });

      return reviewsArray;
    },
    async fetchTopReviews({ dispatch }) {
      const snapshot = await fb.placesCollection
        .orderBy("updatedOn")
        .limitToLast(10)
        .get();

      var placesArray = [];
      var reviewsArray = [];

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        var place = doc.data();
        place.doc_id = doc.id;
        placesArray.push(place);
      });

      for (let p = 0; p < placesArray.length; p++) {
        await dispatch("fetchReviews", placesArray[p].doc_id).then(
          (reviews) => {
            if (reviews) {
              reviews.map((review) => {
                review.place = {
                  name: placesArray[p].name,
                  formatted_address: placesArray[p].formatted_address,
                  ratings: placesArray[p].ratings,
                  place_id: placesArray[p].place_id,
                };
                reviewsArray.push(review);
              });
            } 
          }
        );
      }

      reviewsArray.sort((a, b) =>
        b.content.length > a.content.length ? 1 : -1
      );

      return reviewsArray.slice(0, 6);
    },
    async likeReview({}, review) {
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
    async editReview({}, review) {
      fb.placesCollection
        .doc(review.docId)
        .collection("reviews")
        .doc(review.id)
        .update(review);
    },
    async deleteReview({}, id) {
      fb.placesCollection
        .doc(id.docId)
        .collection("reviews")
        .doc(id.reviewId)
        .delete();
    },
    async averageRating({}, ratings) {
      var averageRating = ratings.reduce(function(a, b) {
        return a + b;
      }, 0);

      averageRating = averageRating / ratings.length;
      averageRating = Math.round(averageRating * 2) / 2;

      return averageRating;
    },
    async updateRatings({}, docId) {
      const snapshot = await fb.placesCollection
        .doc(docId)
        .collection("reviews")
        .get();

      var generalRatings = 0;
      var complianceRatings = 0;
      var notificationsRatings = 0;
      var enforcementRatings = 0;

      var totalRatings = 0;
      var complianceRatingsCounter = 0;
      var notificationsRatingsCounter = 0;
      var enforcementRatingsCounter = 0;

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        let newReview = doc.data();

        totalRatings = totalRatings + 1;
        generalRatings = generalRatings + newReview.rating;

        if (newReview.ratings[0].value >= 1) {
          complianceRatingsCounter = complianceRatingsCounter + 1;
        }

        complianceRatings = complianceRatings + newReview.ratings[0].value;

        if (newReview.ratings[1].value >= 1) {
          notificationsRatingsCounter = notificationsRatingsCounter + 1;
        }

        notificationsRatings =
          notificationsRatings + newReview.ratings[1].value;

        if (newReview.ratings[2].value >= 1) {
          enforcementRatingsCounter = enforcementRatingsCounter + 1;
        }

        enforcementRatings = enforcementRatings + newReview.ratings[2].value;
      });

      generalRatings = Math.round((generalRatings / totalRatings) * 2) / 2;
      complianceRatings =
        Math.round((complianceRatings / complianceRatingsCounter) * 2) / 2 || 0;
      notificationsRatings =
        Math.round((notificationsRatings / notificationsRatingsCounter) * 2) /
          2 || 0;
      enforcementRatings =
        Math.round((enforcementRatings / enforcementRatingsCounter) * 2) / 2 ||
        0;

      fb.placesCollection
        .doc(docId)
        .update({
          updatedOn: new Date(),
          ratings: {
            enforcement: enforcementRatings,
            general: generalRatings,
            total: totalRatings,
            compliance: complianceRatings,
            notifications: notificationsRatings,
          },
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    async updateReviews({}, place) {
      var docId = place.docId;
      var placeId = place.placeId;

      var generalRatings = 0;
      var complianceRatings = 0;
      var notificationsRatings = 0;
      var enforcementRatings = 0;
      var totalRatings = 0;

      const snapshot = await fb.reviewsCollection
        .where("place.place_id", "==", placeId)
        .get();

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach((doc) => {
        var newReview = doc.data();

        totalRatings = totalRatings + 1;
        generalRatings = (generalRatings + newReview.rating) / totalRatings;
        complianceRatings =
          (complianceRatings + newReview.ratings[0].value) / totalRatings;
        notificationsRatings =
          (notificationsRatings + newReview.ratings[1].value) / totalRatings;
        enforcementRatings =
          (enforcementRatings + newReview.ratings[2].value) / totalRatings;

        fb.placesCollection
          .doc(docId)
          .collection("reviews")
          .doc(doc.id)
          .set(newReview)
          .then(function() {
            fb.placesCollection.doc(docId).update({
              ratings: {
                total: totalRatings,
                general: generalRatings,
                compliance: complianceRatings,
                notifications: notificationsRatings,
                enforcement: enforcementRatings,
              },
            });
          })
          .then(function() {
            fb.reviewsCollection
              .doc(doc.id)
              .delete()
              .catch(function(error) {
                console.error("Error removing document: ", error);
              });
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      });
    },

    // Types

    // Updates the type whenever a new place is created.
    async updateTypes({ dispatch }, types) {
      let t;
      for (t = 0; t < types.length; t++) {
        const typeDocs = await fb.typesCollection
          .where("name", "==", types[t])
          .get();

        if (typeDocs.empty) {
          console.log(types[t] + " not found.");
          dispatch("addType", types[t]).then(() => {
            return;
          });
        }

        typeDocs.forEach((doc) => {
          var type = doc.data();
          console.log("Increasing counter for " + type.name);
        });
      }
    },

    // Adds a new place type whenever one cannot be found.
    async addType({}, type) {
      var newType = {
        name: type,
        counter: 1,
      };
      fb.typesCollection.add(newType);
    },

    async viewTypes({ dispatch }) {
      const types = await fb.typesCollection.get();
      var typesArray = [];

      if (types.empty) {
        dispatch("countPlaceTypes");
        return;
      }

      types.forEach((doc) => {
        var type = doc.data();
        typesArray.push(type);
      });

      return typesArray;
    },

    // Loops through places collection and counts their types.
    async countPlaceTypes({ commit, dispatch }) {
      const places = await fb.placesCollection.get();
      let typesArray = [];

      if (places.empty) {
        return;
      }

      places.forEach((doc) => {
        let place = doc.data();
        place.id = doc.id;

        if (place.types) {
          for (let t = 0; t < place.types.length; t++) {
            let name = place.types[t];
            let type = {
              name: name,
              counter: 1,
            };
            if (
              // name == "administrative_area_level_1" ||
              // name == "administrative_area_level_2" ||
              // name == "administrative_area_level_3" ||
              // name == "administrative_area_level_4" ||
              // name == "administrative_area_level_5" ||
              // name == "archipelago" ||
              // name == "colloquial_area" ||
              // name == "continent" ||
              // name == "country" ||
              name == "establishment" ||
              // name == "finance" ||
              // name == "floor" ||
              name == "food" ||
              // name == "general_contractor" ||
              name == "geocode"
              // name == "health" ||
              // name == "intersection" ||
              // name == "locality" ||
              // name == "natural_feature" ||
              // name == "place_of_worship" ||
              // name == "plus_code" ||
              // name == "point_of_interest" ||
              // name == "political" ||
              // name == "post_box" ||
              // name == "postal_code" ||
              // name == "postal_code_prefix" ||
              // name == "postal_code_suffix" ||
              // name == "postal_town" ||
              // name == "premise" ||
              // name == "room" ||
              // name == "route" ||
              // name == "store" ||
              // name == "street_address" ||
              // name == "sublocality" ||
              // name == "sublocality_level_1" ||
              // name == "sublocality_level_2" ||
              // name == "sublocality_level_3" ||
              // name == "sublocality_level_4" ||
              // name == "sublocality_level_5" ||
              // name == "subpremise" ||
              // name == "town_square"
            ) {
              return;
            }

            let result = containsType(type, typesArray);
            if (!result) {
              typesArray.push(type);
            } else {
              typesArray.filter((obj) => {
                if (obj.name == type.name) {
                  obj.counter++;
                }
              });
            }
          }
        }
      });

      // sort array by counter then name

      typesArray.sort((a, b) =>
        a.counter > b.counter
          ? -1
          : a.counter === b.counter
          ? a.name > b.name
            ? 1
            : -1
          : 1
      );

      commit("setTypes", typesArray);

      typesArray.map((type) => {
        return fb.typesCollection.add(type);
      });

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
    async countReviewTypes({ commit }) {
      const reviews = await fb.reviewsCollection.get();
      let typesArray = [];

      if (reviews.empty) {
        return;
      }

      reviews.forEach((doc) => {
        let review = doc.data();
        review.id = doc.id;

        if (review.place.types) {
          for (let t = 0; t < review.place.types.length; t++) {
            let name = review.place.types[t];
            let type = {
              name: name,
              counter: 1,
            };
            if (
              // name == "administrative_area_level_1" ||
              // name == "administrative_area_level_2" ||
              // name == "administrative_area_level_3" ||
              // name == "administrative_area_level_4" ||
              // name == "administrative_area_level_5" ||
              // name == "archipelago" ||
              // name == "colloquial_area" ||
              // name == "continent" ||
              // name == "country" ||
              name == "establishment" ||
              // name == "finance" ||
              // name == "floor" ||
              name == "food" ||
              // name == "general_contractor" ||
              name == "geocode"
              // name == "health" ||
              // name == "intersection" ||
              // name == "locality" ||
              // name == "natural_feature" ||
              // name == "place_of_worship" ||
              // name == "plus_code" ||
              // name == "point_of_interest" ||
              // name == "political" ||
              // name == "post_box" ||
              // name == "postal_code" ||
              // name == "postal_code_prefix" ||
              // name == "postal_code_suffix" ||
              // name == "postal_town" ||
              // name == "premise" ||
              // name == "room" ||
              // name == "route" ||
              // name == "store" ||
              // name == "street_address" ||
              // name == "sublocality" ||
              // name == "sublocality_level_1" ||
              // name == "sublocality_level_2" ||
              // name == "sublocality_level_3" ||
              // name == "sublocality_level_4" ||
              // name == "sublocality_level_5" ||
              // name == "subpremise" ||
              // name == "town_square"
            ) {
              return;
            }
            let result = containsType(type, typesArray);
            if (!result) {
              typesArray.push(type);
            } else {
              typesArray.filter((obj) => {
                if (obj.name == type.name) {
                  obj.counter++;
                }
              });
            }
          }
        }
      });

      // sort array by counter then name

      typesArray.sort((a, b) =>
        a.counter > b.counter
          ? -1
          : a.counter === b.counter
          ? a.name > b.name
            ? 1
            : -1
          : 1
      );

      commit("setTypes", typesArray);

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

    // Utilities

    async showSearchBar({ commit }, val) {
      commit("setSearchBar", val);
    },

    // Sets range for searches based on current region geometry.
    async getGeohashRange({ state, commit }) {
      const lowerLat = state.region.geometry.viewport.southwest.lat;
      const lowerLon = state.region.geometry.viewport.southwest.lng;

      const upperLat = state.region.geometry.viewport.northeast.lat;
      const upperLon = state.region.geometry.viewport.northeast.lng;

      const lower = geohash.encode(lowerLat, lowerLon);
      const upper = geohash.encode(upperLat, upperLon);

      commit("setRange", { lower, upper });
    },

    isLoading({ commit }, val) {
      commit("setLoading", val);
    },
  },
});

export default store;
