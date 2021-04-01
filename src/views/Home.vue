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
          <input type="text" id="addon2" class="form-control" list="titles" v-model="filter" autocomplete="off"/>
          <span class="input-group-btn">
            <router-link :to="{ path: '/media/new', query: { search: filter } }">
              <button type="button" class="btn btn-fab btn-fab-mini">
                <i class="material-icons">search</i>
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
          <div
            class="row text-center"
            is="transition-group"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div class="col-lg-4 col-md-6" v-for="media in filterBy(media, filter)" :key="media.id">
              <div class="card width-auto">
                <img :src="media.poster" alt="Poster for media" />
                <br />
                <small>
                  <b>Rated {{ media.rated }} | Released: {{ media.released }}</b>
                </small>
                <div class="card-body overflow-hidden text-center">
                  <h2 class="color-primary">{{ media.title }}</h2>
                  <p>
                    {{ media.plot }}
                  </p>
                  <p class="color-info">{{ media.comment_count }} comments</p>
                  <router-link :to="`/media/${media.id}`">
                    <button class="btn btn-primary btn-raised">
                      <i class="zmdi zmdi-comment"></i>
                      View Comments
                    </button>
                  </router-link>
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
