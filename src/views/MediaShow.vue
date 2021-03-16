<template>
  <div class="media-show" v-if="media">
    <!-- Information about selected  media -->
    <h1>{{ media.title }}</h1>
    <img :src="media.poster" alt="Poster for selected media" />
    <h3>Released: {{ media.released }}</h3>
    <p>
      <b>{{ media.plot }}</b>
    </p>
    <small>Rated: {{ media.rated }} | IMDb Rating: {{ media.imdb_rating }}</small>
    <br />
    <button v-on:click="addSaved(media)">Add to watchlist</button>
    <hr />
    <h2>Comments</h2>
    <button v-on:click="newComment()" v-if="!commentShow && $parent.loggedIn()">New Comment</button>

    <form v-on:submit.prevent="addComment" v-if="commentShow">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error.id">
          {{ error }}
        </li>
      </ul>
      <h2>Add Comment</h2>
      <input type="text" v-model="suggestedMedia" placeholder="Type to search for shows" list="titles" />

      <router-link :to="{ path: '/media/new', query: { search: suggestedMedia } }">
        <button type="button">Add new show</button>
      </router-link>
      <h2>Verdict</h2>
      <div class="form-group">
        <label for="similarity">Similarity:</label>
        <input type="number" id="similarity" v-model="similarity" min="1" max="10" />
      </div>
      <div class="form-group">
        <label for="enjoyability">Enjoyability:</label>
        <input type="number" id="enjoyability" v-model="enjoyability" min="1" max="10" />
      </div>
      <div class="form-group">
        <label for="commentText">Additional comments:</label>
        <textarea name="commentText" id="commentText" v-model="commentText" cols="30" rows="10"></textarea>
      </div>
      <button v-on:click="commentShow = false" type="button">Cancel</button>
      <input type="submit" class="btn btn-primary" value="Add" />
      <datalist id="titles">
        <option v-for="media in allMedia" :key="media.id">
          {{ media.title }}
        </option>
      </datalist>
    </form>

    <br />
    <br />

    <!-- Comments section -->
    <div v-for="comment in orderBy(media.comments, 'votes', -1)" :key="comment.id" align="center">
      <div class="boxxed" style="padding-bottom: 5px;">
        <img
          :src="comment.user.profile_picture ? comment.user.profile_picture : require('../assets/default.jpeg')"
          alt="User profile picture"
          style="width: 10%;"
        />
        <router-link :to="`/users/${comment.user.id}`">
          <b>{{ comment.user.username }}</b>
        </router-link>
        <hr />
        <h2>Suggested Media</h2>
        <h4>{{ comment.suggested_media.title }}</h4>
        <a :href="`/media/${comment.suggested_media.id}`">
          <img :src="comment.suggested_media.poster" alt="Poster for selected media" />
        </a>
        <p>
          <b>Released: {{ comment.suggested_media.released }}</b>
        </p>
        <p>
          {{ comment.suggested_media.plot }}
        </p>
        <small>
          Rated: {{ comment.suggested_media.rated }} | IMDb Rating: {{ comment.suggested_media.imdb_rating }}
        </small>
        <br />
        <button v-on:click="addSaved(media)">Add to watchlist</button>
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
          <button v-on:click="addVote(comment, -1)" :disabled="comment.voted == -1">
            👎
          </button>
          {{ comment.vote_total }}
          <button v-on:click="addVote(comment, 1)" :disabled="comment.voted == 1">
            👍
          </button>
          <br />
          <small>Created {{ formatDate(comment.created_at) }}&nbsp;</small>
          <small v-if="comment.created_at != comment.updated_at">(edited {{ formatDate(comment.updated_at) }})</small>
          <hr v-if="$parent.userID() == comment.user_id" />
          <button v-if="$parent.userID() == comment.user_id" v-on:click="editCommentID = comment.id">
            Edit Comment
          </button>
        </span>
        <!-- Shows input fields instead if edit button is clicked -->
        <form v-on:submit.prevent="updateComment(comment)" v-if="comment.id == editCommentID">
          <h2>Edit Comment</h2>

          <div class="form-group">
            <label>User comment:</label>
            <textarea name="comment" cols="30" rows="10" v-model="comment.text"></textarea>
          </div>
          <h2>Verdict</h2>
          <div class="form-group">
            <label>Similarity:</label>
            <input type="number" v-model="comment.similarity" min="1" max="10" />
          </div>
          <div class="form-group">
            <label>Enjoyability:</label>
            <input type="number" v-model="comment.enjoyability" min="1" max="10" />
          </div>
          <button v-on:click="editCommentID = 0" type="button">Cancel Changes</button>
          <input type="submit" class="btn btn-primary" value="Update" />
          <br />
          <button v-on:click="destroyComment(comment)" type="button">Delete Comment</button>
        </form>
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
import moment from "moment";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      media: "",
      comments: [],
      allMedia: [],
      commentShow: false,
      suggestedMedia: "",
      enjoyability: 1,
      similarity: 1,
      commentText: "",
      errors: [],
      editCommentID: 0,
    };
  },
  created: function() {
    axios.get(`/api/media/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.media = response.data;
      this.comments = response.data.comments;
      for (var i = 0; i < this.comments.length; i++) {
        if (this.comments[i].votes.some(vote => vote.user_id == this.$parent.userID())) {
          this.comments[i].voted = this.comments[i].votes.find(vote => vote["user_id"] == this.$parent.userID()).value;
        }
      }
    });
  },
  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },
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
            this.commentText = "";
            this.similarity = 1;
            this.enjoyability = 1;
            this.suggestedMedia = "";
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
            alert("Error! Couldn't delete comment");
          });
      }
    },
    addVote: function(comment, value) {
      if (!comment.voted) {
        var params = {
          comment_id: comment.id,
          value: value,
        };
        axios
          .post("/api/votes", params)
          .then(response => {
            console.log(response.data);
            comment.vote_total += value;
            comment.voted = value;
            comment.votes.push(response.data);
            console.log(comment.votes);
          })
          .catch(error => {
            this.errors = [error.response];
            console.log(this.errors);
          });
      } else if (comment.voted != value) {
        params = {
          value: value,
        };
        axios
          .patch(`/api/votes/${comment.votes.find(vote => vote["user_id"] == this.$parent.userID()).id}`, params)
          .then(response => {
            console.log(response.data);
            comment.vote_total += value + value;
            comment.voted = value;
          });
      }
    },
    addSaved: function(media) {
      var params = {
        media_id: media.id,
      };
      axios
        .post("/api/saved_shows", params)
        .then(response => {
          console.log(response.data);
          alert(`${this.media.title} has been added to your watchlist`);
        })
        .catch(error => {
          this.errors = [error.response.data.errors];
          if (error.response.data.errors == "Media has already been taken") {
            alert(`ERROR: ${this.media.title} is already on your watchlist`);
          }
        });
    },
  },
};
</script>
