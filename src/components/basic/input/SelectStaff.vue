<template>
  <v-select
    v-bind="this.$attrs"
    label="Chọn Nhân Viên"
    item-text="name"
    :items="staffs"
    item-value="id"
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import { Staff } from '@/plugins/api'

export default {
  data: () => ({
    staffs: []
  }),
  props: {
    filters: Object
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName'])
  },
  created () {
    this.fetchAllStaffs()
  },
  methods: {
    async fetchAllStaffs () {
      this.staffs = await Staff.fetch({
        ...this.filters,
        department: this.department.id,
        role: this.roleIdByName('staff')
      })
    },
    onChange (data) {
      this.$emit('change', data)
    }
  }
}
</script>
