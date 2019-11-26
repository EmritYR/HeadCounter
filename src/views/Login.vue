<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!--<v-form v-model="valid">-->
            <!--<v-text-field-->
            <!--v-model="id"-->
            <!--prepend-icon="mdi-account"-->
            <!--label="ID"-->
            <!--name="id"-->
            <!--:rules="idRules"-->
            <!--required-->
            <!--&gt;</v-text-field>-->
            <!--<v-text-field-->
            <!--id="password"-->
            <!--label="Password"-->
            <!--name="password"-->
            <!--prepend-icon="mdi-lock"-->
            <!--type="password"-->
            <!--:rules="passwordRules"-->
            <!--v-model="password"-->
            <!--&gt;</v-text-field>-->
            <!--</v-form>-->
            <form class="add_form">
              <v-text-field
                v-model="id"
                :error-messages="idErrors"
                :counter="9"
                label="Student ID"
                required
                @input="$v.id.$touch()"
                @blur="$v.id.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                :error-messages="passwordErrors"
                :counter="100"
                label="Password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>

              <v-btn class="mr-4" @click="login">Login</v-btn>
            </form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <!--<v-btn color="primary" @click="login">Login</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    password: { required, maxLength: maxLength(100) },
    id: { required, maxLength: maxLength(9), minLength: minLength(2) }
  },

  data: () => ({
    valid: false,
    id: "",
    password: ""
  }),
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("password must be at most 100 characters long");
      !this.$v.password.required && errors.push("password is required.");
      return errors;
    },
    idErrors() {
      const errors = [];
      if (!this.$v.id.$dirty) return errors;
      !this.$v.id.maxLength && errors.push("ID must be at most 9 digits long");
      !this.$v.id.minLength && errors.push("ID must be at least 2 digits long");
      !this.$v.id.required && errors.push("ID is required.");
      return errors;
    }
  },
  methods: {
    login: function() {
      this.$v.$touch();
      let id = this.id;
      let password = this.password;
      console.log("id is " + id + " and password is " + password);
      this.$store
        .dispatch("login", { id, password })
        .then(() => this.$router.push("/"))
        // .then(function() {
        //   this.$router.push("/");
        // })
        .catch(err => console.log(err));
    }
  },
  name: "Login"
};
</script>

<style scoped></style>
