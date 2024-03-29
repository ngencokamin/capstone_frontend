import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import MediaShow from "../views/MediaShow.vue";
import MediaNew from "../views/MediaNew.vue";
import UsersShow from "../views/UsersShow.vue";
import SavedShows from "../views/SavedShows.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/media/new", name: "media-new", component: MediaNew },
  { path: "/media/:id", name: "media-show", component: MediaShow },
  { path: "/users/:id", name: "users-show", component: UsersShow },
  { path: "/watchlist/:user_id", name: "saved-shows", component: SavedShows },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
