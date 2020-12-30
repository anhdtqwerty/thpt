<template>
  <v-list-group :value="false" active-class="left-amber-border black--text">
    <template v-slot:activator>
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-book</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase">Cấu Hình</v-list-item-title>
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item link to="/majors">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>mdi-flag-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Chuyên Ngành</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/courses">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>mdi-message-video</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Môn Học</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/rooms">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>mdi-office-building</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Phòng Học</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/generations">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Niên khóa</v-list-item-title>
      </v-list-item>
      <v-list-item
        to="/showcases"
        link
        v-if="policies['view-staff-attendance']"
      >
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>emoji_events</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Trang Sản Phẩm</v-list-item-title>
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
    ...mapGetters('app', ['department', 'policies']),
    ...mapGetters('auth', ['user', 'role'])
  }
}
</script>

<style scoped></style>
