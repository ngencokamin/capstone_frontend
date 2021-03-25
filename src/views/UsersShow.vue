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
              <router-link
                :to="`/watchlist/${user.id}`"
                class="btn btn-primary btn-raised btn-block animated fadeInUp animation-delay-12"
              >
                <i class="zmdi zmdi-tv"></i>
                {{ user.username }}'s Watchlist
              </router-link>
              <button
                data-toggle="modal"
                data-target="#editModal"
                class="btn btn-warning btn-raised btn-block animated fadeInUp animation-delay-12"
                v-if="user.id == this.$parent.userID()"
              >
                <i class="zmdi zmdi-edit"></i>
                Edit Profile
              </button>
              <button
                v-on:click="destroyUser()"
                class="btn btn-danger btn-raised btn-block animated fadeInUp animation-delay-12"
                v-if="user.id == this.$parent.userID()"
              >
                <i class="zmdi zmdi-delete"></i>
                Delete Account
              </button>
            </div>
            <div class="col-lg-12 col-md-6 order-md-2 order-lg-3">
              <div class="card animated fadeInUp animation-delay-12 ">
                <div class="ms-hero-bg-info ms-hero-img-mountain">
                  <h3 class="color-white index-1 text-center pb-4 pt-4">Favorite Show</h3>
                </div>
                <div class="card-body text-center" v-if="user.favorite_media">
                  <img class="img-fluid" :src="user.favorite_media.poster" alt="Poster for user.favorite_media" />
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
                <div class="card-body text-center" v-else>
                  <div class="card-body overflow-hidden text-center">
                    <h2 class="color-info">No favorite show found</h2>
                    <p>
                      <i>I have failed you Anakin. I have failed you.</i>
                    </p>
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
                        <div class="card-body text-center">
                          <button
                            v-if="$parent.userID() == comment.user_id"
                            v-on:click="destroyComment(comment)"
                            class="btn btn-danger btn-raised"
                          >
                            <i class="zmdi zmdi-delete"></i>
                            Delete
                          </button>
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
    <div class="modal" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel">
      <div class="modal-dialog modal-lg animated zoomIn animated-3x" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title color-primary" id="editModalLabel">Edit Profile</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="zmdi zmdi-close"></i></span>
            </button>
          </div>
          <form class="form-horizontal" v-on:submit.prevent="updateUser()">
            <fieldset class="container">
              <div class="modal-body">
                <ul>
                  <li class="text-danger" v-for="error in errors" v-bind:key="error.id">
                    {{ error }}
                  </li>
                </ul>
                <div class="form-group label-floating">
                  <input class="form-control" type="file" v-on:change="setFile($event)" ref="fileInput" />
                  <div class="input-group">
                    <img
                      :src="user.profile_picture ? user.profile_picture : require('../assets/default.jpeg')"
                      alt="User profile photo"
                      class="img-avatar-circle "
                      id="editProfilePhoto"
                    />
                  </div>
                </div>
                <br />
                <h3 class="text-center">Click to change profile photo</h3>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="zmdi zmdi-email"></i></span>
                    <label class="control-label" for="ms-form-email">Email</label>
                    <input type="text" id="ms-form-email" class="form-control" v-model="user.email" />
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
                    <label class="control-label" for="ms-form-username">Username</label>
                    <input type="text" id="ms-form-username" class="form-control" v-model="user.username" />
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <label class="control-label" for="ms-form-bio">bio</label>
                    <textarea
                      class="form-control"
                      rows="3"
                      id="ms-form-bio"
                      v-model="user.bio"
                      placeholder="Type to add a bio. Go ahead, make my day."
                    ></textarea>
                  </div>
                </div>
                <div class="form-group label-floating" v-if="showFavorite">
                  <div class="input-group">
                    <label class="control-label" for="addon2">Find a show</label>
                    <input
                      type="text"
                      id="addon2"
                      class="form-control"
                      list="titles"
                      v-model="favoriteMedia"
                      autocomplete="off"
                    />
                  </div>
                  <datalist id="titles">
                    <option v-for="media in allMedia" :key="media.id">
                      {{ media.title }}
                    </option>
                  </datalist>
                </div>
                <div class="form-group label-floating" v-if="!showFavorite">
                  <div class="input-group">
                    <button
                      class="btn btn-raised btn-primary"
                      v-on:click="addFavorite()"
                      type="button"
                      v-if="!user.favorite_media"
                    >
                      <i class="zmdi zmdi-play"></i>
                      Add Favorite Show
                    </button>
                    <button class="btn btn-raised btn-primary" v-on:click="addFavorite()" type="button" v-else>
                      <i class="zmdi zmdi-play"></i>
                      Add Favorite Show
                    </button>
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group" v-if="!user.trello">
                    <button
                      class="btn btn-raised btn-linkedin"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Enabling Trello integration allows automatic syncing of watchlist data to a Trello board for added convenience"
                      type="button"
                      v-on:click="addTrello()"
                      :disabled="trello"
                    >
                      <i class="fa fa-trello"></i>
                      Add Trello
                    </button>
                  </div>
                  <div class="input-group" v-else>
                    <button
                      class="btn btn-raised btn-danger"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Removing Trello integration will delete your &quot;It's Over, Isn't It&quot; board on Trello."
                      type="button"
                      v-on:click="removeTrello()"
                      :disabled="!trello"
                    >
                      <i class="fa fa-trello"></i>
                      Remove Trello
                    </button>
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <div class="checkbox ">
                      <label>
                        <input type="checkbox" autocomplete="off" v-model="user.profanity_filter" />
                        <span class="checkbox-material"><span class="check"></span></span>
                        Enable profanity filter?
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-raised btn-primary" value="Update">
                  Save changes
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";
import $ from "jquery";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      user: "",
      errors: [],
      showFavorite: false,
      allMedia: [],
      favoriteMedia: "",
      trelloListID: "",
      trello: this.$parent.trelloListID(),
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
    // Edit
    findMedia: function(media) {
      return media.title === this.favoriteMedia;
    },
    addFavorite() {
      axios.get("/api/media").then(response => {
        this.allMedia = response.data;
        console.log(response.data);
        this.showFavorite = true;
      });
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    updateUser: function() {
      var formData = new FormData();
      formData.append("email", this.user.email);
      formData.append("username", this.user.username);
      if (this.user.bio) {
        formData.append("bio", this.user.bio);
      } else {
        formData.append("bio", "");
      }
      if (this.image) {
        formData.append("profile_picture", this.image);
      }
      formData.append("profanity_filter", this.user.profanity_filter);
      if (this.showFavorite) {
        if (this.allMedia.find(this.findMedia)) {
          formData.append("favorite_media_id", this.allMedia.find(this.findMedia).id);
        } else if (!this.allMedia.find(this.findMedia)) {
          this.errors = [
            "Show not found. Please click the 'Add New Show' button to add it, or choose a different show.",
          ];
          return;
        }
      }
      axios
        .patch(`/api/users/me`, formData)
        .then(response => {
          console.log("yeehaw");
          console.log(response.data);
          this.showFavorite = false;
          $("#editModal").modal("hide");
          // this.$router.push(`/users/${this.user.id}`);
        })
        .catch(error => {
          console.log("It did a break");
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your account? This will also remove any comments you have made.")) {
        axios
          .delete(`/api/users/me`)
          .then(response => {
            console.log(response.data.message);
            alert(response.data.message);
            localStorage.removeItem("jwt");
            localStorage.removeItem("user_id");
            this.$router.push("/");
            if (this.$parent.trelloListID()) {
              var deleteSuccess = function(data) {
                localStorage.removeItem("trello_token");
                localStorage.removeItem("trelloListID");
                console.log(data);
              };
              var getIDSuccess = function(data) {
                console.log(data.idBoard);
                window.Trello.del(`/boards/${data.idBoard}`, deleteSuccess);
              };
              window.Trello.authorize({ interactive: false });
              window.Trello.lists.get(this.$parent.trelloListID(), getIDSuccess);
            }
          })
          .catch(error => {
            this.errors = error.response.data.errors;
            alert("Error! Couldn't delete user");
          });
      }
    },
    addTrello: function() {
      if (!this.$parent.trelloListID()) {
        var completeCreationSuccess = function(data) {
          console.log("List created successfully.");
          console.log(data.id);
          this.trelloListID = data.id;
          this.trello = true;
          localStorage.setItem("trelloListID", this.trelloListID);
          alert("Trello integration successfully added.");
          var params = {
            trello_list_id: this.trelloListID,
          };
          axios.patch("/api/users/me", params).then(response => {
            console.log(response.data);
          });
          axios.get(`/api/saved_shows/${this.user.id}`).then(response => {
            console.log(response.data);
            response.data.forEach(savedShow => {
              console.log(savedShow);
              var creationSuccess = function(data) {
                console.log(data.id);
                console.log("Card created successfully.");
                var params = {
                  trello_id: data.id,
                };
                axios.patch(`/api/saved_shows/${savedShow.info.id}`, params).then(response => {
                  console.log(response.data);
                });
              }.bind(this);
              var newCard = {
                name: savedShow.title,
                desc: `![](${savedShow.poster})\n${savedShow.plot}`,
                idList: this.$parent.trelloListID(),
                pos: "top",
              };
              window.Trello.post("/cards/", newCard, creationSuccess);
            });
          });
        }.bind(this);

        var boardCreationSuccess = function(data) {
          console.log("Board created successfully.");
          var boardID = data.id;
          console.log(boardID);
          var newList = {
            name: "Watchlist",
            idBoard: boardID,
          };
          window.Trello.post("/lists/", newList, completeCreationSuccess);
        };
        var authenticationSuccess = function() {
          console.log("Successful authentication");
          var newBoard = {
            name: "It's Over, Isn't It?",
            defaultLists: false,
            desc: "Pretty please don't delete this! Things will break!",
          };
          window.Trello.post("/boards/", newBoard, boardCreationSuccess);
        };

        var authenticationFailure = function() {
          console.log("Failed authentication");
        };
        window.Trello.authorize({
          type: "popup",
          name: "It's Over, Isn't It?",
          scope: {
            read: "true",
            write: "true",
          },
          expiration: "never",
          success: authenticationSuccess,
          error: authenticationFailure,
        });
      }
    },
    removeTrello: function() {
      var deleteSuccess = function(data) {
        console.log(data);
        axios.delete("/api/users/me/trello").then(response => {
          console.log(response.data);
          localStorage.removeItem("trelloListID");
          localStorage.removeItem("trello_token");
          this.trello = false;
          alert("Trello integration successfully removed.");
        });
      }.bind(this);
      var getIDSuccess = function(data) {
        console.log(data.idBoard);
        window.Trello.del(`/boards/${data.idBoard}`, deleteSuccess);
      };
      window.Trello.authorize({ interactive: false });
      window.Trello.lists.get(this.$parent.trelloListID(), getIDSuccess);
    },
  },
};
</script>
