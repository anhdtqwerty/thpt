<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="majors"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Major } from '@/plugins/api'

export default {
  data: () => ({
    majors: []
  }),
  props: {
    filters: Object,
    defaultMajors: Array,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created () {
    if (this.defaultMajors) {
      this.majors = this.defaultMajors
    }

    this.fetchAllStaffs()
  },
  methods: {
    async fetchAllStaffs () {
      this.majors = await Major.fetch({
        ...this.filters,
        type: 'major',
        department: this.department.id
      })
    },
    async update (data) {
      // this.majors = await Staff.fetch({
      //   ...this.filters,
      //   department: this.department.id,
      //   role: this.roleIdByName('teacher'),
      //   code_contains: data
      // })
    },
    onChange (data) {
      this.$emit('change', data)
    }
  }
}
</script>
