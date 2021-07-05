<template>
  <v-data-table
    mobile-breakpoint="0"
    :options.sync="teacherTableOptions"
    :server-items-length="totalItems"
    item-key="id"
    :headers="headers"
    :items="teachers"
    :loading="isLoading"
    loading-text="Đang Tải"
    :footer-props="footerTable"
    sort-by="name"
    @input="$emit('update:selected', $event)"
  >
    <template v-slot:[`item.name`]="{ item }">
      <CardTeacherName :teacher="item" link />
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip v-if="item.status" label small class="white--text" :color="getColor(item.status)"
        ><span>{{ item.status | teacherStatus }}</span></v-chip
      >
    </template>
    <template v-slot:[`item.ownClasses`]="{ item }">
      <span>{{ item.ownClasses ? item.ownClasses.length : 0 }}</span>
    </template>
    <template v-slot:[`item.classTeaching`]="{ item }">
      <span>{{ item | getClassesTeaching(teachings) }}</span>
    </template>
    <template v-slot:[`item.subjectGroup.title`]="{ item }">
      {{ item | _get('subjectGroup.title') }}
    </template>
    <template v-slot:[`item.metadata.dob`]="{ item }">
      {{ item.metadata.dob | ddmmyyyy }}
    </template>
    <template v-slot:[`item.gender`]="{ item }">
      {{ item.gender | gender }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <TeacherListActions :teacher="item" />
    </template>
  </v-data-table>
</template>

<script>
import TeacherListActions from '@/modules/teacher/TeacherListActions'
import CardTeacherName from '@/components/basic/card/CardTeacherName.vue'
import { map } from 'lodash'
import { mapActions, mapState, mapGetters } from 'vuex'
const originHeaders = [
  {
    text: 'Giáo viên',
    value: 'name',
    align: 'left',
    sortable: true,
    show: true
  },
  {
    text: 'Ngày sinh',
    value: 'metadata.dob',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Giới tính',
    value: 'gender',
    align: 'left',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Lĩnh vực',
    value: 'subjectGroup.title',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Số lớp dạy',
    value: 'classTeaching',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Số lớp chủ nhiệm',
    value: 'ownClasses',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: '',
    value: 'action',
    sortable: false,
    show: true
  }
]

export default {
  components: {
    TeacherListActions,
    CardTeacherName
  },
  data() {
    return {
      headers: originHeaders,
      isLoading: false,
      teacherTableOptions: {},
      teachings: []
    }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('teachers', ['teachers', 'totalItems', 'pageText']),
    ...mapState('app', ['department']),
    ...mapGetters('app', ['commonQuery']),
    footerTable() {
      let footer = {
        'items-per-page-text': 'Giáo viên mỗi trang',
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
  methods: {
    ...mapActions('teachers', ['searchTeachers', 'requestPageSettings']),
    ...mapActions('teaching', ['fetchTeachings']),
    async refresh(query) {
      try {
        this.$loading.active = true
        const res = await this.fetchTeachings({ ...this.commonQuery })
        this.teachings = map(res, 'teacher.id')
        await this.searchTeachers({ ...query, department: this.department.id })
      } finally {
        this.$loading.active = false
      }
    },
    getColor(status) {
      if (status === 'active') return '#46BE8A'
      if (status === 'left') return '#D3D3D3'
      else return 'red'
    }
  },
  filters: {
    getClassesTeaching(teacher, teachings) {
      return teachings.filter(t => t === teacher.id).length
    }
  },
  watch: {
    teacherTableOptions: {
      handler(newOptions, oldOptions) {
        const itemPerPageChanged = newOptions.itemsPerPage !== oldOptions.itemsPerPage
        const pageChanged = newOptions.page !== oldOptions.page
        if (pageChanged || itemPerPageChanged) {
          this.requestPageSettings({
            page: newOptions.page,
            itemsPerPage: newOptions.itemsPerPage
          })
        }
      },
      deep: true
    }
  }
}
</script>
