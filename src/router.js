import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import Login from "./views/Login.vue";
import store from "./stores/store";

Vue.use(Router);

// Router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/account",
      name: "account",
      component: () => import("./views/Account.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/add",
      name: "AddStudent",
      component: () => import("./components/AddStudent.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/remove",
      name: "RemoveStudent",
      component: () => import("./components/RemoveStudent.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/viewlogs/:cid/:cname",
      name: "ViewLogs",
      component: () => import("./components/ViewLogs.vue"),
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/viewLecture/:clid/:cid/:ts",
      name: "ViewLecture",
      component: () => import("./components/ViewLecture.vue"),
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/404",
      component: () => import("./views/404.vue")
    },
    { path: "*", redirect: "/404" }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
