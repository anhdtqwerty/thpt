<template>
  <v-list-group :value="false" active-class="left-amber-border black--text">
    <template v-slot:activator>
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-library</v-icon>
      </v-list-item-icon>
      <v-list-item-title >Học sinh</v-list-item-title>
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item link to="/students">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Danh sách</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/attendanced" >
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Điểm danh</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/complimented">
        <v-list-item-action></v-list-item-action>
        <v-list-item-title class="ml-3">Khen thưởng kỷ luật</v-list-item-title>
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
