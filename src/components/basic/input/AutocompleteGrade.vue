<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="grades"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
    clearable
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Grade } from '@/plugins/api'

export default {
  data: () => ({
    grades: []
  }),
  props: {
    filters: Object,
    defaultGrades: Array,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created() {
    if (this.defaultGrades) {
      this.grades = this.defaultGrades
    }

    this.fetchAllGrades()
  },
  methods: {
    async fetchAllGrades() {
      this.grades = await Grade.fetch({
        ...this.filters,
        _sort: 'gradeNumber:ASC'
      })
    },
    async update(data) {},
    onChange(data) {
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped></style>
