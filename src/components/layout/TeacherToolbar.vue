<template>
  <v-list class="py-0" v-if="role.name === 'Teacher'">
    <v-list-item link to="/teacher-dashboard" active-class="left-amber-border">
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-calendar</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase ml-n1"
        >Thời Khóa Biểu</v-list-item-title
      >
    </v-list-item>
    <v-list-item link to="/teacher-classes" active-class="left-amber-border">
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-clipboard</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase ml-n1"
        >Danh Sách Lớp</v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['user', 'role'])
  }
}
</script>
