<template>
  <v-autocomplete
    v-bind="this.$attrs"
    label="Chọn Khóa Học"
    item-text="title"
    :items="courses"
    item-value="id"
    @change="onChange"
    return-object
    :rules="[v => !!v || 'Item is required']"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Course } from '@/plugins/api'

export default {
  data: () => ({
    courses: []
  }),
  props: {
    filters: Object,
    options: Object,
    defaultCourses: Array
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName'])
  },
  created () {
    this.courses = this.defaultCourses
    this.fetchCourse()
  },
  methods: {
    async fetchCourse () {
      this.courses = await Course.fetch({
        ...this.filters,
        department: this.department.id
      })
    },
    async update (data) {
      // this.courses = await Staff.fetch({
      //   ...this.filters,
      //   department: this.department.id,
      //   role: this.roleIdByName('teacher'),
      //   code_contains: data
      // })
    },
    onChange (data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filters (filters) {
      this.fetchCourse()
    }
  }
}
</script>
