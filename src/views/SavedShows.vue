<template>
  <div class="saved-shows" v-if="saved">
    <div class="material-background"></div>
    <div class="container">
      <div class="text-center mb-6">
        <h1
          class="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5"
          v-if="saved.length > 0"
        >
          {{ saved[0].info.user.username }}'s Saved Shows
        </h1>
        <h1
          class="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5"
          v-else
        >
          No Saved Shows Found
        </h1>

        <p
          class="lead lead-lg color-white text-center center-block mt-2 mb-4 mw-800 text-uppercase fw-300 animated fadeInUp animation-delay-7"
          v-if="saved.length > 0"
        >
          There's nothing you can get from a book that you can't get from a television faster.
        </p>
        <p
          class="lead lead-lg color-white text-center center-block mt-2 mb-4 mw-800 text-uppercase fw-300 animated fadeInUp animation-delay-7"
          v-else
        >
          I'm fed up with all this reading! You're a Wormwood, you start acting like one! Now sit up and look at the TV.
        </p>
      </div>

      <div class="form-group label-floating" v-if="saved.length > 0">
        <label class="control-label" for="addon2">Find a show</label>
        <div class="input-group">
          <input type="text" id="addon2" class="form-control" list="titles" v-model="filter" autocomplete="off" />
        </div>
      </div>
      <datalist id="titles">
        <option v-for="media in saved" :key="media.id">
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
            <div
              class="col-lg-4 col-md-6"
              v-for="media in orderBy(filterBy(saved, filter), 'info.created_at', -1)"
              :key="media.id"
            >
              <div class="card width-auto">
                <img :src="media.poster" alt="Poster for media" />

                <br />

                <small>
                  <b>Rated {{ media.rated }} | Released: {{ media.released }}</b>
                </small>
                <button
                  class="btn-circle btn-circle-danger btn-circle-raised btn-card-float right wow zoomInDown index-2"
                  v-on:click="destroySaved(media)"
                  v-if="media.info.user_id == $parent.userID()"
                >
                  <i class="zmdi zmdi-delete"></i>
                </button>
                <div class="card-body overflow-hidden text-center">
                  <h4 class="color-info">{{ media.title }}</h4>
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
    formatDate: function(date) {
      return moment(date).fromNow();
    },
    destroySaved: function(saved) {
      if (confirm(`Are you sure you want to delete remove ${saved.title} from your watchlist?`)) {
        var deleteSuccess = function() {
          console.log("Card deleted successfully");
        };

        if (this.$parent.trelloListID) {
          var options = {
            interactive: false,
          };
          window.Trello.authorize(options);
          window.Trello.del(`/cards/${saved.info.trello_id}`, deleteSuccess);
        }
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
