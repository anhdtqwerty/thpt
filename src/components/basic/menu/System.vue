<template>
  <v-list-group :value="false">
    <template v-slot:activator>
      <v-list-item-icon class="mr-4">
        <v-icon>mdi-memory</v-icon>
      </v-list-item-icon>
      <v-list-item-title>HỆ THỐNG</v-list-item-title>
    </template>
    <v-list class="py-0">
      <v-list-item
        class="px-0"
        link
        to="/contact-book"
      >
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Sổ liên lạc</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-list-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return { menu: null }
  },
  computed: {
    ...mapGetters('auth', ['user', 'role'])
  }
}
</script>

<style scoped></style>
