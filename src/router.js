import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/team",
      name: "team",
      component: () => import("./views/Team.vue")
    },
    {
      path: "/services",
      name: "services",
      component: () => import("./views/Services.vue")
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("./views/Blog.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("./views/Contact.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () => import("./views/Account.vue")
    },
    {
      path: "/COMP3603",
      name: "COMP3603",
      component: () => import("./views/COMP3603.vue")
    },
    {
      path: "/add",
      name: "AddStudent",
      component: () => import("./components/AddStudent.vue")
    },
    {
      path: "/remove",
      name: "RemoveStudent",
      component: () => import("./components/RemoveStudent.vue")
    },
    {
      path: "/viewlogs",
      name: "RemoveStudent",
      component: () => import("./components/ViewLogs.vue")
    },
    {
      path: "/viewLecture",
      name: "ViewLecture",
      component: () => import("./components/ViewLecture.vue")
    },
    {
      path: "/404",
      component: () => import("./views/404.vue")
    },
    { path: "*", redirect: "/404" }
  ]
});
