<template>
  <div class="media-show">
    <!-- Information about selected  media -->
    <h1>{{ media.title }}</h1>

    <img :src="media.poster" alt="Poster for selected media" />
    <h3>Released: {{ media.released }}</h3>
    <p>
      <b>{{ media.plot }}</b>
    </p>
    <small>Rated: {{ media.rated }} | IMDb Rating: {{ media.imdb_rating }}</small>
    <hr />
    <h2>Comments</h2>
    <button v-on:click="newComment()" v-if="!commentShow">New Comment</button>

    <div align="center" v-if="commentShow">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error.id">
          {{ error }}
        </li>
      </ul>
      <input type="text" v-model="suggestedMedia" placeholder="Type to search for shows" list="titles" />

      <router-link :to="{ path: '/media/new', query: { search: suggestedMedia } }">
        <button>Add new show</button>
      </router-link>
      <br />
      <label for="similarity">Similarity:</label>
      <input type="number" id="similarity" v-model="similarity" />
      <br />
      <label for="enjoyability">Enjoyability:</label>
      <input type="number" id="enjoyability" v-model="enjoyability" />
      <br />
      <label for="commentText">Additional comments:</label>
      <textarea name="commentText" id="commentText" v-model="commentText" cols="30" rows="10"></textarea>
      <br />
      <button v-on:click="addComment()">Add Comment</button>

      <datalist id="titles">
        <option v-for="media in allMedia" :key="media.id">
          {{ media.title }}
        </option>
      </datalist>
    </div>

    <br />
    <br />

    <!-- Comments section -->
    <div v-for="comment in orderBy(media.comments, 'votes', -1)" :key="comment.id" align="center">
      <div class="boxxed" style="padding-bottom: 5px;">
        <img :src="comment.user.profile_picture" alt="User profile picture" style="width: 10%;" />
        <router-link :to="`/users/${comment.user.id}`">
          <b>{{ comment.user.username }}</b>
        </router-link>
        <hr />
        <h2>Suggested Media</h2>
        <h4>{{ comment.suggested_media.title }}</h4>
        <img :src="comment.suggested_media.poster" alt="Poster for selected media" />
        <p>
          <b>Released: {{ comment.suggested_media.released }}</b>
        </p>
        <p>
          {{ comment.suggested_media.plot }}
        </p>
        <small>
          Rated: {{ comment.suggested_media.rated }} | IMDb Rating: {{ comment.suggested_media.imdb_rating }}
        </small>
        <hr />
        <!-- Information is shown unless edit button is clicked -->
        <span v-if="editCommentID != comment.id">
          <h2>User Comment</h2>
          <p>
            {{ comment.text }}
          </p>
          <hr />
          <h2>Verdict</h2>
          <p>
            <b>Similarity:</b>
            {{ comment.similarity }}
          </p>
          <p>
            <b>Enjoyability:</b>
            {{ comment.enjoyability }}
          </p>
          <button>
            👎
          </button>
          {{ comment.votes }}
          <button>
            👍
          </button>
          <hr v-if="$parent.userID() == comment.user_id" />
          <button v-if="$parent.userID() == comment.user_id" v-on:click="editCommentID = comment.id">
            Edit Comment
          </button>
        </span>
        <!-- Shows input fields instead if edit button is clicked -->
        <span v-if="comment.id == editCommentID">
          <h2>Edit Comment</h2>
          <h2>User Comment</h2>
          <textarea name="comment" cols="30" rows="10" v-model="comment.text"></textarea>
          <hr />
          <h2>Verdict</h2>
          <p>
            <b>Similarity:</b>
            <input type="number" v-model="comment.similarity" />
          </p>
          <p>
            <b>Enjoyability:</b>
            <input type="number" v-model="comment.enjoyability" />
          </p>
          <button v-on:click="editCommentID = 0">Cancel Changes</button>
          <button v-on:click="updateComment(comment)">Update Comment</button>
          <br />
          <button v-on:click="destroyComment(comment)">Delete Comment</button>
        </span>
      </div>

      <br />
    </div>
  </div>
</template>

<style>
/* temporary class pre-theme to improve visual clarity */
.boxxed {
  border: 1px solid black;
  width: 60%;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      media: {},
      comments: [],
      allMedia: [],
      commentShow: false,
      suggestedMedia: "",
      enjoyability: 0,
      similarity: 0,
      commentText: "",
      errors: [],
      editCommentID: 0,
      // voteValue: 0,
    };
  },
  created: function() {
    axios.get(`/api/media/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.media = response.data;
      this.comments = response.data.comments;
    });
  },
  methods: {
    findMedia: function(media) {
      return media.title === this.suggestedMedia;
    },
    newComment: function() {
      axios.get("/api/media").then(response => {
        this.allMedia = response.data;
        console.log(response.data);
        this.commentShow = true;
      });
    },
    addComment: function() {
      if (this.allMedia.find(this.findMedia) && this.allMedia.find(this.findMedia).id != this.$route.params.id) {
        var params = {
          text: this.commentText,
          similarity: this.similarity,
          enjoyability: this.enjoyability,
          media_id: this.$route.params.id,
          suggested_media_id: this.allMedia.find(this.findMedia).id,
        };
        axios
          .post("/api/comments", params)
          .then(response => {
            console.log(response.data);
            this.comments.push(response.data);
            this.commentShow = false;
          })
          .catch(error => {
            this.errors = [error.response.statusText];
            console.log(this.errors);
          });
      } else if (!this.allMedia.find(this.findMedia)) {
        this.errors = [
          "ERROR! Show not found. Please click the 'Add New Show' button to add it, or choose a different show.",
        ];
      } else {
        this.errors = ["ERROR! Suggested show cannot be the same as the original show."];
      }
    },
    updateComment: function(comment) {
      var params = {
        text: comment.text,
        similarity: comment.similarity,
        enjoyability: comment.enjoyability,
      };
      axios.patch(`/api/comments/${comment.id}`, params).then(response => {
        console.log(response.data);
        this.editCommentID = 0;
      });
    },
    destroyComment: function(comment) {
      if (confirm("Are you sure you want to delete this comment?")) {
        axios
          .delete(`/api/comments/${comment.id}`)
          .then(response => {
            console.log(response.data.message);
            alert(response.data.message);
            this.comments.splice(this.comments.indexOf(comment), 1);
          })
          .catch(error => {
            this.errors = error.response.data.errors;
            alert("Error! Couldn't delete user");
          });
      }
    },
  },
};
</script>
