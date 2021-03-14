<template>
  <div class="media-new">
    <input type="text" placeholder="Type to search for a new show" v-model="search" />
    <button v-on:click="updateSearch">Search</button>
    <div v-for="suggestion in media" :key="suggestion.omdb_id">
      <h3>{{ suggestion.title }}</h3>
      <img :src="suggestion.poster" alt="" />
      <p>{{ suggestion.year }}</p>
      <button v-on:click="addMedia(suggestion.omdb_id)">Add show</button>
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
