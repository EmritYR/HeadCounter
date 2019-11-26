<template>
  <v-container>
    <div class="top">
      <v-card class="mx-auto" color="#002b36" dark max-width="1000">
        <v-card-title>
          <v-icon x-large left>
            mdi-book-open
          </v-icon>
          <span class="title font-weight-light"
            >Classes for {{ this.$route.params.course_id }} -
            {{ this.$route.params.course_name }}</span
          >
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text
          style="margin-left: 40px"
          class="headline font-weight-bold"
        >
          Here's a list of the courses that you currently lecture.
        </v-card-text>
      </v-card>
    </div>
    <div class="bottom">
      <div class="course_cards" v-for="(classSession, i) in classes" :key="i">
        <v-card class="mx-auto" color="#001D27" dark max-width="950">
          <v-card-title>
            <v-icon large left>
              mdi-presentation
            </v-icon>
            <span class="title font-weight-light"
              >{{ classSession.type }} - {{ classSession.location }}</span
            >
          </v-card-title>

          <v-card-actions>
            <v-list-item class="grow">
              <v-btn class="ma-2" outlined color="teal">View {{classSession.type}} Logs</v-btn>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import axios from "axios";

export default {
  name: "ViewLogs",
  data() {
    return {
      classes: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/courses/" + this.$route.params.course_id)
      .then(response => (this.classes = response.data));
  }
};
</script>

<style scoped>
.course_cards {
  padding: 10px;
}

a {
  text-decoration: none;
}
</style>
