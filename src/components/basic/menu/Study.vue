<template>
  <v-list-group :value="false"  active-class="left-amber-border black--text">
    <template v-slot:activator>
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-school</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase">Học tập</v-list-item-title>
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item link to="/schedule" v-if="policies['view-class-list']">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>mdi-clock</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Thời Khóa Biểu</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/classes" v-if="policies['view-class-list']">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>class</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Lớp Học</v-list-item-title>
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
    ...mapGetters('app', ['policies']),
  },
}
</script>

<style scoped>
</style>
