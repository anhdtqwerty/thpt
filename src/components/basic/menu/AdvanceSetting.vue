<template>
  <v-list-group :value="false" active-class="primary white--text">
    <template v-slot:activator>
      <v-list-item-icon class="mr-4">
        <v-icon>mdi-layers</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Nâng cao</v-list-item-title>
    </template>
    <v-list class="py-0">
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/generation">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Năm học</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/subjectGroups">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Bộ môn</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/divisions">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Quản lý phân ban</v-list-item-title>
      </v-list-item>

      <!-- <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/grades">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Quản lý khối</v-list-item-title>
      </v-list-item> -->
      <!-- <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/semesters">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Quản lý học kỳ</v-list-item-title>
      </v-list-item> -->
      <!-- <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/generations">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Quản lý khóa</v-list-item-title>
      </v-list-item> -->
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/subjects">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Môn học</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/academics">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Cấp học</v-list-item-title>
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
