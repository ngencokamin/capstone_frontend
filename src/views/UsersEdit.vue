<template>
  <div class="users-edit">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent="updateUser()">
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
      user: {},
      errors: [],
      showFavorite: false,
      allMedia: [],
      favoriteMedia: "",
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
          })
          .catch(error => {
            this.errors = error.response.data.errors;
            alert("Error! Couldn't delete user");
          });
      }
    },
  },
};
</script>
