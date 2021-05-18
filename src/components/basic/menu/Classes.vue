<template>
  <v-list-group :value="false" active-class="primary white--text">
    <template v-slot:activator>
      <v-list-item-icon class="mr-4">
        <v-icon>mdi-school</v-icon>
      </v-list-item-icon>
      <v-list-item-title>LỚP HỌC</v-list-item-title>
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/classes">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Danh sách</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/marks">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Số điểm</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/marks-input">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Nhập điểm</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-list-group>
</template>
