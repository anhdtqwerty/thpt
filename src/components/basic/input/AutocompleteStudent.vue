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
    :loading="loading"
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <CardStudentInfo :student="data.item" />
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import api from '../../../plugins/api'
import { debounce } from 'lodash'
import utils from '@/plugins/utils.js'
import { Student } from '@/plugins/api'
import CardStudentInfo from '@/components/basic/card/CardStudentInfo.vue'

export default {
  components: {
    CardStudentInfo
  },
  data: () => ({
    students: [],
    inputValue: '',
    loading: false
  }),
  props: {
    filter: Object,
    options: Object,
    defaultStudent: Object
  },
  watch: {
    async inputValue(search) {
      this.debounce(search, this)
    },
    filter(filter) {
      this.fetchStudents(filter)
    }
  },
  methods: {
    async fetchStudents() {
      this.loading = true
      this.students = await Student.fetch({
        ...this.filter
      })
      this.loading = false
    },
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
