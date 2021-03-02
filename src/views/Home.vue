<template>
  <div class="home">
    <div v-for="media in media" :key="media.id">
      <h2>{{ media.title }}</h2>
      <img :src="media.poster" alt="Poster for current media" />
      <p>
        <b>Rated {{ media.rated }} | Released: {{ media.released }}</b>
      </p>
      <router-link :to="`/media/${media.id}`"><button>More Info</button></router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      media: [],
    };
  },
  created: function() {
    axios.get("/api/media").then(response => {
      this.media = response.data;
      console.log(response.data);
    });
  },
  methods: {},
};
</script>
