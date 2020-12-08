<template>
  <v-list-group :value="false" active-class="left-amber-border black--text">
    <template v-slot:activator>
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-layers</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase"
        >Quản lý nâng cao</v-list-item-title
      >
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item link to="/divisions">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Quản lý phân ban</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/grades">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Quản lý khối</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/semester">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Quản lý học kỳ</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/generation">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Quản lý khóa</v-list-item-title>
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
