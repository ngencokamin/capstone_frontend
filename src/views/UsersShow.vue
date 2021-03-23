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
              >
                <i class="zmdi zmdi-edit"></i>
                Edit Profile
              </a>
            </div>
            <div class="col-lg-12 col-md-6 order-md-2 order-lg-3" v-if="user.favorite_media">
              <div class="card animated fadeInUp animation-delay-12">
                <div class="ms-hero-bg-info ms-hero-img-mountain">
                  <h3 class="color-white index-1 text-center pb-4 pt-4">Favorite Show</h3>
                </div>
                <div class="card-body">
                  <img :src="user.favorite_media.poster" alt="Poster for user.favorite_media" />
                  <br />
                  <small>
                    <b>Rated {{ user.favorite_media.rated }} | Released: {{ user.favorite_media.released }}</b>
                  </small>
                  <div class="card-body overflow-hidden text-center">
                    <h4 class="color-info">{{ user.favorite_media.title }}</h4>
                    <p>
                      {{ user.favorite_media.plot }}
                    </p>
                    <router-link :to="`/media/${user.favorite_media.id}`">
                      <button class="btn btn-primary btn-raised">
                        <i class="zmdi zmdi-globe"></i>
                        View Comments
                      </button>
                    </router-link>
                  </div>
                  <!-- <div class="ms-media-list">
                    <div class="media mb-2">
                      <a class="mr-3" href="#">
                        <img class="media-object" src="assets/img/demo/avatar6.jpg" />
                      </a>
                      <div class="media-body">
                        <h4 class="mt-0 mb-0 color-warning">Maria Sharaphova</h4>
                        <a href="mailto:joe@example.com?subject=feedback">maria.sha@example.com</a>
                        <div class="">
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-facebook">
                            <i class="zmdi zmdi-facebook"></i>
                          </a>
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-twitter">
                            <i class="zmdi zmdi-twitter"></i>
                          </a>
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-instagram">
                            <i class="zmdi zmdi-instagram"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="media mb-2">
                      <div class="media-left media-middle">
                        <a class="mr-3" href="#">
                          <img class="media-object" src="assets/img/demo/avatar3.jpg" />
                        </a>
                      </div>
                      <div class="media-body">
                        <h4 class="mt-0 mb-0 color-warning">Rafael Nadal</h4>
                        <a href="mailto:joe@example.com?subject=feedback">rafa.nad@example.com</a>
                        <div class="">
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-facebook">
                            <i class="zmdi zmdi-facebook"></i>
                          </a>
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-twitter">
                            <i class="zmdi zmdi-twitter"></i>
                          </a>
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-instagram">
                            <i class="zmdi zmdi-instagram"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="media mb-2">
                      <div class="media-left media-middle">
                        <a class="mr-3" href="#">
                          <img class="media-object" src="assets/img/demo/avatar5.jpg" />
                        </a>
                      </div>
                      <div class="media-body">
                        <h4 class="mt-0 mb-0 color-warning">Roger Federer</h4>
                        <a href="mailto:joe@example.com?subject=feedback">roger.fef@example.com</a>
                        <div class="">
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-facebook">
                            <i class="zmdi zmdi-facebook"></i>
                          </a>
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-twitter">
                            <i class="zmdi zmdi-twitter"></i>
                          </a>
                          <a href="javascript:void(0)" class="btn-circle btn-circle-xs no-mr-md btn-instagram">
                            <i class="zmdi zmdi-instagram"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <h2 class="color-primary text-center mt-4 mb-2">Recent Activity</h2>
          <div class="row">
            <div class="col-lg-12">
              <ul class="ms-timeline">
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      2016
                      <span>March</span>
                    </time>
                    <i class="ms-timeline-point bg-royal"></i>
                    <img src="assets/img/demo/avatar6.jpg" class="ms-timeline-point-img" />
                  </div>
                  <div class="card card-royal">
                    <div class="card-header">
                      <h3 class="card-title">Card Title</h3>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-4">
                          <img src="assets/img/demo/office1.jpg" alt="" class="img-fluid" />
                        </div>
                        <div class="col-sm-8">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, praesentium, quam! Quia
                            fugiat aperiam.
                          </p>
                          <p>
                            Perspiciatis soluta voluptate dolore officiis libero repellat cupiditate explicabo atque
                            facere aliquam.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      2015
                      <span>October</span>
                    </time>
                    <i class="ms-timeline-point bg-info"></i>
                  </div>
                  <div class="card card-info">
                    <div class="card-header">
                      <h3 class="card-title">Card Title</h3>
                    </div>
                    <div class="list-group">
                      <a href="javascript:void(0)" class="list-group-item withripple">
                        <i class="zmdi zmdi-favorite"></i>
                        Cras justo odio
                        <span class="badge badge-default pull-right">Active</span>
                      </a>
                      <a href="javascript:void(0)" class="list-group-item withripple">
                        <i class="zmdi zmdi-cocktail"></i>
                        Dapibus ac facilisis in
                        <span class="badge badge-primary pull-right">Other</span>
                      </a>
                      <a href="javascript:void(0)" class="list-group-item withripple active">
                        <i class="zmdi zmdi-cast"></i>
                        Morbi leo risus
                        <span class="badge badge-default pull-right">New</span>
                      </a>
                      <a href="javascript:void(0)" class="list-group-item withripple">
                        <i class="zmdi zmdi-city"></i>
                        Porta ac consectetur ac
                        <span class="badge badge-warning pull-right">Two words</span>
                      </a>
                      <a href="javascript:void(0)" class="list-group-item withripple">
                        <i class="zmdi zmdi-chart"></i>
                        Vestibulum at eros
                        <span class="badge badge-success pull-right">Success</span>
                      </a>
                    </div>
                  </div>
                </li>
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      2015
                      <span>October</span>
                    </time>
                    <i class="ms-timeline-point bg-success"></i>
                  </div>
                  <div class="card card-success-inverse">
                    <div class="card-body">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus officiis autem magni et,
                      nisi eveniet nulla magnam tenetur voluptatem dolore, assumenda delectus error porro animi
                      architecto dolorum quod veniam nesciunt.
                    </div>
                  </div>
                </li>
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      2015
                      <span>February</span>
                    </time>
                    <i class="ms-timeline-point bg-warning"></i>
                    <img src="assets/img/demo/avatar2.jpg" class="ms-timeline-point-img" />
                  </div>
                  <div class="card card-warning">
                    <div class="card-header">
                      <h3 class="card-title">Card Title</h3>
                    </div>
                    <div class="card-body">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, nulla recusandae blanditiis
                        architecto soluta culpa obcaecati quis earum atque consequuntur.
                      </p>
                      <div class="row">
                        <div class="col-sm-4">
                          <img src="assets/img/demo/office2.jpg" alt="" class="img-fluid" />
                        </div>
                        <div class="col-sm-4">
                          <img src="assets/img/demo/office3.jpg" alt="" class="img-fluid" />
                        </div>
                        <div class="col-sm-4">
                          <img src="assets/img/demo/office4.jpg" alt="" class="img-fluid" />
                        </div>
                      </div>
                      <br />
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, ipsum voluptates eius
                        placeat dolorum reprehenderit ducimus accusamus magni aspernatur at dolore assumenda quae
                        suscipit enim veritatis obcaecati molestias laudantium maxime!
                      </p>
                    </div>
                  </div>
                </li>
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      2014
                      <span>July</span>
                    </time>
                    <i class="ms-timeline-point"></i>
                  </div>
                  <div class="card">
                    <blockquote class="blockquote blockquote-color-bg-primary withripple color-white">
                      <p>
                        <strong>Blockquote in timeline!</strong>
                        consectetur adipiscing elit. Integer sodales sagittis magna. consectetur adipiscing elit sed
                        consequat, quam semper libero.
                      </p>
                      <footer>
                        Someone famous in
                        <cite title="Source Title">Source Title</cite>
                      </footer>
                    </blockquote>
                  </div>
                </li>
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      2014
                      <span>January</span>
                    </time>
                    <i class="ms-timeline-point bg-info"></i>
                    <img src="assets/img/demo/avatar3.jpg" class="ms-timeline-point-img" />
                  </div>
                  <div class="card card-info">
                    <div class="card-header">
                      <h3 class="card-title">Card Title</h3>
                    </div>
                    <div class="js-player" data-plyr-provider="youtube" data-plyr-embed-id="9ZfN87gSjvI"></div>
                  </div>
                </li>
                <li class="ms-timeline-item wow materialUp">
                  <div class="ms-timeline-date">
                    <time class="timeline-time" datetime="">
                      2013
                      <span>June</span>
                    </time>
                    <i class="ms-timeline-point"></i>
                  </div>
                  <div class="card">
                    <div class="ms-hero-bg-primary ms-hero-img-coffee">
                      <h3 class="color-white index-1 text-center no-m pt-4">Victoria Smith</h3>
                      <div class="color-medium index-1 text-center np-m">@vic_smith</div>
                      <img src="assets/img/demo/avatar1.jpg" alt="..." class="img-avatar-circle" />
                    </div>
                    <div class="card-body pt-4 text-center">
                      <h3 class="color-primary">Bio</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur alter adipisicing elit. Facilis, natuse inse voluptates
                        officia repudiandae beatae magni es magnam autem molestias.
                      </p>
                      <a
                        href="javascript:void(0)"
                        class="btn-circle btn-circle-raised btn-circle-xs mt-1 mr-1 no-mr-md btn-facebook"
                      >
                        <i class="zmdi zmdi-facebook"></i>
                      </a>
                      <a
                        href="javascript:void(0)"
                        class="btn-circle btn-circle-raised btn-circle-xs mt-1 mr-1 no-mr-md btn-twitter"
                      >
                        <i class="zmdi zmdi-twitter"></i>
                      </a>
                      <a
                        href="javascript:void(0)"
                        class="btn-circle btn-circle-raised btn-circle-xs mt-1 mr-1 no-mr-md btn-instagram"
                      >
                        <i class="zmdi zmdi-instagram"></i>
                      </a>
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
    <h1>{{ user.username }}</h1>
    <img
      :src="user.profile_picture ? user.profile_picture : require('../assets/default.jpeg')"
      alt="User profile picture"
      style="width: 25%;"
    />
    <p>{{ user.bio }}</p>
    <router-link :to="`/users/me/edit`" v-if="user.id == this.$parent.userID()">
      <button>Edit profile</button>
    </router-link>
    <router-link :to="`/watchlist/${user.id}`">
      <button>{{ user.username }}'s watchlist</button>
    </router-link>
    <div v-if="user.favorite_media">
      <hr />
      <h2>Favorite Show</h2>
      <h4>{{ user.favorite_media.title }}</h4>
      <router-link :to="`/media/${user.favorite_media.id}`">
        <img :src="user.favorite_media.poster" alt="Poster for selected media" />
      </router-link>
      <p>
        <b>Released: {{ user.favorite_media.released }}</b>
      </p>
      <p>
        {{ user.favorite_media.plot }}
      </p>
      <small>Rated: {{ user.favorite_media.rated }} | IMDb Rating: {{ user.favorite_media.imdb_rating }}</small>
    </div>
    <hr />
    <h1 v-if="user.comments.length > 0">Comments</h1>
    <h1 v-else>No comments found</h1>
    <div v-for="comment in orderBy(user.comments, 'updated_at', -1)" :key="comment.id">
      <h2>Media</h2>
      <h4>{{ comment.media.title }}</h4>
      <router-link :to="`/media/${comment.media.id}`">
        <img :src="comment.media.poster" alt="Poster for selected media" />
      </router-link>
      <p>
        <b>Released: {{ comment.media.released }}</b>
      </p>
      <p>
        {{ comment.media.plot }}
      </p>
      <small>Rated: {{ comment.media.rated }} | IMDb Rating: {{ comment.media.imdb_rating }}</small>
      <h2>User Comment</h2>
      <p>
        {{ comment.text }}
      </p>
      <h2>Verdict</h2>
      <p>
        <b>Similarity:</b>
        {{ comment.similarity }}
      </p>
      <p>
        <b>Enjoyability:</b>
        {{ comment.enjoyability }}
      </p>
      <h2>Suggested Media</h2>
      <h4>{{ comment.suggested_media.title }}</h4>
      <router-link :to="`/media/${comment.suggested_media.id}`">
        <img :src="comment.suggested_media.poster" alt="Poster for selected media" />
      </router-link>
      <p>
        <b>Released: {{ comment.suggested_media.released }}</b>
      </p>
      <p>
        {{ comment.suggested_media.plot }}
      </p>
      <small>Rated: {{ comment.suggested_media.rated }} | IMDb Rating: {{ comment.suggested_media.imdb_rating }}</small>
      <br />
      <small>Comment created {{ formatDate(comment.created_at) }}&nbsp;</small>
      <small v-if="comment.created_at != comment.updated_at">(edited {{ formatDate(comment.updated_at) }})</small>
      <br />
      <button v-on:click="destroyComment(comment)" v-if="user.id == $parent.userID()">Delete Comment</button>
      <hr />
    </div>
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
      return moment(date).fromNow();
    },
  },
};
</script>
