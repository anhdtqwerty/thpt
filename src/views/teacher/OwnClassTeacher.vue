<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Chủ nhiệm" :link="[{ text: 'Chủ nhiệm', href: '../teaching' }]" />
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
      <OwnClassTeacherFilter @onFilterChanged="refresh" ref="ownClassTeacherFilter"></OwnClassTeacherFilter>
    </v-card>

    <v-card outlined class="mx-md-4 elevation-0">
      <OwnClassTeacherDataTable ref="ownClassTeacherDataTable" @editState="edit" />
    </v-card>
    <OwnClassTeacherEditDialog
      ref="ownClassTeacherEditDialog"
      :selectedTeacher="selectedTeacher"
      :ownClass="ownClass"
      :state="editState"
      @deleteState="deleteState = !deleteState"
      @done="onFilter"
    />
    <OwnClassTeacherNewDialog :state="addState" @done="onFilter" />
    <OwnClassTeacherDeleteDialog :state="deleteState" @delete="onDelete" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import OwnClassTeacherFilter from '@/modules/teacher/OwnClassTeacherFilter.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
import utils from '@/plugins/utils'
import OwnClassTeacherEditDialog from '@/modules/teacher/OwnClassTeacherEditDialog'
import OwnClassTeacherNewDialog from '@/modules/teacher/OwnClassTeacherNewDialog'
import OwnClassTeacherDataTable from '@/modules/teacher/OwnClassTeacherDataTable'
import OwnClassTeacherDeleteDialog from '@/modules/teacher/OwnClassTeacherDeleteDialog'

Vue.use(Vuetify)

export default {
  components: {
    Breadcrumbs,
    OwnClassTeacherFilter,
    OwnClassTeacherEditDialog,
    OwnClassTeacherNewDialog,
    OwnClassTeacherDataTable,
    OwnClassTeacherDeleteDialog
  },
  data() {
    return {
      editState: false,
      addState: false,
      deleteState: false,
      selectedTeacher: null,
      ownClass: null
    }
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('ownClassTeacher', ['ownClassTeacherData'])
  },
  methods: {
    ...mapActions('ownClassTeacher', ['updateClass']),
    edit({ headTeacher, ownClass }) {
      this.selectedTeacher = headTeacher
      this.ownClass = ownClass
      this.editState = !this.editState
    },
    async onDelete() {
      try {
        this.$loading.active = true
        const index = this.ownClass.headTeachers.indexOf(this.selectedTeacher)
        this.ownClass.headTeachers.splice(index, 1)
        await this.updateClass(this.ownClass)
        this.$alert.success('Xoá thành công!')
        this.selectedTeacher = null
        this.onFilter()
        this.deleteState = !this.deleteState
      } catch (error) {
        console.log('err', error)
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    },
    refresh(query) {
      this.$refs.ownClassTeacherDataTable.refresh(query)
    },
    onFilter() {
      this.$refs.ownClassTeacherFilter.onFilterChanged()
    },
    exportExcel() {
      let excelHeader = this.$refs.ownClassTeacherDataTable.headers.map(({ text, value }) => ({ text, value }))
      excelHeader = excelHeader.filter(excel => excel.value !== 'action')
      excelHeader.forEach(excel => {
        if (excel.value === 'headTeacher.gender') excel.text = 'Giới tính'
        if (excel.value === 'headTeacher.dob') excel.text = 'Ngày sinh'
      })
      const filters = this.$options.filters
      const ownClassTeacherData = JSON.parse(JSON.stringify(this.ownClassTeacherData))
      const data = ownClassTeacherData.map(item => {
        if (item.headTeacher) {
          if (item.headTeacher.gender) {
            item.headTeacher.gender = filters.gender(item.headTeacher.gender)
          }
          if (item.headTeacher.dob) {
            item.headTeacher.dob = filters.ddmmyyyy(item.headTeacher.dob)
          }
        } else {
          item.headTeacher = { name: 'Chưa có giáo viên chủ nhiệm' }
        }
        return item
      })
      utils.exportExcel(data, excelHeader, 'OwnclassTeacher_List')
    }
  }
}
</script>
