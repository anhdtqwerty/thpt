<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="code"
    :items="classes"
    item-value="id"
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Class } from '@/plugins/api'

export default {
  data: () => ({
    classes: []
  }),
  props: {
    filters: Object,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created () {
    this.fetchClass()
  },
  methods: {
    async fetchClass () {
      this.classes = await Class.fetch({
        ...this.filters,
        department: this.department.id
      })
    },
    async update (data) {
      if (data) {
        this.classes = await Class.fetch({
          ...this.filters,
          department: this.department.id,
          code_contains: data
        })
      }
    },
    onChange (data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filters (filters) {
      this.fetchClass()
    }
  }
}
</script>
