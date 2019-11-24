<template>
  <v-container>
    <div class="course_cards" v-for="(course, i) in courses" :key="i">
      <v-card class="mx-auto" color="#2F3038FF" dark max-width="800">
        <v-card-title>
          <v-icon large left>
            mdi-library-books
          </v-icon>
          <span class="title font-weight-light">{{ course.course_name }}</span>
        </v-card-title>

        <v-card-actions>
          <v-list-item class="grow">
            <v-btn icon>
              <router-link to="/account"
                ><v-icon>mdi-plus-circle</v-icon></router-link
              >
            </v-btn>
            Add Student
          </v-list-item>
        </v-card-actions>

        <v-card-actions>
          <v-list-item class="grow">
            <v-btn icon>
              <router-link to="/"
                ><v-icon>mdi-delete-circle</v-icon></router-link
              >
            </v-btn>
            Remove Student
          </v-list-item>
        </v-card-actions>

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
  </v-container>
</template>

<script>
// import Introduction from "../components/Introduction";
// import Feed from "../components/Feed";

export default {
  // components: { Feed, Introduction },
  data() {
    return {
      lecturer_name: "Inzamam Rahaman",
      courses: [
        {
          course_name: "COMP1",
          href: "https://gentle-peak-15231.herokuapp.com/"
        },
        {
          course_name: "COMP2",
          href: "https://gentle-peak-15231.herokuapp.com/"
        },
        {
          course_name: "COMP3",
          href: "https://gentle-peak-15231.herokuapp.com/"
        }
      ]
    };
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
