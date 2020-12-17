<template>
  <v-autocomplete
    item-text="name"
    item-value="id"
    v-bind="this.$attrs"
    :items="Generations"
    @change="onChange"
    v-on:input="$emit('input', $event)"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Generation } from '@/plugins/api'

export default {
  data: () => ({
    Generations: []
  }),
  props: {
    filters: Object,
    defaultGenerations: Array,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created () {
    if (this.defaultGenerations) {
      this.Generations = this.defaultGenerations
    }
    this.fetchAllGenerations()
  },
  methods: {
    async fetchAllGenerations () {
      this.Generations = await Generation.fetch({
        ...this.filters,
        department: this.department.id
      })
    },
    onChange (data) {
      this.$emit('change', data)
    }
  }
}
</script>
