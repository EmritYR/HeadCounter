<template>
  <v-container>
    <div class="top">
      <v-card class="mx-auto" color="#002b36" dark max-width="1000">
        <v-card-title>
          <v-icon x-large left>
            mdi-book-open
          </v-icon>
          <span class="title font-weight-light"
            >Class Session for {{ this.course_id }}</span
          >
          <v-spacer></v-spacer>
        </v-card-title>

        <v-row style="margin-left: 40px">
          <v-dialog v-model="dialog2" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                style="float: right"
                outlined
                color="red"
                dark
                v-on="on"
                >Remove a Student</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Remove a student from this list</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newStudentID"
                        label="Enter Student's ID Number to Remove*"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog2 = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="removeStudent"
                  >Remove</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog1" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                style="float: right"
                outlined
                color="blue"
                dark
                v-on="on"
                >Add a Student</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add a student to this list</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newAddStudentID"
                        label="Enter Student's ID Number to Add*"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog1 = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="addStudent"
                  >Add</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-card-text style="margin-left: 60px">
          <v-icon style="margin-top: 0" left>
            mdi-calendar
          </v-icon>
          <span style="margin-top: 0" class="font-weight-light">{{
            this.newts
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
        <v-card class="mx-auto" color="#001D27" dark max-width="900">
          <v-card-title>
            <v-icon left>
              mdi-school
            </v-icon>
            <span class="title font-weight-thin"
              >{{ student.name }} - {{ student.student_id }}</span
            >
          </v-card-title>
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
      students: [],
      dialog1: false,
      dialog2: false,
      newStudentID: "",
      newAddStudentID: "",
      token: localStorage.getItem("token"),
      course_id: this.$route.params.cid,
      class_id: this.$route.params.clid,
      timestamp: this.$route.params.ts,
      newts: ""
    };
  },
  methods: {
    removeStudent: function() {
      this.dialog2 = false;
      axios
        .delete(
          "http://localhost:3000/delete-student",
          {
            data: {
              class_id: this.class_id,
              student_id: this.newStudentID
            }
          },
          {
            headers: { Authorization: `${this.token}` }
          }
        )
        .then(() => this.$router.go());
      this.newStudentID = "";
    },
    addStudent: function() {
      this.dialog1 = false;
      console.log(this.newAddStudentID, this.class_id);
      axios
        .post(
          "http://localhost:3000/add-student",
          {
            class_id: this.class_id,
            student_id: this.newAddStudentID
          },
          {
            headers: { Authorization: `${this.token}` }
          }
        )
        .then(() => this.$router.go());
      this.newAddStudentID = "";
    }
  },
  created() {
    let url = "http://localhost:3000/courses/class/" + this.class_id;
    axios.get(url).then(response => {
      this.students = response.data;
      console.log(this.students);
    });

    this.newts = this.timestamp.slice(0, 19).replace("T", " | ");
    // console.log(this.newts);
  }
};
</script>

<style scoped>
.course_cards {
  padding: 5px;
}

a {
  text-decoration: none;
}
</style>
