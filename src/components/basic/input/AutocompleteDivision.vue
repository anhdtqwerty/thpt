<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="divisionList"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
    v-model="value"
    :loading="loading"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Division } from '@/plugins/api'

export default {
  data: () => ({
    divisions: [],
    loading: false,
    value: null
  }),
  props: {
    filter: Object,
    defaultDivisions: Object,
    options: Object,
    grade: String,
    div: Object
  },
  computed: {
    ...mapGetters('app', ['department']),
    divisionList() {
      if (!this.grade) return this.divisions
      return this.divisions.filter(d => d.grade.id === this.grade)
    }
  },
  created() {
    if (this.defaultDivisions) {
      this.divisions = this.defaultDivisions
    }
    this.fetchAllDivisions()
  },
  methods: {
    async fetchAllDivisions() {
      this.loading = true
      this.divisions = await Division.fetch({
        ...this.filter
      })
      this.loading = false
    },
    async update(data) {},
    onChange(data) {
      this.$emit('update:div', data)
      this.$emit('change', data)
    }
  },
  watch: {
    grade() {
      console.log(this.grade)
    },
    filter(filter) {
      // this.value = null
      this.fetchAllDivisions()
    }
  }
}
</script>

<style scoped></style>
