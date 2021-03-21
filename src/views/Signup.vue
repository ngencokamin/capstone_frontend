<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h2>
        We would be honored if you would join us
      </h2>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="username" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="passwordConfirmation" />
      </div>
      <div class="form-group">
        <label>Would you like to enable profanity filter?</label>
        <input type="checkbox" name="Profanity filter" v-model="profanityFilter" />
        <label v-if="!profanityFilter">Off</label>
        <label v-if="profanityFilter">On</label>
      </div>
      <div class="form-group">
        <button v-on:click="addTrello()" type="button">
          Add optional trello integration to watchlist
        </button>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
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
    };
  },
  methods: {
    addTrello: function() {
      if (!localStorage.getItem("trello_token")) {
        var completeCreationSuccess = function(data) {
          console.log("List created successfully.");
          console.log(data.id);
          this.trelloListID = data.id;
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
