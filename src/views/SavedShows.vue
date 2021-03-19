<template>
  <div class="saved-shows" v-if="saved">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>
    <h1 v-if="saved.length > 0">{{ saved[0].info.user.username }}'s Saved Shows</h1>
    <h1 v-else>No saved shows found</h1>
    <button v-on:click="trelloTest()">Test trello</button>
    <div v-for="media in orderBy(saved, 'info.created_at', -1)" :key="media.id">
      <h2>{{ media.title }}</h2>
      <img :src="media.poster" alt="Poster for listed media" />
      <p>
        <b>Rated {{ media.rated }} | Released: {{ media.released }}</b>
      </p>
      <small>Added to watchlist {{ formatDate(media.info.created_at) }}</small>
      <br />
      <router-link :to="`/media/${media.id}`"><button>More Info</button></router-link>
      <button v-on:click="destroySaved(media)" v-if="media.info.user_id == $parent.userID()">
        Remove from watchlist
      </button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      saved: "",
      filter: "",
      errors: "",
      username: "",
    };
  },
  created: function() {
    axios.get(`/api/saved_shows/${this.$route.params.user_id}`).then(response => {
      this.saved = response.data;
      console.log(response.data);
    });
  },
  methods: {
    trelloTest: function() {
      var authenticationSuccess = function() {
        console.log("Successful authentication");
      };

      var authenticationFailure = function() {
        console.log("Failed authentication");
      };
      window.Trello.authorize({
        type: "popup",
        name: "Getting Started Application",
        scope: {
          read: "true",
          write: "true",
        },
        expiration: "never",
        success: authenticationSuccess,
        error: authenticationFailure,
      });
    },
    formatDate: function(date) {
      return moment(date).fromNow();
    },
    destroySaved: function(saved) {
      if (confirm(`Are you sure you want to delete remove ${saved.title} from your watchlist?`)) {
        axios
          .delete(`/api/saved_shows/${saved.info.id}`)
          .then(response => {
            console.log(response.data.message);
            alert(response.data.message);
            this.saved.splice(this.saved.indexOf(saved), 1);
          })
          .catch(error => {
            this.errors = error.response;
            alert("Error! Couldn't remove from watchlist");
          });
      }
    },
  },
};
</script>
