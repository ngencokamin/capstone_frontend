<template>
  <div class="home" v-if="media">
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
        <label class="control-label" for="addon2">Find or add a show</label>
        <div class="input-group">
          <input type="text" id="addon2" class="form-control" list="titles" v-model="filter" />
          <span class="input-group-btn">
            <router-link :to="{ path: '/media/new', query: { search: filter } }">
              <button type="button" class="btn btn-fab btn-fab-mini">
                <i class="material-icons">add</i>
              </button>
            </router-link>
          </span>
        </div>
      </div>
      <datalist id="titles">
        <option v-for="media in media" :key="media.id">
          {{ media.title }}
        </option>
      </datalist>
      <div class="row">
        <div class="col-md-12">
          <div class="row text-center">
            <div class="col-lg-4 col-md-6" v-for="media in filterBy(media, filter)" :key="media.id">
              <div class="card width-auto">
                <img :src="media.poster" alt="Poster for media" />
                <div class="card-body overflow-hidden text-center">
                  <a
                    href="javascript:void(0)"
                    class="btn-circle btn-circle-info btn-circle-raised btn-card-float right wow zoomInDown index-2"
                  >
                    <i class="zmdi zmdi-star"></i>
                  </a>
                  <h4 class="color-info">{{ media.title }}</h4>
                  <p>
                    {{ media.plot }}
                  </p>
                  <p class="color-info">{{ media.comment_count }} comments</p>
                  <router-link :to="`/media/${media.id}`"></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- container -->
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
