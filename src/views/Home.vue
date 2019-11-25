<template>
  <v-container>
    <div class="top">
      <v-card class="mx-auto" color="#002b36" dark max-width="1000">
        <v-card-title>
          <v-icon x-large left>
            mdi-account-circle
          </v-icon>
          <span class="title font-weight-light">{{ lecturer_name }}</span>
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
      <div class="course_cards" v-for="(course, i) in courses" :key="i">
        <v-card class="mx-auto" color="#001D27" dark max-width="800">
          <v-card-title>
            <v-icon large left>
              mdi-library-books
            </v-icon>
            <span class="title font-weight-light">{{
              course.course_name
            }}</span>
          </v-card-title>

          <!--        <v-card-actions>-->
          <!--          <v-list-item class="grow">-->
          <!--            <v-btn icon>-->
          <!--              <router-link to="/add"-->
          <!--                ><v-icon>mdi-plus-circle</v-icon></router-link-->
          <!--              >-->
          <!--            </v-btn>-->
          <!--            Add Student-->
          <!--          </v-list-item>-->
          <!--        </v-card-actions>-->

          <!--        <v-card-actions>-->
          <!--          <v-list-item class="grow">-->
          <!--            <v-btn icon>-->
          <!--              <router-link to="/"-->
          <!--                ><v-icon>mdi-delete-circle</v-icon></router-link-->
          <!--              >-->
          <!--            </v-btn>-->
          <!--            Remove Student-->
          <!--          </v-list-item>-->
          <!--        </v-card-actions>-->

          <v-card-actions>
            <v-list-item class="grow">
              <v-btn icon>
                <router-link to="/"><v-icon>mdi-book-open</v-icon></router-link>
              </v-btn>
              View Logs
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

// import Introduction from "../components/Introduction";
// import Feed from "../components/Feed";

export default {
  // components: { Feed, Introduction },
  data() {
    return {
      lecturer_name: "Inzamam Rahaman",
      courses: []
    };
  },
  methods: {
    getCourses: function() {
      this.$store
        .dispatch("login", { id, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
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
