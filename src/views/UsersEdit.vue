<template>
  <div class="users-edit" v-if="user">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <!-- <form v-on:submit.prevent="updateUser()"> -->
    <form>
      <h1>Edit Profile</h1>

      <div class="form-group">
        <label>Profile picture:</label>
        <input type="file" v-on:change="setFile($event)" ref="fileInput" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="user.username" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="user.bio" />
      </div>
      <div class="form-group" v-if="showFavorite">
        <label>Favorite Show:</label>
        <input type="text" v-model="favoriteMedia" placeholder="Type to search for shows" list="titles" />

        <router-link :to="{ path: '/media/new', query: { search: favoriteMedia } }">
          <button>Add new show</button>
        </router-link>
        <br />
        <button v-on:click="showFavorite = false">Cancel</button>

        <datalist id="titles">
          <option v-for="media in allMedia" :key="media.id">
            {{ media.title }}
          </option>
        </datalist>
      </div>
      <div class="form-group">
        <label>Profanity filter:</label>
        <input type="checkbox" name="Profanity filter" v-model="user.profanity_filter" />
        <label v-if="!user.profanity_filter">Off</label>
        <label v-if="user.profanity_filter">On</label>
      </div>
      <div class="form-group" v-if="!$parent.trelloListID()">
        <button v-on:click="addTrello()" type="button" :disabled="trello">
          Add optional Trello integration to watchlist
        </button>
      </div>
      <div class="form-group" v-else>
        <button v-on:click="removeTrello()" type="button" :disabled="!trello">
          Remove Trello integration
        </button>
      </div>
      <button v-on:click="addFavorite()" v-if="!showFavorite" type="button">Add/Update Favorite Show</button>

      <input type="submit" class="btn btn-primary" value="Update" />
    </form>

    <button v-on:click="destroyUser()">
      Delete Account
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
    axios
      .get(`/api/users/${this.$parent.userID()}`)
      .then(response => {
        this.user = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
  },
  methods: {
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
            "ERROR! Show not found. Please click the 'Add New Show' button to add it, or choose a different show.",
          ];
          return;
        }
      }
      axios
        .patch(`/api/users/me`, formData)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch(error => {
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
