<template>
  <v-main>
    <transition name="fade">
      <CommentModal
        v-if="showCommentModal"
        :post="selectedPost"
        @close="toggleCommentModal()"
      ></CommentModal>
    </transition>
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
        <v-col cols="12" md="8">
          <div>
            <div v-if="profile.name" class="profile-header">
              <h5>{{ place.name }}</h5>
              <p>{{ place.formatted_address }}</p>
            </div>
            <div v-if="profile.name == null" class="create-post">
              <h3>Create a Review</h3>
              <form @submit.prevent>
                <v-text-field
                  class="hidden-sm-and-down"
                  v-model="address"
                  id="review-autocomplete"
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Enter business name and location."
                  placeholder=""
                ></v-text-field>
                <div class="text-center">
                  <v-rating v-model="rating"></v-rating>
                </div>
                <v-textarea
                  name="input-7-1"
                  label="Feedback"
                  v-model.trim="post.content"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                  hint="Please provide additional feedback."
                ></v-textarea>
                <v-btn
                  @click="createPost()"
                  :disabled="post.content === ''"
                  color="primary"
                >
                  post
                </v-btn>
              </form>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="pt-0">
          <div v-if="posts.length">
            <div v-for="post in posts" :key="post.id" class="post">
              <h5>{{ post.userName }}</h5>
              <span>{{ post.createdOn | formatDate }}</span>
              <p>{{ post.content | trimLength }}</p>
              <ul>
                <li>
                  <a @click="toggleCommentModal(post)"
                    >comments {{ post.comments }}</a
                  >
                </li>
                <li>
                  <a @click="likePost(post.id, post.likes)"
                    >likes {{ post.likes }}</a
                  >
                </li>
                <li><a @click="viewPost(post)">view full post</a></li>
              </ul>
            </div>
          </div>
          <div v-else>
            <p class="no-results">There are currently no posts</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";
import { commentsCollection } from "@/firebase";

export default {
  data() {
    return {
      address: null,
      post: {
        content: "",
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  components: {
    CommentModal,
  },
  computed: {
    ...mapState(["userProfile", "place", ["posts"]]),
  },
  methods: {
    selectPlace(place) {
      this.$store.state.place = place;
    },
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
      this.post.content = "";
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    async viewPost(post) {
      const docs = await commentsCollection
        .where("postId", "==", post.id)
        .get();

      docs.forEach((doc) => {
        let comment = doc.data();
        comment.id = doc.id;
        this.postComments.push(comment);
      });

      this.fullPost = post;
      this.showPostModal = true;
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
    },
  },
  mounted() {
    this.$store.state.showSearch = false;

    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("review-autocomplete")
      // {
      //   bounds: new google.maps.LatLngBounds(
      //     new google.maps.LatLng(40.367474, -82.996216)
      //   )
      // }
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();

      this.selectPlace(place);

      // this.showUserLocationOnTheMap(
      //   place.geometry.location.lat(),
      //   place.geometry.location.lng()
      // );
    });
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