<template>
  <v-container>
    <v-card class="mx-auto" color="#2F3038FF" dark max-width="800">
      <v-toolbar dark flat>
        <v-toolbar-title>Login to Headcounter.</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <form class="add_form">
          <v-text-field
            v-model="id"
            :error-messages="idErrors"
            :counter="9"
            label="Lecturer ID or Administrator ID"
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
    </v-card>
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
      this.$store
        .dispatch("login", { id, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  },
  name: "Login"
};
</script>

<style scoped></style>
