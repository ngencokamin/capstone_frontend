<template>
  <div class="media-new">
    <input type="text" placeholder="Type to search for a new show" v-model="search" />
    <button v-on:click="updateSearch">Search</button>
    <div v-for="result in media" :key="result.omdb_id">
      <h3>{{ result.title }}</h3>
      <img
        :src="result.poster ? result.poster : require('../assets/censorposter.png')"
        alt="Posted for media search result"
      />
      <p>{{ result.year }}</p>
      <button v-on:click="addMedia(result.omdb_id)">Add show</button>
      <br />
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
      search: this.$route.query.search,
    };
  },
  created: function() {
    axios.get(`/api/omdb_media/${this.search}`).then(response => {
      console.log(response.data);
      this.media = response.data;
    });
  },
  methods: {
    updateSearch: function() {
      axios.get(`/api/omdb_media/${this.search}`).then(response => {
        console.log(response.data);
        this.media = response.data;
      });
    },
    addMedia: function(mediaID) {
      var params = {
        omdb_id: mediaID,
      };
      axios.post("/api/media", params).then(response => {
        console.log(response.data);
        this.$router.push(`/media/${response.data.id}`);
      });
    },
  },
};
</script>
