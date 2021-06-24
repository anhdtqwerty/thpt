<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Giảng dạy" :link="[{ text: 'Giảng dạy', href: '../teaching' }]" />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="primary" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn depressed dark color="#0D47A1" @click="addState = !addState">
          <v-icon left>add</v-icon>Thêm phân công
        </v-btn>
      </div>
    </div>
    <v-card outlined class="py-md-4 px-md-6 mx-md-4 mb-6 elevation-0">
      <TeachingFilter @onFilterChanged="refresh" ref="teachingFilter" />
    </v-card>

    <v-card outlined class="mx-md-4 elevation-0"> <TeachingDataTable ref="teachingDataTable" @edit="onEdit"/></v-card>
    <TeachingEditDialog
      :state="editState"
      :selectedTeaching="selectedTeaching"
      @deleteState="deleteState = !deleteState"
      @done="onFilter"
    />
    <TeachingNewDialog :state="addState" @done="onFilter" />
    <TeachingDeleteDialog :state="deleteState" @delete="onDelete" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import TeachingFilter from '@/modules/teacher/TeachingFilter.vue'
import TeachingDataTable from '@/modules/teacher/TeachingDataTable.vue'
import TeachingEditDialog from '@/modules/teacher/TeachingEditDialog'
import TeachingNewDialog from '@/modules/teacher/TeachingNewDialog'
import TeachingDeleteDialog from '@/modules/teacher/TeachingDeleteDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
import utils from '@/plugins/utils'

Vue.use(Vuetify)
export default {
  components: {
    Breadcrumbs,
    TeachingFilter,
    TeachingEditDialog,
    TeachingNewDialog,
    TeachingDataTable,
    TeachingDeleteDialog
  },
  data() {
    return {
      createState: false,
      filterState: false,
      editState: false,
      addState: false,
      deleteState: false,
      selectedTeaching: null
    }
  },
  computed: {
    ...mapState('teaching', ['teachings'])
  },
  methods: {
    ...mapActions('teaching', ['removeTeaching']),
    refresh(query) {
      this.$refs.teachingDataTable.refresh(query)
    },
    onFilter() {
      this.$refs.teachingFilter.onFilterChanged()
    },
    onEdit(item) {
      this.selectedTeaching = item
      this.editState = !this.editState
    },
    async onDelete() {
      try {
        this.$loading.active = true

        await this.removeTeaching(this.selectedTeaching.id)
        this.$alert.success('Xoá thành công!')
        this.selectedTeaching = { ...this.selectedTeaching, id: null, teacher: null }
        this.onFilter()
        this.deleteState = !this.deleteState
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    },
    exportExcel() {
      let excelHeader = this.$refs.teachingDataTable.headers.map(({ text, value }) => ({ text, value }))
      excelHeader = excelHeader.filter(excel => excel.value !== 'action')
      const filters = this.$options.filters
      const teachings = JSON.parse(JSON.stringify(this.teachings))
      const data = teachings.map(item => {
        if (item.teacher) {
          if (item.teacher.gender) {
            item.teacher.gender = filters.gender(item.teacher.gender)
          }
          if (item.teacher.dob) {
            item.teacher.dob = filters.ddmmyyyy(item.teacher.dob)
          }
        } else {
          item.teacher = { name: 'Chưa có giáo viên chủ nhiệm' }
        }
        return item
      })
      utils.exportExcel(data, excelHeader, 'Teaching_List')
    }
  }
}
</script>
