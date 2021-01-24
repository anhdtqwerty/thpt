<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="display"
    :items="studentList"
    :value="student"
    return-object
    @change="onChange"
    :search-input.sync="inputValue"
    clearable
  ></v-autocomplete>
</template>

<script>
import api from '../../../plugins/api'
import { debounce } from 'lodash'
import utils from '@/plugins/utils.js'
export default {
  data: () => ({
    students: [],
    inputValue: '',
    // loading: false
  }),
  props: {
    filters: Object,
    options: Object,
    defaultStudent: Object
  },
  watch: {
    async inputValue(search) {
      this.debounce(search, this)
    }
  },
  methods: {
    onChange(data) {
      this.$emit('change', data)
      this.$emit('input', data)
    },
    debounce: debounce(async (search, context) => {
      if (!search) return
      // this.loading = true
      const data = await api.Student.search({
        code_contains: utils.removeUnicode(search),
        _limit: 5,
        _sort: 'createdAt:DESC'
      })
      // this.loading = false
      context.students = data
    }, 150)
  },

  computed: {
    studentList() {
      return [...this.students, this.defaultStudent]
        .filter(u => !!u && !!u.code)
        .map(s => ({ ...s, display: `${s.name} [${s.code}]` }))
    },
    student() {
      if (!this.defaultStudent || !this.defaultStudent.code) return null
      return {
        ...this.defaultStudent,
        display: `${this.defaultStudent.name} [${this.defaultStudent.code}]`
      }
    }
  }
}
</script>
