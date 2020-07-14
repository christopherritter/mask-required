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
        <v-col cols="12" md="4">
          <div class="profile">
            <h5>{{ place.name }}</h5>
            <p v-if="place.address_components.length > 7">
              {{ place.address_components[2].short_name }},
              {{ place.address_components[5].short_name }}
              {{ place.address_components[7].short_name }}
            </p>
            <p v-else-if="place.address_components.length > 6">
              {{ place.address_components[2].short_name }},
              {{ place.address_components[4].short_name }}
              {{ place.address_components[6].short_name }}
            </p>
            <p v-else-if="place.address_components.length > 4">
              {{ place.address_components[2].short_name }},
              {{ place.address_components[5].short_name }}
            </p>
            <p v-else>{{ place.address_components[2].long_name }}</p>
            <div class="create-post">
              <p>create a post</p>
              <form @submit.prevent>
                <textarea v-model.trim="post.content"></textarea>
                <button
                  @click="createPost()"
                  :disabled="post.content === ''"
                  class="button"
                >
                  post
                </button>
              </form>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="8" class="pt-0">
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
