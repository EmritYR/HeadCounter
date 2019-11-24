<template>
  <v-container>
    <v-card class="mx-auto" color="#2F3038FF" dark max-width="1000">
      <v-card-title>
        <v-icon large left>
          mdi-library-books
        </v-icon>
        <span class="title font-weight-light">COMP</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        Please select a lecture from this course.
      </v-card-text>

      <div class="table">
        <v-simple-table>
          <template>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ViewLogs",
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159
        },
        {
          name: "Ice cream sandwich",
          calories: 237
        },
        {
          name: "Eclair",
          calories: 262
        },
        {
          name: "Cupcake",
          calories: 305
        },
        {
          name: "Gingerbread",
          calories: 356
        },
        {
          name: "Jelly bean",
          calories: 375
        },
        {
          name: "Lollipop",
          calories: 392
        },
        {
          name: "Honeycomb",
          calories: 408
        },
        {
          name: "Donut",
          calories: 452
        },
        {
          name: "KitKat",
          calories: 518
        }
      ]
    };
  }
};
</script>

<style scoped></style>
