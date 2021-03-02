<template>
  <div class="home">
    <h1>{{ media.title }}</h1>

    <img :src="media.poster" alt="Poster for selected media" />
    <h3>Released: {{ media.released }}</h3>
    <p>
      <b>{{ media.plot }}</b>
    </p>
    <small>Rated: {{ media.rated }} | IMDb Rating: {{ media.imdb_rating }}</small>
    <hr />
    <h2>Comments</h2>
    <div v-for="comment in media.comments" :key="comment.id" align="center">
      <div class="boxxed">
        <img :src="comment.user.profile_picture" alt="User profile picture" style="width: 10%;" />
        <b>{{ comment.user.username }}</b>
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
export default {
  data: function() {
    return {
      media: {},
    };
  },
  created: function() {
    axios.get(`/api/media/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.media = response.data;
    });
  },
  methods: {},
};
</script>
