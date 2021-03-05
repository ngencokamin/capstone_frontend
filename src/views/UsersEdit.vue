<template>
  <div class="users-edit">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent="confirm = true" v-if="!confirm">
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
    <div v-else>
      <h1>Please enter your password to confirm changes</h1>
      <input type="text" v-model="oldEmail" placeholder="Original email" />
      <br />
      <input type="password" v-model="password" placeholder="Password" />
      <button v-on:click="userAuth()">
        Update
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      oldEmail: "",
      confirm: false,
      password: "",
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
    userAuth: function() {
      var params = {
        email: this.oldEmail,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          if (response.data.user_id == this.$parent.userID()) {
            localStorage.setItem("jwt", response.data.jwt);
            this.updateUser();
          }
        })
        .catch(error => {
          console.log(error.response);
          this.errors = ["Invalid password, please try again"];
          this.password = "";
        });
    },
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
  },
};
</script>
