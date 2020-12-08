<template>
  <v-list class="py-0" v-if="role.name === 'Manager'">
    <Dashboard />
    <v-divider inset />
    <Classes />
    <v-divider inset />
    <Department />
    <v-divider inset />
    <Settings />
  </v-list>
</template>
<script>
import Department from '@/components/basic/menu/Department'
import Classes from '@/components/basic/menu/Classes'
import Settings from '@/components/basic/menu/Settings'
import Dashboard from '@/components/basic/menu/Dashboard'

import { mapState } from 'vuex'
export default {
  components: {
    Department,
    Settings,
    Dashboard,
    Classes
  },
  computed: {
    ...mapState('auth', ['profile', 'role'])
  }
}
</script>
