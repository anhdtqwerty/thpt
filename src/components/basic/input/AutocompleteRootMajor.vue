<template>
  <v-autocomplete
    dense
    v-bind="this.$attrs"
    item-text="title"
    :items="majors"
    item-value="id"
    @change="onChange"
    :rules="[(v) => !!v || 'Item is required']"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Major } from '@/plugins/api'

export default {
  data: () => ({
    majors: [],
  }),
  props: {
    filters: Object,
    options: Object,
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName']),
  },
  created() {
    this.fetchAllStaffs()
  },
  methods: {
    async fetchAllStaffs() {
      this.majors = await Major.fetch({
        ...this.filters,
        type: 'root',
        department: this.department.id,
      })
    },
    async update(data) {
      // this.majors = await Staff.fetch({
      //   ...this.filters,
      //   department: this.department.id,
      //   role: this.roleIdByName('teacher'),
      //   code_contains: data
      // })
    },
    onChange(data) {
      this.$emit('change', data)
    },
  },
}
</script>
