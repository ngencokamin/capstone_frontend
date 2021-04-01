<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-md navbar-static ms-navbar ms-navbar-primary navbar-mode navbar-right"
    >
      <div class="container container-full">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">
            <!-- <img src="assets/img/demo/logo-navbar.png" alt=""> -->
            <span class="ms-logo ms-logo-sm"
              ><i class="material-icons">tv_off</i></span
            >
            <span class="ms-title">
              <strong>It's Over,</strong>
              Isn't It?
            </span>
          </router-link>
        </div>
        <div class="collapse navbar-collapse" id="ms-navbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                to="/"
                >Home</router-link
              >
            </li>

            <li class="nav-item" v-if="!loggedIn()">
              <router-link
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                to="/signup"
              >
                Signup
              </router-link>
            </li>
            <li class="nav-item" v-if="!loggedIn()">
              <router-link
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                to="/login"
              >
                Log In
              </router-link>
            </li>
            <li class="nav-item" v-on:click="testUser()" v-if="!loggedIn()">
              <a
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                href="#"
              >
                Test User
              </a>
            </li>
            <li class="nav-item" v-if="loggedIn()">
              <router-link
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                :to="`/users/${userID()}`"
              >
                Profile
              </router-link>
            </li>
            <li class="nav-item" v-if="loggedIn()">
              <router-link
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                :to="`/watchlist/${userID()}`"
              >
                My Watchlist
              </router-link>
            </li>
            <li class="nav-item" v-if="loggedIn()">
              <router-link
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                to="/logout"
              >
                Logout
              </router-link>
            </li>
          </ul>
        </div>
        <!-- <a href="javascript:void(0)" class="ms-toggle-left btn-navbar-menu"><i class="zmdi zmdi-menu"></i></a> -->
      </div>
      <!-- container -->
    </nav>

    <router-view :key="$route.fullPath" />
    <!-- <footer class="ms-footer ">
      <div class="container">
        <p>Copyright &copy; Material Style 2017</p>
      </div>
    </footer> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios"
export default {
  mounted() {
    if (document.getElementById("trello")) return;
    var scriptTag = document.createElement("script");
    scriptTag.src = `https://trello.com/1/client.js?key=${process.env.VUE_APP_TRELLO_KEY}`;
    scriptTag.id = "trello";
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
  },
  methods: {
    loggedIn: function() {
      return localStorage.getItem("jwt");
    },
    userID: function() {
      return localStorage.getItem("user_id");
    },
    trelloListID: function() {
      return localStorage.getItem("trelloListID");
    },
    testUser: function() {
      var params = {
        email: "test@email.com",
        password: "password",
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          if (response.data.trello) {
            localStorage.setItem("trelloListID", response.data.trello);
            window.Trello.authorize({
              type: "popup",
              name: "Getting Started Application",
              scope: {
                read: "true",
                write: "true",
              },
              expiration: "never",
              success: authenticationSuccess,
              error: authenticationFailure,
            });
          }
          this.$router.push("/users/5");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
      var authenticationSuccess = function() {
        console.log("Successful authentication");
      };

      var authenticationFailure = function() {
        console.log("Failed authentication");
      };
    },
  },
};
</script>
