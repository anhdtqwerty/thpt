<template>
  <v-data-table
    mobile-breakpoint="0"
    :items="attendances"
    :items-per-page="10"
    item-key="id"
    :headers="headers"
    loading-text="Đang Tải"
    sort-by="name"
  >
  </v-data-table>
</template>

<script>
const originHeaders = [
  {
    text: 'Học sinh',
    value: 'student.name',
    align: 'left',
    sortable: true,
    show: true,
  },
  {
    text: 'Lớp',
    value: 'class.title',
    align: 'center',
    sortable: false,
    show: true,
  },
  {
    text: 'Có phép',
    value: '',
    align: 'center',
    sortable: false,
    show: true,
  },
  {
    text: 'Không phép',
    value: '',
    align: 'center',
    sortable: false,
    show: true,
  },
  {
    text: 'Hàng động',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true,
  },
]
export default {
  props: {
    attendances: Array,
  },
  data() {
    return {
      headers: originHeaders,
    }
  },
}
</script>
