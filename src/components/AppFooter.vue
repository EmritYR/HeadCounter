<template>
  <v-footer padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <img
        alt="logo stallions"
        id="stallions_logo"
        src="../assets/stallions_logo.png"
      />
      <strong>Stallions</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    items: ["default", "absolute", "fixed"],
    padless: false,
    variant: "default"
  }),
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    }
  }
};
</script>

<style scoped>
#stallions_logo {
  width: 2%;
  height: 2%;
  margin-bottom: 3px;
  padding-right: 5px;
}
</style>
