<template>
  <v-app>
    <AppBar v-if="isLoggedIn" />
    <v-content class="stallions-content">
      <Contents />
    </v-content>
    <AppFooter />
  </v-app>
</template>

<script>
import Contents from "./components/Contents";
import AppBar from "./components/AppBar";
import AppFooter from "./components/AppFooter";

export default {
  name: "App",
  // created: function () {
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //     return new Promise(function (resolve, reject) {
  //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //         this.$store.dispatch(logout)
  //       }
  //       throw err;
  //     });
  //   });
  // },
  components: { AppFooter, AppBar, Contents },
  data: () => ({
    //
  }),
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.stallions-content {
  background-color: white;
}
</style>
