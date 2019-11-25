<template>
  <v-container>
    <div class="top">
      <v-card class="mx-auto" color="#002b36" dark max-width="1000">
        <v-card-title>
          <v-icon x-large left>
            mdi-account-circle
          </v-icon>
          <span class="title font-weight-light">{{ lecturer_name }}</span>
          <v-spacer></v-spacer>
          <span class="overline font-weight-light">Lecturer ID: {{ lecturer_id }}</span>
        </v-card-title>

        <v-row style="margin-left: 50px">
          <v-dialog v-model="dialog1" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                style="float: right"
                outlined
                color="teal"
                dark
                v-on="on"
                >Add Course</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add a course</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Course Code*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Course Title*"
                        hint="(i.e. 'Software Engineering II')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Course Description*"
                        hint="This course teaches software engineering principles"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog1 = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="dialog1 = false"
                  >Add Course</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog2" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                style="float: right"
                outlined
                color="teal"
                dark
                v-on="on"
                >Add Lecturer</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Lecturer</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Full Name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Lecturer ID*"
                        hint="ID number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog2 = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="dialog2 = false"
                  >Add Lecturer</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog3" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                style="float: right"
                outlined
                color="teal"
                dark
                v-on="on"
                >Assign Lecturer</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Assign Lecturer to a course</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Lecturer ID*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Course Code*"
                        hint="(i.e. 'COMP3613')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog3 = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="dialog3 = false"
                  >Assign Lecturer</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

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
      lecturer_name: JSON.parse(localStorage.getItem("user")).name,
      lecturer_id: JSON.parse(localStorage.getItem("user")).id,
      courses: [],
      dialog1: false,
      dialog2: false,
      dialog3: false
    };
  },
  methods: {

    // getCourses: function() {
    //   this.$store
    //     .dispatch("login", { id, password })
    //     .then(() => this.$router.push("/"))
    //     .catch(err => console.log(err));
    // }
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
