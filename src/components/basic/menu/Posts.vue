<template>
  <v-list-group :value="false" active-class="primary white--text">
    <template v-slot:activator>
      <v-list-item-icon class="mr-4">
        <v-icon>portrait</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Sổ liên lạc</v-list-item-title>
    </template>
    <v-list class="py-0">
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/contact-book">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Danh sách</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/post-send">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Gửi tin nhắn</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/post-send-auto">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Gửi tin tự động</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="blue lighten-4 primary--text" class="px-0" link to="/post-history">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Lịch sử gửi tin</v-list-item-title>
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
