<template>
  <v-list class="py-0" v-if="role.name === 'Manager'">
    <Dashboard />
    <v-divider inset />
    <Students />
    <v-divider inset />
    <Teachers />
    <v-divider inset />
    <Classes />
    <v-divider inset />
    <Scores />
    <v-divider inset />
    <Subjects />
    <v-divider inset />
    <AdvanceSetting />
    <v-divider inset />
  </v-list>
</template>
<script>
import Department from '@/components/basic/menu/Department'
import Classes from '@/components/basic/menu/Classes'
import Students from '@/components/basic/menu/Students.vue'
import Teachers from '@/components/basic/menu/Teachers.vue'
import Subjects from '@/components/basic/menu/Subjects.vue'
import Dashboard from '@/components/basic/menu/Dashboard'
import Scores from '@/components/basic/menu/Scores.vue'
import AdvanceSetting from '@/components/basic/menu/AdvanceSetting.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Dashboard,
    Classes,
    Students,
    Subjects,
    Teachers,
    Scores,
    AdvanceSetting
  },
  computed: {
    ...mapState('auth', ['profile', 'role'])
  }
}
</script>
