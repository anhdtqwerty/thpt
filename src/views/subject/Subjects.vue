<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý môn"
          :link="[
            { text: 'Nâng cao', href: '../divisions' },
            { text: 'Môn học', href: '../subjects' }
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="success" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn @click="createSubject = !createSubject" dark color="primary">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <SubjectNewDialog :state="createSubject" />

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        :headers="headers"
        :items="subjects"
        @click:row="onSelected"
        ref="subjectDataTable"
        :footer-props="footerTable"
      >
        <div slot="top" class="py-md-6">
          <SubjectFilter @onFilterChanged="refresh" />
        </div>
        <template v-slot:item.grade="{ item }">
          {{ item.grade | getGrade }}
        </template>
        <template v-slot:item.markType="{ item }">
          {{ item.markType | getMarkType }}
        </template>
        <template v-slot:item.type="{ item }">
          {{ item.type | getSubjectType }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SubjectNewDialog from '@/modules/subject/SubjectNewDialog'
import SubjectFilter from '@/modules/subject/SubjectFilter.vue'
import utils from '@/plugins/utils'

export default {
  components: {
    SubjectNewDialog,
    Breadcrumbs,
    SubjectFilter
  },
  props: {
    role: String
  },
  data() {
    return {
      isLoading: false,
      headers: [
        {
          text: 'Tên môn học',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true
        },
        { text: 'Bộ môn', value: 'subjectGroup.title', show: true },
        { text: 'Nhóm môn học', value: 'type', show: true },
        { text: 'Khối', value: 'grade', show: true },
        { text: 'Phân ban', value: 'division.title', show: true },
        {
          text: 'Hệ số tổng kết',
          value: 'multiply',
          show: true,
          align: 'center'
        },
        { text: 'Đánh giá theo', value: 'markType', show: true }
      ],
      createSubject: false,
      selected: {}
    }
  },

  computed: {
    ...mapState('app', ['department']),
    ...mapState('subjects', ['subjects']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm môn'
      }
    },
    footerTable() {
      let footer = {
        'items-per-page-text': 'Hiển thị mỗi trang',
        'items-per-page-all-text': 'Tất cả',
        'items-per-page': 10,
        'page-text': this.pageText
      }
      if (this.totalItems > 100) {
        footer['items-per-page-options'] = [5, 10, 15]
      }
      return footer
    }
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('subjects', ['fetchSubjects', 'removeSubject']),
    updateDraw(draw) {
      this.draw = draw
    },
    async refresh(query) {
      console.log(query)
      this.$loading.active = true
      try {
        await this.fetchSubjects({
          ...query,
          _limit: 9999,
          _sort: 'createdAt:DESC'
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.$loading.active = false
      }
    },
    onSubjectSelected(subject) {
      this.setSubject(subject)
    },
    onSelected(subject) {
      this.$router.push(`./subject/${subject.id}`)
    },
    onRemove(id) {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn xóa môn này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeSubject(id)
        }
      })
    },
    exportExcel() {
      const excelHeader = this.headers.map(({ text, value }) => ({ text, value }))
      const subjects = JSON.parse(JSON.stringify(this.subjects))
      const filters = this.$options.filters
      const data = subjects.map(item => {
        item.markType = filters.getMarkType(item.markType)
        item.type = filters.getSubjectType(item.type)
        item.grade = filters.getGrade(item.grade)
        return item
      })
      utils.exportExcel(data, excelHeader, 'Subject_List')
    }
  },
  filters: {
    getGrade(grade) {
      if (!grade) return ''
      return grade.title
    },
    getSubjectType(item) {
      return item === 'coreCurriculum' ? 'Chính khoá' : 'Ngoại khoá'
    }
  }
}
</script>
