<template>
  <v-navigation-drawer
    v-model="state"
    class="elevation-2"
    app
    :permanent="$vuetify.breakpoint.smAndUp"
    :temporary="$vuetify.breakpoint.xs"
  >
    <div
      style="background-color: #0D47A1"
      class="d-flex align-center px-6"
      :class="{
        'mobile-drawer-logo': $vuetify.breakpoint.xs,
        'px-7': $vuetify.breakpoint.xs
      }"
    >
      <v-img
        :height="imageHeight"
        src="../../assets/logo.svg"
        contain
        position="left"
      ></v-img>
    </div>
    <StudentToolbar></StudentToolbar>
    <TeacherToolbar></TeacherToolbar>
    <AdminToolbar></AdminToolbar>
  </v-navigation-drawer>
</template>
<script>
import TeacherToolbar from '@/components/layout/TeacherToolbar.vue'
import AdminToolbar from '@/components/layout/AdminToolbar.vue'
import StudentToolbar from '@/components/layout/StudentToolbar.vue'
export default {
  props: {
    drawer: { type: Boolean }
  },
  data() {
    return {
      state: false
    }
  },
  watch: {
    drawer() {
      this.state = true
    }
  },
  components: {
    StudentToolbar,
    TeacherToolbar,
    AdminToolbar
  },
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '32px'
        default:
          return '64px'
      }
    }
  }
}
</script>

<style scoped>
.mobile-drawer-logo {
  height: 64px;
}
</style>
