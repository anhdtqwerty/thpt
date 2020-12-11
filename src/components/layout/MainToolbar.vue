<template>
  <v-app-bar
    app
    dense
    height="64px"
    class="elevation-2 white"
    :class="{ blue: isXsScreen, 'darken-4': isXsScreen }"
  > 
    <v-app-bar-nav-icon
      dark
      class="d-flex d-sm-none"
      @click.stop="toggleDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="pl-0">
      <v-img
        class="d-flex d-sm-none "
        src="../../assets/logo.svg"
        height="32px"
        width="132px"
        contain
      ></v-img>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <user v-if="role.name === 'Manager'" />
      <student v-if="role.name === 'Student'" />
      <teacher v-if="role.name === 'Teacher'" />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import User from '@/components/basic/menu/User'
import Teacher from '@/components/basic/menu/Teacher'
import Student from '@/components/basic/menu/Student'
export default {
  components: {
    Student,
    Teacher,
    User
  },
  computed: {
    ...mapState('auth', ['user', 'role']),
    isXsScreen () {
      return this.$vuetify.breakpoint.xs
    }
  },
  data () {
    return { drawer: true }
  },
  methods: {
    toggleDrawer: function () {
      this.drawer = !this.drawer
      this.$emit('toggle-drawer', this.drawer)
    }
  }
}
</script>

<style>
</style>
