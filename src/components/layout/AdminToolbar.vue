<template>
  <v-list class="admin-toolbar py-0" v-if="role.name === 'Manager'">
    <Dashboard />
    <Students />
    <Teachers />
    <Classes />
    <Scores />
    <AdvanceSetting />
    <System />
  </v-list>
</template>
<script>
import Classes from '@/components/basic/menu/Classes'
import Students from '@/components/basic/menu/Students.vue'
import Teachers from '@/components/basic/menu/Teachers.vue'
import Dashboard from '@/components/basic/menu/Dashboard'
import Scores from '@/components/basic/menu/Scores.vue'
import AdvanceSetting from '@/components/basic/menu/AdvanceSetting.vue'
import System from '@/components/basic/menu/System.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Dashboard,
    Classes,
    Students,
    Teachers,
    Scores,
    AdvanceSetting,
    System,
  },
  computed: {
    ...mapState('auth', ['profile', 'role']),
  },
}
</script>

<style>
.v-navigation-drawer__content .v-list-item__title {
  font-size: 14px;
}
</style>
