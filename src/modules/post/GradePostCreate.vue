<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="allSchoolItems"
    item-key="title"
    show-select
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected: [],
      headers: [
        { text: 'Nhóm nhận tin', value: 'title' },
        { text: 'Số lớp', value: 'classNo' },
        { text: 'Số học sinh', value: 'studentNo' },
      ],
    }
  },
  computed: {
    ...mapGetters('postCreate', ['allSchoolItems']),
  },
}
</script>

<style lang="scss" scoped>

</style>
