<template>
  <v-list-group :value="false" active-class="left-amber-border black--text">
    <template v-slot:activator>
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-account-network</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase">Quản Trị</v-list-item-title>
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item link to="/students" v-if="policies['view-student-list']">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>accessibility_new</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Học Viên</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/teachers" v-if="policies['view-teacher-list']">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>recent_actors</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Giáo Viên</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/staffs" v-if="policies['view-staff-list']">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>people_alt</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Nhân Viên</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/facility" v-if="policies['view-staff-list']">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>mdi-printer</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Cơ Sở Vật Chất</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/reservation" v-if="policies['view-student-list']">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>mdi-account-switch</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Bảo Lưu</v-list-item-title>
      </v-list-item>
      <v-list></v-list>
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
    ...mapGetters('app', ['department', 'policies']),
    ...mapGetters('auth', ['user', 'role']),
  },
}
</script>

<style scoped>
</style>
