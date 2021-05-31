<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="subjects"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
    clearable
    :loading="loading"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Subject } from '@/plugins/api'

export default {
  data: () => ({
    subjects: [],
    loading: false
  }),
  props: {
    filter: Object,
    defaultSubjects: Array,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created() {
    if (this.defaultSubjects) {
      this.subjects = this.defaultSubjects
    }

    this.fetchAllSubjects()
  },
  methods: {
    async fetchAllSubjects() {
      this.loading = true
      this.subjects = await Subject.fetch({
        ...this.filter
      })
      this.loading = false
    },
    async update(data) {},
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filter(filter) {
      this.fetchAllSubjects()
    },
    defaultSubjects(subjects) {
      this.subjects = subjects
    }
  }
}
</script>

<style scoped></style>
