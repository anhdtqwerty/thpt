<template>
  <v-list-group :value="false" active-class="black-text">
    <template v-slot:activator>
      <v-list-item class="px-0">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-account-multiple-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>GIÁO VIÊN</v-list-item-title>
      </v-list-item>
    </template>
    <v-list class="py-0">
      <v-list-item class="px-0" link to="/teachers">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Danh sách</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-list-group>
</template>
