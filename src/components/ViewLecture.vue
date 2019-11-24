<template>
  <v-container>
    <h1 class="header" @click="getAll">Lecture 1</h1>
    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th class="text-left">Full Name</th>
            <th class="text-left">Student ID</th>
            <th class="text-left">Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: "ViewLecture",
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          id: 159,
          status: "Present"
        },
        {
          name: "Ice cream sandwich",
          id: 237,
          status: "Present"
        },
        {
          name: "Eclair",
          id: 262,
          status: "Present"
        }
      ]
    };
  }
};
</script>

<style scoped></style>
