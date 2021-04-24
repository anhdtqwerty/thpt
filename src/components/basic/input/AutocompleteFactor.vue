<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="factorList"
    item-value="id"
    clearable
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Factor } from '@/plugins/api'

export default {
  data: () => ({
    factors: []
  }),
  props: {
    filter: Object
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName']),
    factorList() {
      return this.factors.map(c => ({ ...c, title: `${c.title}` }))
    }
  },
  created() {},
  methods: {
    async fetchFactor() {
      this.factors = await Factor.fetch({
        ...this.filter
      })
    },
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filter(filters) {
      this.fetchFactor()
    }
  }
}
</script>
