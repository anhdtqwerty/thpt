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
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="success">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn @click="createSubject = !createSubject" dark color="primary">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <SubjectNewDialog :state="createSubject" />

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table :headers="headers" :items="subjects" @click:row="onSelected">
        <div slot="top" class="py-md-6">
          <SubjectFilter @onFilterChanged="refresh" />
        </div>
        <template v-slot:item.grade="{ item }">
          {{ item.grade | getGrade }}
        </template>
        <template v-slot:item.divisions="{ item }">
          {{ item.divisions | getDivision }}
        </template>
        <template v-slot:item.markType="{ item }">
          {{ item.markType | getMarkType }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import DropMenu from '@/modules/student/menu/Menu.vue'
import SubjectNewDialog from '@/modules/subject/SubjectNewDialog'
import SubjectFilter from '@/modules/subject/SubjectFilter.vue'

export default {
  components: {
    SubjectNewDialog,
    Breadcrumbs,
    DropMenu,
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
          text: 'Tên môn',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true
        },
        { text: 'Nhóm môn học', value: 'type', show: true },
        { text: 'Khối', value: 'grade', show: true },
        { text: 'Phân ban', value: 'divisions', show: true },
        {
          text: 'Hệ số tổng kết',
          value: 'multiply',
          show: true,
          align: 'center'
        },
        { text: 'Loại đánh giá', value: 'markType', show: true },
        {
          text: 'Số tiết/tuần',
          value: 'data.weeklyLesson',
          show: true,
          align: 'center'
        }
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
      this.loading = true
      try {
        await this.fetchSubjects({
          ...query,
          _limit: 9999,
          _sort: 'createdAt:DESC'
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
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
    }
  },
  filters: {
    getDivision(divisions) {
      if (!divisions || !divisions.length) return ''
      return divisions.map(d => d.title).join(', ')
    },
    getGrade(grade) {
      if (!grade) return ''
      return grade.title
    },
    getMarkType(markType) {
      if (markType === 'mark') {
        return 'Điểm số'
      }
      if (markType === 'evaluate') {
        return 'Đánh giá'
      }
      return ''
    }
  }
}
</script>
