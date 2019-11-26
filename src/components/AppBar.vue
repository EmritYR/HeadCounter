<template v-if="$vuetify.breakpoint.smAndUp">
  <v-app-bar app class="stallions-appbar">
    <v-toolbar-title class="overline">
      <span style="font-size: x-large" class="headline">Headcounter |</span>
      <span class="font-weight-light"> by Stallions. </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <router-link to="/"><v-icon>mdi-home-circle</v-icon></router-link>
    </v-btn>
    <v-btn @click="logout" class="logout" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
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
.stallions-appbar {
  background-color: white !important;
}

.logout {
  margin-left: 3%;
  color: red;
}
a {
  text-decoration: none;
}
#stallions_logo {
  width: 3%;
  height: 3%;
  margin-bottom: 3px;
  padding-right: 5px;
}
</style>
