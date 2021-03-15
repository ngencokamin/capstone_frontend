<template>
  <div class="users-show" v-if="user">
    <h1>{{ user.username }}</h1>
    <img
      :src="user.profile_picture ? user.profile_picture : require('../assets/default.jpeg')"
      alt="User profile picture"
      style="width: 25%;"
    />
    <p>{{ user.bio }}</p>
    <router-link :to="`/users/me/edit`" v-if="user.id == this.$parent.userID()">
      <button>Edit profile</button>
    </router-link>
    <div v-if="user.favorite_media">
      <hr />
      <h2>Favorite Show</h2>
      <h4>{{ user.favorite_media.title }}</h4>
      <router-link :to="`/media/${user.favorite_media.id}`">
        <img :src="user.favorite_media.poster" alt="Poster for selected media" />
      </router-link>
      <p>
        <b>Released: {{ user.favorite_media.released }}</b>
      </p>
      <p>
        {{ user.favorite_media.plot }}
      </p>
      <small>Rated: {{ user.favorite_media.rated }} | IMDb Rating: {{ user.favorite_media.imdb_rating }}</small>
    </div>
    <hr />
    <h1 v-if="user.comments.length > 0">Comments</h1>
    <h1 v-else>No comments found</h1>
    <div v-for="comment in orderBy(user.comments, 'updated_at', -1)" :key="comment.id">
      <h2>Media</h2>
      <h4>{{ comment.media.title }}</h4>
      <router-link :to="`/media/${comment.media.id}`">
        <img
          :src="comment.media.poster ? comment.media.poster : require('../assets/censorposter.png')"
          alt="Poster for selected media"
        />
      </router-link>
      <p>
        <b>Released: {{ comment.media.released }}</b>
      </p>
      <p>
        {{ comment.media.plot }}
      </p>
      <small>Rated: {{ comment.media.rated }} | IMDb Rating: {{ comment.media.imdb_rating }}</small>
      <h2>User Comment</h2>
      <p>
        {{ comment.text }}
      </p>
      <h2>Verdict</h2>
      <p>
        <b>Similarity:</b>
        {{ comment.similarity }}
      </p>
      <p>
        <b>Enjoyability:</b>
        {{ comment.enjoyability }}
      </p>
      <h2>Suggested Media</h2>
      <h4>{{ comment.suggested_media.title }}</h4>
      <router-link :to="`/media/${comment.suggested_media.id}`">
        <img
          :src="comment.suggested_media.poster ? comment.suggested_media.poster : require('../assets/censorposter.png')"
          alt="Poster for selected media"
        />
      </router-link>
      <p>
        <b>Released: {{ comment.suggested_media.released }}</b>
      </p>
      <p>
        {{ comment.suggested_media.plot }}
      </p>
      <small>Rated: {{ comment.suggested_media.rated }} | IMDb Rating: {{ comment.suggested_media.imdb_rating }}</small>
      <br />
      <small>Comment created {{ formatDate(comment.created_at) }}&nbsp;</small>
      <small v-if="comment.created_at != comment.updated_at">(edited {{ formatDate(comment.updated_at) }})</small>
      <hr />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      user: "",
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
