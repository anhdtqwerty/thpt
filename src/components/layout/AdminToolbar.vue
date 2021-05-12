<template>
  <v-list class="admin-toolbar py-0" v-if="role.name === 'Manager'">
    <Dashboard />
    <Students />
    <Teachers />
    <Classes />
    <Violation />
    <AdvanceSetting />
    <System />
    <Posts />
  </v-list>
</template>
<script>
import Classes from '@/components/basic/menu/Classes'
import Students from '@/components/basic/menu/Students.vue'
import Teachers from '@/components/basic/menu/Teachers.vue'
import Dashboard from '@/components/basic/menu/Dashboard'
import AdvanceSetting from '@/components/basic/menu/AdvanceSetting.vue'
import System from '@/components/basic/menu/System.vue'
import Posts from '@/components/basic/menu/Posts.vue'
import Violation from '@/components/basic/menu/Violation.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Dashboard,
    Classes,
    Students,
    Teachers,
    AdvanceSetting,
    System,
    Violation,
    Posts
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
