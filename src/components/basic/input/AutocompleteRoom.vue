<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="rooms"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Room } from '@/plugins/api'

export default {
  data: () => ({
    rooms: []
  }),
  props: {
    filters: Object,
    defaultRooms: Array,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created () {
    if (this.defaultRooms) {
      this.rooms = this.defaultRooms
    }

    this.fetchAllRooms()
  },
  methods: {
    async fetchAllRooms () {
      this.rooms = await Room.fetch({
        ...this.filters,
        department: this.department.id
      })
    },
    async update (data) {
      // this.rooms = await Staff.fetch({
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

<style scoped>
</style>
