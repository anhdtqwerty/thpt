<template>
  <v-list-group :value="false" active-class="left-amber-border black--text">
    <template v-slot:activator>
      <v-list-item-icon class="pl-2">
        <v-icon>mdi-settings</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="text-uppercase">Cài đặt</v-list-item-title>
    </template>
    <v-list class="left-amber-border py-0">
      <v-list-item link :to="'/department/' + department.id">
        <v-list-item-action></v-list-item-action>
        <v-list-item-icon>
          <v-icon>settings_applications</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-3">Phân Quyền</v-list-item-title>
      </v-list-item>
    
    </v-list>
  </v-list-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return { menu: null }
  },
  computed: {
    ...mapGetters('app', ['department', 'policies']),
    ...mapGetters('auth', ['user', 'role'])
  }
}
</script>

<style scoped>
</style>
