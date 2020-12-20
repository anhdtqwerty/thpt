<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="semesterList"
    item-value="id"
    @change="onChange"
    clearable
    return-object
    :rules="[v => !!v || 'Item is required']"
    v-on:input="$emit('input', $event)"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Semester } from '@/plugins/api'

export default {
  data: () => ({
    semesters: []
  }),
  props: {
    filter: Object,
    defaultSemesters: Array
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName']),
    semesterList () {
      return this.semesters.map(c => ({ ...c, title: `${c.title}` }))
    }
  },
  created () {
    this.semesters = this.defaultSemesters || []
    this.fetchSemester()
  },
  methods: {
    async fetchSemester() {
      this.semesters = await Semester.fetch({
        ...this.filter
      })
    },
    onChange (data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filters (filters) {
      this.fetchSemester()
    }
  }
}
</script>
