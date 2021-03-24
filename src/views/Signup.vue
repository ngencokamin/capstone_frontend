<template>
  <div class="signup">
    <div class="bg-full-page bg-primary back-fixed">
      <div class="mw-500 absolute-center">
        <div class="card color-dark animated zoomInDown animation-delay-5">
          <div class="card-body">
            <h2 class="color-primary text-center">We would be honored if you would join us</h2>
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
                    <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
                    <label class="control-label" for="ms-form-user">Username</label>
                    <input type="text" id="ms-form-user" class="form-control" v-model="username" />
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="zmdi zmdi-lock"></i></span>
                    <label class="control-label" for="ms-form-pass">Password</label>
                    <input type="password" id="ms-form-pass" class="form-control" v-model="password" />
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="zmdi zmdi-lock"></i></span>
                    <label class="control-label" for="ms-form-pass-conf">Password Confirmation</label>
                    <input type="password" id="ms-form-pass-conf" class="form-control" v-model="passwordConfirmation" />
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group">
                    <div class="checkbox ">
                      <label>
                        <input type="checkbox" v-model="profanityFilter" />
                        Enable profanity filter?
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group label-floating">
                  <div class="input-group text-center">
                    <button
                      class="btn btn-raised btn-linkedin"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Enabling Trello integration allows automatic syncing of watchlist data to a Trello board for added convenience"
                      type="button"
                      v-on:click="addTrello()"
                      :disabled="trello"
                    >
                      <i class="fa fa-trello"></i>
                      Trello (Optional)
                    </button>
                  </div>
                </div>

                <div class="row ">
                  <div class="col-md-6">
                    <button class="btn btn-raised btn-primary btn-block" type="submit">
                      Sign Up
                      <i class="zmdi zmdi-long-arrow-right no-mr ml-1"></i>
                    </button>
                  </div>
                  <div class="col-md-6">
                    <router-link role="button" to="/login">
                      <button class="btn btn-primary btn-block">
                        <i class="zmdi zmdi-account mr-1"></i>
                        Log In
                      </button>
                    </router-link>
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
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      trelloListID: "",
      profanityFilter: false,
      errors: [],
      trello: false,
    };
  },
  methods: {
    addTrello: function() {
      if (!localStorage.getItem("trello_token")) {
        var completeCreationSuccess = function(data) {
          console.log("List created successfully.");
          console.log(data.id);
          this.trelloListID = data.id;
          alert("Trello integration successfully added!");
          this.trello = true;
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
          this.errors.push("Failed Trello authentication");
        }.bind(this);
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
    login: function() {
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
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        profanity_filter: this.profanityFilter,
      };
      if (this.trelloListID) {
        params.trello_list_id = this.trelloListID;
        localStorage.setItem("trelloListID", this.trelloListID);
      }
      axios
        .post("/api/users", params)
        .then(response => {
          console.log(response.data);
          this.login();
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
  },
};
</script>
