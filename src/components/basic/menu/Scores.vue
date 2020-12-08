<template>
  <v-list-group :value="false" active-class="left-amber-border black--text">
    <template v-slot:activator>
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-spellcheck</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase">Học sinh</v-list-item-title>
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item link to="/marks">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Số điểm</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/marks-input">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Nhập điểm</v-list-item-title>
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
    ...mapGetters('auth', ['user', 'role']),
  },
}
</script>

<style scoped>
</style>