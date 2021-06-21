<template>
  <v-data-table
    dense
    item-key="id"
    disableSort
    :items-per-page="-1"
    :headers="headers"
    :items="teachings"
    hide-default-footer
  >
  </v-data-table>
</template>
<script>
import { mapState } from 'vuex'
const originalHeaders = [
  {
    text: 'Tên môn học',
    value: 'subject.title',
    align: 'left',
    sortable: false
  },
  {
    text: 'Giáo viên bộ môn',
    value: 'teacher.name',
    align: 'left',
    sortable: false
  },
  {
    text: 'Số điện thoại',
    value: 'teacher.phone',
    align: 'left',
    sortable: false
  },
  {
    text: 'Email giáo viên',
    value: 'teacher.email',
    align: 'left',
    sortable: false
  }
]
export default {
  data() {
    return {
      headers: originalHeaders
    }
  },
  computed: {
    ...mapState('classDetail', ['teachings'])
  }
}
</script>
