<template>
  <v-list-group :value="false">
    <template v-slot:activator>
      <v-list-item-icon class="mr-2">
        <v-icon>mdi-library</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="font-weight-black">Học sinh</v-list-item-title>
    </template>
    <v-list class="py-0">
      <v-list-item
        active-class="left-amber-border"
        class="px-0"
        link
        to="/students"
      >
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Danh sách</v-list-item-title>
      </v-list-item>
      <v-list-item
        active-class="left-amber-border"
        class="px-0"
        link
        to="/attendanced"
      >
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Điểm danh</v-list-item-title>
      </v-list-item>
      <v-list-item
        active-class="left-amber-border"
        class="px-0"
        link
        to="/complimented"
      >
        <v-list-item-action></v-list-item-action>
        <v-list-item-title>Khen thưởng kỷ luật</v-list-item-title>
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
