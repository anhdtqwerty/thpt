<template>
  <v-list-group :value="false" active-class="primary white--text">
    <template v-slot:activator>
      <v-list-item-icon class="mr-4">
        <v-icon>mdi-account-multiple-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Giáo viên</v-list-item-title>
    </template>
    <v-list class="py-0">
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/teachers">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Danh sách</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/teaching">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Giảng dạy</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/ownClassTeacher">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Chủ nhiệm</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-list-group>
</template>
