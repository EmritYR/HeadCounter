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
          <span id="info_text2" class="overline font-weight-light"
            >Lecturer ID: {{ lecturer_id }}</span
          >
        </v-card-title>

        <v-row id="admin_panel" style="margin-left: 50px; visibility: hidden">
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
                        v-model="newCourseID"
                        label="Course Code*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newCourseName"
                        label="Course Title*"
                        hint="(i.e. 'Software Engineering II')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newCourseDescription"
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
                <v-btn color="blue darken-1" text @click="addCourse"
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
                      <v-text-field
                        v-model="newLecturerName"
                        label="Full Name*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newLecturerID"
                        label="Lecturer ID*"
                        hint="ID number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newLecturerPassword"
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
                <v-btn color="blue darken-1" text @click="addLecturer"
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
                <span class="headline">Assign a Lecturer to a course</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="assignLecturerID"
                        label="Lecturer ID*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="assignCourseID"
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
                <v-btn color="blue darken-1" text @click="assignLecturer"
                  >Assign Lecturer</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog4" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                style="float: right"
                outlined
                color="teal"
                dark
                v-on="on"
                >Create Student</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Create a Student</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newStudentID"
                        label="Student ID*"
                        required
                        hint="(i.e. 'REBELBB9')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newStudentName"
                        label="Student's Full Name*"
                        hint="(i.e. 'Luke Skywalker')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog4 = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="createStudent"
                  >Create Student</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-card-text
          id="info_text1"
          style="margin-left: 40px"
          class="headline font-weight-bold"
        >
          Here's a list of the courses that you currently lecture.
        </v-card-text>
      </v-card>
    </div>
    <div class="bottom">
      <div class="course_cards" v-for="(course, i) in courses" :key="i">
        <v-card class="mx-auto" color="#001D27" dark max-width="950">
          <v-card-title>
            <v-icon large left>
              mdi-library-books
            </v-icon>
            <span class="title font-weight-thin"
              >{{ course.course_id }} - {{ course.name }}</span
            >
          </v-card-title>

          <v-card-actions>
            <v-list-item class="grow" color="teal">
              <v-btn class="ma-2" outlined color="teal">
                <router-link
                  v-bind:to="
                    '/viewlogs/' + course.course_id + '/' + course.name
                  "
                >
                  <span style="color: teal">View Session Logs</span>
                </router-link>
              </v-btn>
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
  data() {
    return {
      lecturer_name: JSON.parse(localStorage.getItem("user")).name,
      lecturer_id: JSON.parse(localStorage.getItem("user")).id,
      token: localStorage.getItem("token"),
      courses: [],
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      newCourseName: "",
      newCourseDescription: "",
      newStudentID: "",
      newStudentName: "",
      newCourseID: "",
      newLecturerID: "",
      newLecturerName: "",
      newLecturerPassword: "",
      assignLecturerID: "",
      assignCourseID: ""
    };
  },
  methods: {
    addCourse: function() {
      this.dialog1 = false;
      axios.post(
        "http://localhost:3000/add-course",
        {
          name: this.newCourseName,
          url: "",
          description: this.newCourseDescription,
          id: this.newCourseID
        },
        {
          headers: { Authorization: `${this.token}` }
        }
      );

      this.newCourseID = "";
      this.newCourseName = "";
      this.newCourseDescription = "";
    },
    createStudent: function() {
      this.dialog4 = false;
      axios.post(
        "http://localhost:3000/create-student",
        {
          name: this.newStudentName,
          student_id: this.newStudentID
        },
        {
          headers: { Authorization: `${this.token}` }
        }
      );

      this.newStudentID = "";
      this.newStudentName = "";
    },
    addLecturer: function() {
      this.dialog2 = false;

      axios.post(
        "http://localhost:3000/register",
        {
          id: this.newLecturerID,
          name: this.newLecturerName,
          password: this.newLecturerPassword
        },
        {
          headers: { Authorization: `${this.token}` }
        }
      );

      this.newLecturerID = "";
      this.newLecturerName = "";
      this.newLecturerPassword = "";
    },
    assignLecturer: function() {
      this.dialog3 = false;

      axios.post(
        "http://localhost:3000/assign-lecturer",
        {
          lecturer_id: this.assignLecturerID,
          course_id: this.assignCourseID
        },
        {
          headers: { Authorization: `${this.token}` }
        }
      );

      this.assignLecturerID = "";
      this.assignCourseID = "";
    }
  },
  created() {},
  mounted() {
    if (this.lecturer_name === "admin") {
      document.getElementById("admin_panel").style.visibility = "visible";
      document.getElementById("info_text1").style.visibility = "hidden";
      document.getElementById("info_text2").style.visibility = "hidden";
    }

    axios
      .get("http://localhost:3000/courses/all/" + this.lecturer_id, {
        headers: { Authorization: `${this.token}` }
      })
      .then(response => (this.courses = response.data));
  }
};
</script>

<style scoped>
.course_cards {
  padding: 10px;
}

a {
  text-decoration: none;
  color: teal;
}
</style>
