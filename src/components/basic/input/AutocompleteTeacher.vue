<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="name"
    :items="teachers"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Teacher } from '@/plugins/api'

export default {
  data: () => ({
    teachers: []
  }),
  props: {
    filters: Object,
    options: Object,
    defaultTeachers: Array
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName'])
  },
  created () {
    this.teachers = this.defaultTeachers
    this.fetchAllTeachers()
  },
  methods: {
    async fetchAllTeachers () {
      this.teachers = await Teacher.fetch({
        ...this.filters,
        department: this.department.id
      })
    },
    async update (data) {
      // this.teachers = await Teacher.fetch({
      //   ...this.filters,
      //   department: this.department.id,
      //   role: this.roleIdByName('teacher'),
      //   code_contains: data
      // })
    },
    onChange (data) {
      this.$emit('change', data)
    }
  }
}
</script>
