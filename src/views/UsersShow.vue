<template>
  <div class="users-show" v-if="user">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="row">
            <div class="col-lg-12 col-md-6 order-md-1">
              <div class="card animated fadeInUp animation-delay-7">
                <div class="ms-hero-bg-primary ms-hero-img-mountain">
                  <h3 class="color-white index-1 text-center no-m pt-4">{{ user.username }}</h3>
                  <img
                    :src="user.profile_picture ? user.profile_picture : require('../assets/default.jpeg')"
                    alt="User profile photo"
                    class="img-avatar-circle"
                  />
                </div>
                <div class="card-body pt-4 text-center">
                  <h3 class="color-primary">Bio</h3>
                  <p>
                    {{ user.bio ? user.bio : "This user has not written a bio yet" }}
                  </p>
                  <small>
                    <strong>{{ user.comments.length }} Comments Written</strong>
                  </small>
                </div>
              </div>
            </div>
            <div class="col-lg-12 col-md-12 order-md-3 order-lg-2">
              <a
                href="javascript:void(0)"
                class="btn btn-warning btn-raised btn-block animated fadeInUp animation-delay-12"
                v-if="user.id == this.$parent.userID()"
              >
                <i class="zmdi zmdi-edit"></i>
                Edit Profile
              </a>
              <router-link
                :to="`/watchlist/${user.id}`"
                class="btn btn-warning btn-raised btn-block animated fadeInUp animation-delay-12"
              >
                <i class="zmdi zmdi-tv"></i>
                {{ user.username }}'s Watchlist'
              </router-link>
            </div>
            <div class="col-lg-12 col-md-6 order-md-2 order-lg-3" v-if="user.favorite_media">
              <div class="card animated fadeInUp animation-delay-12">
                <div class="ms-hero-bg-info ms-hero-img-mountain">
                  <h3 class="color-white index-1 text-center pb-4 pt-4">Favorite Show</h3>
                </div>
                <div class="card-body text-center">
                  <img :src="user.favorite_media.poster" alt="Poster for user.favorite_media" />
                  <br />
                  <small>
                    <b>
                      Rated {{ user.favorite_media.rated }} | Released: {{ user.favorite_media.released }} | IMDb
                      Rating: {{ user.favorite_media.imdb_rating }}
                    </b>
                  </small>
                  <div class="card-body overflow-hidden text-center">
                    <h4 class="color-info">{{ user.favorite_media.title }}</h4>
                    <p>
                      {{ user.favorite_media.plot }}
                    </p>
                    <router-link :to="`/media/${user.favorite_media.id}`">
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
        <div class="col-lg-8">
          <h2 class="color-primary text-center mt-4 mb-2">Comments</h2>
          <h3 v-if="user.comments.length == 0" class="color-primary text-center mt-4 mb-2">No Comments Found</h3>
          <div class="row">
            <div class="col-lg-12">
              <ul class="ms-timeline" v-for="comment in orderBy(user.comments, 'updated_at', -1)" :key="comment.id">
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      <span>{{ formatDate(comment.updated_at)[0] }}</span>
                      {{ formatDate(comment.updated_at)[1] }}
                    </time>
                    <i class="ms-timeline-point bg-primary"></i>
                  </div>
                  <div class="card card-primary">
                    <div class="card-header">
                      <h1 class="card-title text-center">Original Media</h1>
                    </div>

                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-4 text-center">
                          <img
                            :src="comment.media.poster"
                            alt="Poster for original media being commented on"
                            class="img-fluid"
                          />
                          <br />
                          <small>
                            <b>{{ comment.media.released }} | {{ comment.media.rated }}</b>
                          </small>
                        </div>
                        <div class="col-sm-8">
                          <h1>{{ comment.media.title }}</h1>
                          <p>
                            {{ comment.media.plot }}
                          </p>
                        </div>
                        <router-link :to="`/media/${comment.media.id}`">
                          <button class="btn btn-primary btn-raised">
                            <i class="zmdi zmdi-comment"></i>
                            All Comments
                          </button>
                        </router-link>
                      </div>
                    </div>
                    <div class="card-header">
                      <h1 class="card-title text-center">Suggested Media</h1>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-4 text-center">
                          <img
                            :src="comment.suggested_media.poster"
                            alt="Poster for suggested media from comment"
                            class="img-fluid"
                          />
                          <br />
                          <small>
                            <b>{{ comment.suggested_media.released }} | {{ comment.suggested_media.rated }}</b>
                          </small>
                        </div>
                        <div class="col-sm-8">
                          <p>
                            {{ comment.suggested_media.plot }}
                          </p>
                        </div>
                        <router-link :to="`/media/${comment.suggested_media.id}`">
                          <button class="btn btn-primary btn-raised">
                            <i class="zmdi zmdi-comment"></i>
                            All Comments
                          </button>
                        </router-link>
                      </div>
                    </div>
                    <div class="card-header">
                      <h1 class="card-title text-center">Verdict</h1>
                    </div>
                    <div class="card-body">
                      <div class="row text-center">
                        <div class="col-lg-6">
                          <div class="card-body">
                            <h3 class="color-primary">User Comment</h3>
                            <p>
                              {{ comment.text }}
                            </p>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="card-body">
                            <h3 class="color-primary">Rating</h3>
                            <ul class="list-unstyled">
                              <li>
                                <strong>Similarity:</strong>
                                {{ comment.similarity }}
                              </li>
                              <li>
                                <strong>Enjoyability:</strong>
                                {{ comment.enjoyability }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- container -->

    <!-- My code -->
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
    destroyComment: function(comment) {
      if (confirm("Are you sure you want to delete this comment?")) {
        axios
          .delete(`/api/comments/${comment.id}`)
          .then(response => {
            console.log(response.data.message);
            alert(response.data.message);
            this.user.comments.splice(this.user.comments.indexOf(comment), 1);
          })
          .catch(error => {
            this.errors = error.response;
            alert("Error! Couldn't delete comment");
          });
      }
    },
    formatDate(date) {
      // return moment(date).fromNow();
      return [moment(date).format("MMMM Do"), moment(date).format("YYYY")];
    },
  },
};
</script>
