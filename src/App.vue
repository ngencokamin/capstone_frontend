<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <span v-if="!loggedIn()">
        <router-link to="/signup">Signup</router-link>
        |
        <router-link to="/login">Log In</router-link>
      </span>
      <span v-else>
        <a :href="`/users/${userID()}`">Profile</a>
        |
        <router-link to="/logout">Logout</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  methods: {
    loggedIn: function() {
      return localStorage.getItem("jwt");
    },
    userID: function() {
      return localStorage.getItem("user_id");
    },
    profilePhoto: function(user) {
      console.log(user);
      if (user.profile_picture) {
        return user.profile_picture;
      } else {
        return require("./assets/default.jpeg");
      }
    },
  },
};
</script>
