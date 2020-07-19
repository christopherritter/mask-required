/*eslint no-unused-vars: ["error", { "args": "none" }]*/
<template>
  <v-main>
    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">close</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li>
                <a>comments {{ fullPost.comments }}</a>
              </li>
              <li>
                <a>likes {{ fullPost.likes }}</a>
              </li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div
              v-for="comment in postComments"
              :key="comment.id"
              class="comment"
            >
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <v-container id="place" fluid>
      <v-row>
        <v-col>
          <div class="profile">
            <h5>{{ place.name }}</h5>
            <p>{{ place.formatted_address }}</p>
            <!-- <div class="create-post">
              <p>create a post</p>
              <form @submit.prevent>
                <v-textarea v-model.trim="post.content"></v-textarea>
                <v-btn @click="createPost()" :disabled="post.content === ''">
                  post
                </v-btn>
              </form>
            </div> -->
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="reviews.length">
            <v-btn
              color="grey darken-4"
              dark
              class="mt-4 mx-4"
              @click="$router.push('review')"
              >Write a review</v-btn
            >
            <v-divider></v-divider>
            <div v-for="review in reviews" :key="review.id" class="review">
              <v-card-title class="review-username">{{
                review.userName
              }}</v-card-title>
              <v-card-subtitle class="review-created-on">{{
                review.createdOn | formatDate
              }}</v-card-subtitle>
              <v-card-text class="review-content">{{
                review.content | trimLength
              }}</v-card-text>
              <v-card-actions>
                <v-btn text @click="likePost(post.id, post.likes)"
                  >likes {{ post.likes }}</v-btn
                >

                <v-btn text @click="viewPost(post)">view full post</v-btn>
              </v-card-actions>
              <v-divider></v-divider>
            </div>
          </v-card>
          <v-card v-else>
            <v-card-text class="no-results"
              >There are currently no reviews</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import * as fb from "../firebase";

export default {
  data() {
    return {
      post: {
        content: "",
      },
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
    };
  },
  mounted() {
    this.$store.state.showSearch = true;
    this.$store.dispatch("fetchReviews");
    // fb.reviewsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
    //   let reviewsArray = [];

    //   snapshot.forEach((doc) => {
    //     let review = doc.data();
    //     review.id = doc.id;
    //     console.log(review);
    //     // if (review.place.id == this.$store.state.place.id) {
    //       reviewsArray.push(review);
    //     // } else {
    //     //   console.log(review.place.id);
    //     // }

    //   });

    //   this.$store.commit("setReviews", reviewsArray);
    // });
  },
  computed: {
    ...mapState(["userProfile", "place", ["reviews"], ["posts"]]),
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
      this.post.content = "";
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>
