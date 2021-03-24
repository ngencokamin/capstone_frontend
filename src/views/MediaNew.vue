<template>
  <div class="media-new">
    <div class="material-background"></div>
    <div class="container">
      <div class="text-center mb-6">
        <h1
          class="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5"
        >
          All Shows
        </h1>
        <p
          class="lead lead-lg color-white text-center center-block mt-2 mb-4 mw-800 text-uppercase fw-300 animated fadeInUp animation-delay-7"
        >
          We're gonna have a TV party tonight!
          <br />
          <b>Alright!</b>
        </p>
      </div>

      <div class="form-group label-floating">
        <label class="control-label" for="addon2">Add a show</label>
        <div class="input-group">
          <input type="text" id="addon2" class="form-control" v-model="search" />
          <span class="input-group-btn">
            <button type="button" class="btn btn-fab btn-fab-mini" v-on:click="updateSearch">
              <i class="material-icons">search</i>
            </button>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="row text-center fadeIn">
            <div class="col-lg-4 col-md-6" v-for="result in media" :key="result.id">
              <div class="card width-auto">
                <img :src="result.poster" alt="Poster for result" />
                <div class="card-body overflow-hidden text-center">
                  <h3 class="color-info">{{ result.title }}</h3>
                  <p>{{ result.year }}</p>
                  <button class="btn btn-primary btn-raised" v-on:click="addMedia(result.omdb_id)">
                    <i class="zmdi zmdi-plus"></i>
                    Add Show
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
