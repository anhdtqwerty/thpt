<template>
  <v-list-group active-class="primary white--text" :value="false">
    <template v-slot:activator>
      <v-list-item-icon class="mr-4">
        <v-icon>mdi-library</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Học sinh</v-list-item-title>
    </template>
    <v-list class="py-0">
      <v-list-item class="px-0" active-class="blue lighten-4 primary--text" link to="/students">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Danh sách</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/attendances">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Chuyên cần</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-0" active-class="blue lighten-4 primary--text" link to="/complimented">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Khen thưởng kỷ luật</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/student-mark">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Sổ điểm</v-list-item-title>
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
