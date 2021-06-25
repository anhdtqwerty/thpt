<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="classes"
    item-value="id"
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
    @input="onChange"
    auto-select-first
    :loading="loading"
    clearable
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Class } from '@/plugins/api'
import { get } from 'lodash'

export default {
  data: () => ({
    classes: [],
    loading: false
  }),
  props: {
    filter: Object,
    defaultClasses: Array,
    changeClass: {
      type: Boolean,
      default: false
    },
    currentClass: null
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName'])
  },
  created() {
    this.classes = this.defaultClasses || []
    this.fetchClass()
  },
  methods: {
    async fetchClass() {
      this.loading = true
      this.classes = await Class.fetch({
        ...this.filter,
        _limit: -1,
        department: this.department.id,
        status: 'running',
        _sort: 'grade.gradeNumber:ASC'
      })
      if (this.changeClass && this.currentClass) {
        this.classes = this.classes.filter(c => get(c.grade, 'id') === this.currentClass.grade)
        this.classes = this.classes.filter(c => c.id !== this.currentClass.id)
      }
      this.loading = false
    },
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filter(filters) {
      this.fetchClass()
    },
    currentClass() {
      this.fetchClass()
    }
  }
}
</script>
