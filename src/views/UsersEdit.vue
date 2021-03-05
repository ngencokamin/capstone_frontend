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
        <input type="text" class="form-control" v-model="user.profile_picture" />
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
    updateUser: function() {
      var params = {
        email: this.user.email,
        profile_picture: this.user.profile_picture,
        username: this.user.username,
        bio: this.user.bio,
      };
      axios
        .patch(`/api/users/me`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your account?")) {
        axios
          .delete(`/api/users/me`)
          .then(response => {
            console.log(response.data.message);
            alert(response.data.message);
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
