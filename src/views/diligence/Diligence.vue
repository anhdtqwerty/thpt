<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Chuyên cần"
          :link="[
            { text: 'Học sinh', href: '../students' },
            { text: 'Chuyên cần', href: '../diligence' }
          ]"
        />
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        mobile-breakpoint="0"
        :items="attendances"
        :items-per-page="10"
        item-key="id"
        :headers="headers"
        :loading="isLoading"
        loading-text="Đang Tải"
        sort-by="name"
      >
        <div slot="top" class="py-md-6">
          <DiligenceFilter @onFilterChanged="refresh" />
        </div>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import DiligenceFilter from '@/modules/diligence/DiligenceFilter.vue'

import moment from 'moment'
const originHeaders = [
  {
    text: 'Học sinh',
    value: 'student.name',
    align: 'left',
    sortable: true,
    show: true
  },
  {
    text: 'Lớp',
    value: 'class.title',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Có phép',
    value: '',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Không phép',
    value: '',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Hàng động',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true
  }
]
export default {
  components: {
    DiligenceFilter,
    Breadcrumbs
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: originHeaders
    }
  },
  computed: {
    ...mapGetters('attendance', ['attendances']),
    ...mapState('app', ['department'])
  },
  created() {
    this.refresh({})
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances']),
    refresh(query) {
      this.isLoading = true
      this.fetchAttendances().then(() => {
        this.isLoading = false
      })
    },
    formatTime(time, str) {
      return moment(time).format(str)
    },
    handleClick(data) {
      this.editState = !this.editState
      this.editClass = data.class
      this.editStudent = data.student
      this.editInClass = data.inClass
      this.editOutClass = data.outClass
    }
  }
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
</style>
