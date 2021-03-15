<template>
  <div class="home" v-if="media">
    <input type="text" v-model="filter" placeholder="Type to filter shows" list="titles" />
    <router-link :to="{ path: '/media/new', query: { search: filter } }"><button>Add new show</button></router-link>
    <datalist id="titles">
      <option v-for="media in media" :key="media.id">
        {{ media.title }}
      </option>
    </datalist>
    <div v-for="media in filterBy(media, filter)" :key="media.id">
      <h2>{{ media.title }}</h2>
      <img :src="media.poster" alt="Poster for listed media" />
      <p>
        <b>Rated {{ media.rated }} | Released: {{ media.released }}</b>
      </p>
      <p>{{ media.comment_count }} comments</p>
      <router-link :to="`/media/${media.id}`"><button>More Info</button></router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      media: "",
      filter: "",
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
