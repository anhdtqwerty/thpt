<template>
  <v-app>
    <navigation-drawer width="212" class="d-print-none" :drawer="drawer"></navigation-drawer>
    <plugin-confirm-dialog class="d-print-none" />
    <main-toolbar class="d-print-none" v-if="!simpleLayout" @toggle-drawer="toggleDrawer($event)" />
    <v-main class="d-print-none">
      <plugin-alert />
      <plugin-loading />
      <confirm ref="confirm" />
      <v-container
        id="container"
        fluid
        grid-list-xl
        class="overflow-auto pa-0 pa-sm-2 pa-md-2 pa-xl-2 pa-lg-2"
        :style="{ height: `calc(100vh - 64px)` }"
        style="overflow-x: hidden; background-color: #fafafa"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainToolbar from './MainToolbar'
import PluginConfirmDialog from '@/components/plugin/PluginConfirmDialog'
import PluginAlert from '@/components/plugin/PluginAlert'
import PluginLoading from '@/components/plugin/PluginLoading'
import Confirm from '@/components/plugin/Confirm'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
import { get } from 'lodash'
export default {
  components: {
    MainToolbar,
    PluginConfirmDialog,
    PluginAlert,
    PluginLoading,
    Confirm,
    NavigationDrawer
  },
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapGetters('auth', ['user', 'profile', 'isAuthenticated']),
    ...mapGetters('app', ['department', 'roles']),
    simpleLayout() {
      const { meta = {}, matched = [] } = this.$route
      return meta.auth === false || matched.some(route => route.meta.auth === false)
    },
    isDesktop() {
      return true
    }
  },
  async created() {
    if (this.isAuthenticated) {
      this.fetchRoles()
      this.setDepartment(this.user.department)
      if (this.user.role.type === 'manager') {
        await this.fetchProfile({ user: this.user.id })
      } else if (this.user.role.type === 'teacher') {
        this.fetchTeacher({ user: this.user.id })
      } else if (this.user.role.type === 'student') {
        this.fetchStudent({ user: this.user.id })
      }

      this.fetchDepartment(this.department.id)
      this.setRole(this.user.role)
      this.setPolicies(get(this.department.policies, this.user.role.id))
    }
  },
  methods: {
    ...mapActions('app', ['fetchRoles', 'fetchStaffs', 'setDepartment', 'fetchDepartment', 'setPolicies']),
    ...mapActions('course', ['fetchCourses']),
    ...mapActions('auth', ['fetchProfile', 'fetchTeacher', 'fetchStudent', 'setRole']),
    toggleDrawer: function(updatedDrawer) {
      this.drawer = updatedDrawer
    }
  }
}
</script>
