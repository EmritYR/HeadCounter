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
    <v-btn icon>
      <router-link to="/add"><v-icon>mdi-plus-circle</v-icon></router-link>
    </v-btn>
    <v-btn icon>
      <router-link to="/remove"><v-icon>mdi-delete-circle</v-icon></router-link>
    </v-btn>
    <v-btn icon>
      <router-link to="/viewlogs"><v-icon>mdi-book-open</v-icon></router-link>
    </v-btn>
    <v-btn class="logout" icon>
      <router-link to="/account"><v-icon>mdi-window-close</v-icon></router-link>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar"
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
