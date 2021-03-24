<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-static ms-navbar ms-navbar-primary navbar-mode navbar-right">
      <div class="container container-full">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">
            <!-- <img src="assets/img/demo/logo-navbar.png" alt=""> -->
            <span class="ms-logo ms-logo-sm"><i class="material-icons">tv_off</i></span>
            <span class="ms-title">
              <strong>It's Over,</strong>
              Isn't It?
            </span>
          </router-link>
        </div>
        <div class="collapse navbar-collapse" id="ms-navbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link animated fadeIn animation-delay-7" role="button" to="/">Home</router-link>
            </li>

            <li class="nav-item" v-if="!loggedIn()">
              <router-link class="nav-link animated fadeIn animation-delay-7" role="button" to="/signup">
                Signup
              </router-link>
            </li>
            <li class="nav-item" v-if="!loggedIn()">
              <router-link class="nav-link animated fadeIn animation-delay-7" role="button" to="/login">
                Log In
              </router-link>
            </li>
            <li class="nav-item" v-if="loggedIn()">
              <router-link class="nav-link animated fadeIn animation-delay-7" role="button" :to="`/users/${userID()}`">
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
              <router-link class="nav-link animated fadeIn animation-delay-7" role="button" to="/logout">
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
  },
};
</script>
