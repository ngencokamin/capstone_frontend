<template>
  <div class="login">
    <div class="bg-full-page bg-primary back-fixed">
      <div class="mw-500 absolute-center">
        <div class="card color-dark animated zoomInDown animation-delay-5">
          <div class="card-body">
            <h2 class="color-primary text-center">Welcome (back) to the world of tomorrow!</h2>
            <form v-on:submit.prevent="submit()">
              <fieldset>
                <ul>
                  <li class="text-danger" v-for="error in errors" v-bind:key="error">
                    {{ error }}
                  </li>
                </ul>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="zmdi zmdi-email"></i></span>
                    <label class="control-label" for="ms-form-email">Email</label>
                    <input type="text" id="ms-form-email" class="form-control" v-model="email" />
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="zmdi zmdi-lock"></i></span>
                    <label class="control-label" for="ms-form-pass">Password</label>
                    <input type="password" id="ms-form-pass" class="form-control" v-model="password" />
                  </div>
                </div>
                <div class="row ">
                  <div class="col-md-6">
                    <button class="btn btn-raised btn-primary btn-block">
                      Login
                      <i class="zmdi zmdi-long-arrow-right no-mr ml-1"></i>
                    </button>
                  </div>
                  <div class="col-md-6">
                    <a href="/signup">
                      <button class="btn btn-primary btn-block" type="button">
                        <i class="zmdi zmdi-account-add mr-1"></i>
                        Sign Up
                      </button>
                    </a>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div class="text-center animated fadeInUp animation-delay-7">
          <router-link class="btn btn-white" role="button" to="/">
            <i class="zmdi zmdi-home"></i>
            Go Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
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
          this.$router.push("/");
        })
        .catch(error => {
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
