<template>
  <v-container>
    <v-card class="mx-auto" color="#2F3038FF" dark max-width="800">
      <v-card-title>
        <v-icon large left>
          mdi-library-books
        </v-icon>
        <span class="title font-weight-light">COMP</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        Please enter the student's full name and student ID in order to remove
        them from this course.
      </v-card-text>

      <form class="add_form">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="100"
          label="Full Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="id"
          :error-messages="idErrors"
          :counter="9"
          label="Student ID"
          required
          @input="$v.id.$touch()"
          @blur="$v.id.$touch()"
        ></v-text-field>

        <v-btn class="mr-4" @click="submit">Remove Student</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  name: "RemoveStudent",
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(100) },
    id: { required, maxLength: maxLength(9), minLength: minLength(9) }
  },

  data: () => ({
    name: "",
    id: null
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 100 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    idErrors() {
      const errors = [];
      if (!this.$v.id.$dirty) return errors;
      !this.$v.id.maxLength && errors.push("ID must be at most 9 digits long");
      !this.$v.id.minLength && errors.push("ID must be at least 9 digits long");
      !this.$v.id.required && errors.push("ID is required.");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.id = null;
    }
  }
};
</script>

<style scoped>
.add_form {
  padding: 90px;
}
</style>
