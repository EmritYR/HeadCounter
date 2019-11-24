import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./stores/store";
// import axios from "axios";

Vue.config.productionTip = false;

// axios.defaults.baseURL("/")

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
