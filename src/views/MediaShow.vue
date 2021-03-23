<template>
  <div class="media-show" v-if="media">
    <!-- Information about selected  media -->
    <div class="material-background"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card animated materialUp animation-delay-5">
            <div class="card-body card-body-big text-center">
              <h1 class="no-mt">
                <strong>
                  {{ media.title }}
                </strong>
              </h1>

              <img :src="media.poster" alt="" class="img-fluid mb-4" />
              <div class="row">
                <div class="col-lg-6">
                  <div class="card-body">
                    <h3 class="color-primary">Info</h3>
                    <ul class="list-unstyled">
                      <li>
                        <strong>Rated:</strong>
                        {{ media.rated }}
                      </li>
                      <li>
                        <strong>IMDb Rating:</strong>
                        {{ media.imdb_rating }}
                      </li>
                      <li>
                        <strong>Released:</strong>
                        {{ media.released }}
                      </li>
                      <li>
                        <strong>Year:</strong>
                        2014
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="card-body">
                    <h3 class="color-primary">Plot Summary</h3>
                    <p>
                      {{ media.plot }}
                    </p>
                  </div>
                </div>
              </div>
              <button v-on:click="addSavedTrello(media)" class="btn btn-primary btn-raised">
                <i class="zmdi zmdi-favorite-outline"></i>
                Save to watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row wow materialUp animation-delay-8">
        <div class="col-md-12">
          <h2 class="color-primary right-line">Comments</h2>

          <div class="row">
            <button
              class="btn btn-primary btn-raised mx-auto"
              v-on:click="newComment()"
              v-if="!commentShow && $parent.loggedIn()"
            >
              Add Comment
            </button>
            <div class="col-md-12" v-if="commentShow">
              <div class="card card-primary animated fadeInUp">
                <div class="card-body">
                  <ul>
                    <li class="text-danger" v-for="error in errors" v-bind:key="error.id">
                      {{ error }}
                    </li>
                  </ul>
                  <h2 class="color-primary text-center">
                    Power!
                    <i>Unlimited</i>
                    power!
                  </h2>
                  <form class="form-horizontal" v-on:submit.prevent="addComment">
                    <fieldset class="container">
                      <div class="form-group row">
                        <label class="control-label col-lg-2" for="addon2">Find or add a show</label>
                        <div class="input-group col-lg-9">
                          <input
                            type="text"
                            id="addon2"
                            class="form-control"
                            list="titles"
                            v-model="suggestedMedia"
                            placeholder="Type to search..."
                          />
                          <span class="input-group-btn">
                            <router-link :to="{ path: '/media/new', query: { search: suggestedMedia } }">
                              <button type="button" class="btn btn-fab btn-fab-mini">
                                <i class="material-icons">add</i>
                              </button>
                            </router-link>
                          </span>
                        </div>
                      </div>
                      <datalist id="titles">
                        <option v-for="media in allMedia" :key="media.id">
                          {{ media.title }}
                        </option>
                      </datalist>
                      <div class="form-group row">
                        <label for="similarity" class="col-lg-2 control-label">Similarity</label>
                        <div class="col-lg-9">
                          <input
                            type="number"
                            class="form-control"
                            id="similarity"
                            placeholder="1"
                            min="1"
                            max="10"
                            v-model="similarity"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="enjoyability" class="col-lg-2 control-label">Enjoyability</label>
                        <div class="col-lg-9">
                          <input
                            type="number"
                            class="form-control"
                            id="enjoyability"
                            placeholder="1"
                            min="1"
                            max="10"
                            v-model="enjoyability"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="textArea" class="col-lg-2 control-label">Additional Thoughts</label>
                        <div class="col-lg-9">
                          <textarea
                            class="form-control"
                            rows="6"
                            id="textArea"
                            placeholder="Your comment..."
                            v-model="commentText"
                          ></textarea>
                        </div>
                      </div>
                      <div class="form-group row justify-content-end">
                        <div class="col-lg-10">
                          <button type="submit" class="btn btn-raised btn-primary">Post Comment</button>
                          <button type="button" v-on:click="commentShow = false" class="btn btn-danger">Cancel</button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ul class="ms-timeline" v-for="comment in orderBy(media.comments, 'vote_total', -1)" :key="comment.id">
            <li class="ms-timeline-item wow materialUp"></li>
            <li class="ms-timeline-item wow materialUp mb-0">
              <div class="ms-timeline-date">
                <time class="timeline-time" datetime="">
                  <span>{{ comment.user.username }}</span>
                </time>
                <i class="ms-timeline-point bg-primary"></i>
                <router-link :to="`/users/${comment.user.id}`">
                  <img
                    :src="
                      comment.user.profile_picture ? comment.user.profile_picture : require('../assets/default.jpeg')
                    "
                    class="ms-timeline-point-img"
                  />
                </router-link>
              </div>
              <div class="card card-primary">
                <div class="card-body text-center">
                  <h1 class="no-mt">
                    <strong>
                      Suggested Media
                    </strong>
                  </h1>
                  <h2>{{ comment.suggested_media.title }}</h2>
                  <img :src="comment.suggested_media.poster" alt="" class="img-fluid mb-4" />
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="card-body">
                        <h3 class="color-primary">Info</h3>
                        <ul class="list-unstyled">
                          <li>
                            <strong>Rated:</strong>
                            {{ comment.suggested_media.rated }}
                          </li>
                          <li>
                            <strong>IMDb Rating:</strong>
                            {{ comment.suggested_media.imdb_rating }}
                          </li>
                          <li>
                            <strong>Released:</strong>
                            {{ comment.suggested_media.released }}
                          </li>
                          <li>
                            <strong>Year:</strong>
                            2014
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="card-body">
                        <h3 class="color-primary">Plot Summary</h3>
                        <p>
                          {{ comment.suggested_media.plot }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button v-on:click="addSavedTrello(comment.suggested_media)" class="btn btn-primary btn-raised">
                    <i class="zmdi zmdi-favorite-outline"></i>
                    Save to watchlist
                  </button>
                </div>
              </div>
              <div class="row wow materialUp animation-delay-8">
                <div class="col-md-12">
                  <ul class="ms-timeline">
                    <li class="ms-timeline-item wow materialUp">
                      <div class="ms-timeline-date">
                        <time class="timeline-time" datetime="">
                          <h3><strong>Verdict</strong></h3>
                        </time>
                      </div>
                      <div class="card card-primary text-center">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="card-body">
                              <h3 class="color-primary">User Comment</h3>
                              <p>
                                {{ comment.text }}
                              </p>
                            </div>
                          </div>
                          <div class="card-body">
                            <div class="col-lg-6">
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

                              <button
                                v-on:click="addVote(comment, -1)"
                                :disabled="comment.voted == -1"
                                class="btn-circle"
                                :class="comment.voted == -1 ? 'btn-circle-default' : 'btn-circle-primary'"
                              >
                                <i class="zmdi zmdi-thumb-down"></i>
                              </button>
                              {{ comment.vote_total }}
                              <button
                                v-on:click="addVote(comment, 1)"
                                :disabled="comment.voted == 1"
                                class="btn-circle"
                                :class="comment.voted == 1 ? 'btn-circle-default' : 'btn-circle-primary'"
                              >
                                <i class="zmdi zmdi-thumb-up"></i>
                              </button>
                              <br />

                              <small>Created {{ formatDate(comment.created_at) }}&nbsp;</small>
                              <small v-if="comment.created_at != comment.updated_at">
                                (edited {{ formatDate(comment.updated_at) }})
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- My code -->

    <!-- Comments section -->
    <div v-for="comment in orderBy(media.comments, 'vote_total', -1)" :key="comment.id" align="center">
      <div class="boxxed" style="padding-bottom: 5px;">
        <img
          :src="comment.user.profile_picture ? comment.user.profile_picture : require('../assets/default.jpeg')"
          alt="User profile picture"
          style="width: 10%;"
        />
        <router-link :to="`/users/${comment.user.id}`">
          <b>{{ comment.user.username }}</b>
        </router-link>
        <hr />
        <h2>Suggested Media</h2>
        <h4>{{ comment.suggested_media.title }}</h4>
        <a :href="`/media/${comment.suggested_media.id}`">
          <img :src="comment.suggested_media.poster" alt="Poster for selected media" />
        </a>
        <p>
          <b>Released: {{ comment.suggested_media.released }}</b>
        </p>
        <p>
          {{ comment.suggested_media.plot }}
        </p>
        <small>
          Rated: {{ comment.suggested_media.rated }} | IMDb Rating: {{ comment.suggested_media.imdb_rating }}
        </small>
        <br />
        <button v-on:click="addSavedTrello(comment.suggested_media)">Add to watchlist</button>
        <hr />
        <!-- Information is shown unless edit button is clicked -->
        <span v-if="editCommentID != comment.id">
          <h2>User Comment</h2>
          <p>
            {{ comment.text }}
          </p>
          <hr />
          <h2>Verdict</h2>
          <p>
            <b>Similarity:</b>
            {{ comment.similarity }}
          </p>
          <p>
            <b>Enjoyability:</b>
            {{ comment.enjoyability }}
          </p>
          <button v-on:click="addVote(comment, -1)" :disabled="comment.voted == -1">
            👎
          </button>
          {{ comment.vote_total }}
          <button v-on:click="addVote(comment, 1)" :disabled="comment.voted == 1">
            👍
          </button>
          <br />
          <small>Created {{ formatDate(comment.created_at) }}&nbsp;</small>
          <small v-if="comment.created_at != comment.updated_at">(edited {{ formatDate(comment.updated_at) }})</small>
          <hr v-if="$parent.userID() == comment.user_id" />
          <button v-if="$parent.userID() == comment.user_id" v-on:click="editCommentID = comment.id">
            Edit Comment
          </button>
        </span>
        <!-- Shows input fields instead if edit button is clicked -->
        <form v-on:submit.prevent="updateComment(comment)" v-if="comment.id == editCommentID">
          <h2>Edit Comment</h2>

          <div class="form-group">
            <label>User comment:</label>
            <textarea name="comment" cols="30" rows="10" v-model="comment.text"></textarea>
          </div>
          <h2>Verdict</h2>
          <div class="form-group">
            <label>Similarity:</label>
            <input type="number" v-model="comment.similarity" min="1" max="10" />
          </div>
          <div class="form-group">
            <label>Enjoyability:</label>
            <input type="number" v-model="comment.enjoyability" min="1" max="10" />
          </div>
          <button v-on:click="editCommentID = 0" type="button">Cancel Changes</button>
          <input type="submit" class="btn btn-primary" value="Update" />
          <br />
          <button v-on:click="destroyComment(comment)" type="button">Delete Comment</button>
        </form>
      </div>

      <br />
    </div>
  </div>
</template>

<style>
/* temporary class pre-theme to improve visual clarity */
.boxxed {
  border: 1px solid black;
  width: 60%;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      media: "",
      comments: [],
      allMedia: [],
      commentShow: false,
      suggestedMedia: "",
      enjoyability: 1,
      similarity: 1,
      commentText: "",
      errors: [],
      editCommentID: 0,
    };
  },
  created: function() {
    axios.get(`/api/media/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.media = response.data;
      this.comments = response.data.comments;
      for (var i = 0; i < this.comments.length; i++) {
        if (this.comments[i].votes.some(vote => vote.user_id == this.$parent.userID())) {
          this.comments[i].voted = this.comments[i].votes.find(vote => vote["user_id"] == this.$parent.userID()).value;
        }
      }
    });
  },
  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },
    findMedia: function(media) {
      return media.title === this.suggestedMedia;
    },
    newComment: function() {
      axios.get("/api/media").then(response => {
        this.allMedia = response.data;
        console.log(response.data);
        this.commentShow = true;
      });
    },
    addComment: function() {
      if (this.allMedia.find(this.findMedia) && this.allMedia.find(this.findMedia).id != this.$route.params.id) {
        var params = {
          text: this.commentText,
          similarity: this.similarity,
          enjoyability: this.enjoyability,
          media_id: this.$route.params.id,
          suggested_media_id: this.allMedia.find(this.findMedia).id,
        };
        axios
          .post("/api/comments", params)
          .then(response => {
            console.log(response.data);
            this.comments.push(response.data);
            this.commentText = "";
            this.similarity = 1;
            this.enjoyability = 1;
            this.suggestedMedia = "";
            this.commentShow = false;
          })
          .catch(error => {
            this.errors = [error.response.statusText];
            console.log(this.errors);
          });
      } else if (!this.allMedia.find(this.findMedia)) {
        this.errors = [
          "ERROR! Show not found. Please click the 'Add New Show' button to add it, or choose a different show.",
        ];
      } else {
        this.errors = ["ERROR! Suggested show cannot be the same as the original show."];
      }
    },
    updateComment: function(comment) {
      var params = {
        text: comment.text,
        similarity: comment.similarity,
        enjoyability: comment.enjoyability,
      };
      axios.patch(`/api/comments/${comment.id}`, params).then(response => {
        console.log(response.data);
        this.editCommentID = 0;
      });
    },
    destroyComment: function(comment) {
      if (confirm("Are you sure you want to delete this comment?")) {
        axios
          .delete(`/api/comments/${comment.id}`)
          .then(response => {
            console.log(response.data.message);
            alert(response.data.message);
            this.comments.splice(this.comments.indexOf(comment), 1);
          })
          .catch(error => {
            this.errors = error.response.data.errors;
            alert("Error! Couldn't delete comment");
          });
      }
    },
    addVote: function(comment, value) {
      if (this.$parent.loggedIn()) {
        if (!comment.voted) {
          var params = {
            comment_id: comment.id,
            value: value,
          };
          axios
            .post("/api/votes", params)
            .then(response => {
              console.log(response.data);
              comment.vote_total += value;
              comment.voted = value;
              comment.votes.push(response.data);
              console.log(comment.votes);
            })
            .catch(error => {
              this.errors = [error.response];
              console.log(this.errors);
            });
        } else if (comment.voted != value) {
          params = {
            value: value,
          };
          axios
            .patch(`/api/votes/${comment.votes.find(vote => vote["user_id"] == this.$parent.userID()).id}`, params)
            .then(response => {
              console.log(response.data);
              comment.vote_total += value + value;
              comment.voted = value;
            });
        }
      } else {
        alert("Error: You must be logged in to vote on suggestions.");
        console.log("Error: You must be logged in to vote on suggestions.");
      }
    },
    addSavedTrello: function(media) {
      if (this.$parent.trelloListID()) {
        window.Trello.authorize({ interactive: false });

        var creationSuccess = function(data) {
          console.log("Card created successfully.");
          this.addSavedBackend(media, data.id);
        }.bind(this);

        var newCard = {
          name: media.title,
          desc: `![](${media.poster})\n${media.plot}`,
          // Place this card at the top of our list
          idList: this.$parent.trelloListID(),
          pos: "top",
        };

        window.Trello.post("/cards/", newCard, creationSuccess);
      } else {
        this.addSavedBackend(media);
      }
    },
    addSavedBackend: function(media, trello_id) {
      var params = {
        media_id: media.id,
      };
      if (trello_id) {
        params.trello_id = trello_id;
      }
      console.log(media.title);
      console.log(params);
      axios
        .post("/api/saved_shows", params)
        .then(response => {
          console.log(response.data);
          alert(`${media.title} has been added to your watchlist`);
        })
        .catch(error => {
          this.errors = [error.response.data.errors];
          if (error.response.data.errors == "Media has already been taken") {
            alert(`ERROR: ${media.title} is already on your watchlist`);
            window.Trello.del(`/cards/${trello_id}`, deletionSuccess);
          }
        });
      var deletionSuccess = function() {
        console.log("Card removed successfully.");
      };
    },
  },
};
</script>
