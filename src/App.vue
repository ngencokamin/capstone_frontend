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
            <!-- <li class="nav-item" v-on:click="testUser()" v-if="!loggedIn()">
              <a
                class="nav-link animated fadeIn animation-delay-7"
                role="button"
                href="#"
              >
                Test User
              </a>
            </li> -->
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
    <div class="btn-back-top">
      <a
        href="#"
        data-scroll
        id="back-top"
        class="btn-circle btn-circle-primary btn-circle-sm btn-circle-raised "
      >
        <i class="zmdi zmdi-long-arrow-up"></i>
      </a>
    </div>
    <div
      class="fixed-bottom position-sticky px-4 py-3 animated fadeInUp animation-delay-7"
    >
      <button
        data-scroll
        v-on:click="welcomeModal()"
        id="back-top"
        class="btn-circle btn-circle-primary btn-circle-md btn-circle-raised "
      >
        <i class="fa fa-question fa-lg"></i>
      </button>
    </div>
    <div
      class="modal"
      id="welcome"
      tabindex="-1"
      role="dialog"
      aria-labelledby="welcomeLabel"
      ref="welcome"
    >
      <div
        class="modal-dialog animated zoomIn animated-3x modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title color-primary" id="welcomeLabel">
              Welcome!
            </h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"><i class="zmdi zmdi-close"></i></span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              This video offers a brief walkthrough of the functionality and
              features of the site.
            </p>

            <div class="modal-content">
              <video
                v-if="modalVideo"
                poster="./assets/itsoverthumbnail.png"
                controls
              >
                <source src="./assets/itsover.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="text-center">
              <br />
              <small>
                <strong
                  >Please note that some updates have taken place since the
                  video was recorded, so there may be some slight variations.
                  This message will only show once, but can be summoned again at
                  anytime by clicking the "?" icon in the bottom left of the
                  site.</strong
                >
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
// import axios from "axios"
import $ from "jquery";
export default {
  data: function() {
    return {
      modalVideo: false,
    };
  },
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
    welcomeModal: function() {
      $("#welcome").modal("show");
    },
    modalOpen: function() {
      // return $("#myModal").hasClass("in");
      console.log($("#myModal").hasClass("in"));
      // return $("element").data("bs.modal")?._isShown;
    },
  },
};
</script>
