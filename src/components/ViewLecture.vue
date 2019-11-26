<template>
  <v-container>
    <div class="top">
      <v-card class="mx-auto" color="#002b36" dark max-width="1000">
        <v-card-title>
          <v-icon x-large left>
            mdi-book-open
          </v-icon>
          <span class="title font-weight-light"
            >Class Session for {{ this.$route.params.course_id }}</span
          >
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text style="margin-left: 60px">
          <v-icon style="margin-top: 0" left>
            mdi-calendar
          </v-icon>
          <span style="margin-top: 0" class="font-weight-light">{{
            this.$route.params.timestamp
          }}</span>
        </v-card-text>

        <v-card-text
          style="margin-left: 40px"
          class="headline font-weight-bold"
        >
          Here's a list of students that attended this class.
        </v-card-text>
      </v-card>
    </div>
    <div class="bottom">
      <div class="course_cards" v-for="(student, i) in students" :key="i">
        <v-card class="mx-auto" color="#001D27" dark max-width="950">
          <v-card-title>
            <v-icon large left>
              mdi-presentation
            </v-icon>
            <span class="title font-weight-thin"
              >{{ student.type }} - {{ student.location }}</span
            >
          </v-card-title>

          <v-card-actions>
            <v-list-item style="margin-left: 35px" class="grow">
              ><v-btn class="ma-2" outlined color="teal">View Logs</v-btn>
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
  name: "ViewLecture",
  data() {
    return {
      students: ""
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/courses/class/" + this.$route.params.class_id)
      .then(response => {
        this.classes = response.data;
        console.log(response.data);
      });
  }
};
</script>

<style scoped></style>
