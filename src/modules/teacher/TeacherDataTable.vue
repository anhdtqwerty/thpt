<template>
  <v-data-table
    mobile-breakpoint="0"
    :items-per-page="10"
    item-key="id"
    :headers="headers"
    :items="teachers"
    :loading="isLoading"
    loading-text="Đang Tải"
    sort-by="name"
    :footer-props="{
      'items-per-page-text': 'Giáo viên mỗi trang',
      'items-per-page-all-text': 'Tất cả',
    }"
  >
    <template v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        items-per-page-text="Giáo viên mỗi trang"
        items-per-page-all-text="Tất cả"
      />
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <user-item :teacher="item" :to="'teacher/' + item.id"></user-item>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        small
        class="white--text"
        v-if="item.status"
        :color="getColor(item.status)"
        label
      >
        {{ item.status | getStatus }}
      </v-chip>
    </template>
    <template v-slot:[`item.metadata.type`]="{ item }">
      <span v-if="item.metadata.type">
        {{
          item.metadata.type === 'long-tern'
            ? 'Dài hạn'
            : item.metadata.type === 'short-tern'
            ? 'Ngắn hạn'
            : ''
        }}
      </span>
    </template>
    <template v-slot:[`item.subject`]="{ item }">
      <span v-if="item.subject">{{
        item.subject[item.subject.length - 1]
      }}</span>
    </template>
    <template v-slot:[`item.metadata.dob`]="{ item }">
      {{ formatDate(item.metadata.dob) }}
    </template>
    <template v-slot:[`item.gender`]="{ item }">
      {{ item.gender | getGender }}
    </template>
    <template v-slot:[`item.classes`]="{ item }">
      {{ classesCount(item.classes) }}
    </template>
    <template v-slot:[`item.ownedClasses`]="{ item }">
      {{ classesCount(item.ownedClasses) }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <teacher-list-actions :item="item"></teacher-list-actions>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'
import { get } from 'lodash'
import UserItem from '@/components/basic/card/CardTeacherName.vue'
import TeacherListActions from '@/modules/teacher/TeacherListActions'

const originHeaders = [
  {
    text: 'Giáo viên',
    value: 'name',
    align: 'left',
    sortable: true,
  },
  {
    text: 'Ngày sinh',
    value: 'metadata.dob',
    align: 'left',
    sortable: false,
    width: 100,
  },
  {
    text: 'Giới tính',
    value: 'gender',
    align: 'left',
    sortable: false,
    width: 100,
  },
  {
    text: 'Loại cán bộ',
    value: 'metadata.type',
    align: 'left',
    sortable: false,
    width: 100,
  },
  {
    text: 'Lĩnh vực',
    value: 'subject',
    align: 'left',
    sortable: false,
    width: 100,
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    width: 100,
  },
  {
    text: 'Số lớp dạy',
    value: 'classes',
    align: 'center',
    sortable: false,
    width: 100,
  },
  {
    text: 'Số lớp chủ nhiệm',
    value: 'ownedClasses',
    align: 'center',
    sortable: false,
    width: 150,
  },
  {
    value: 'action',
    align: 'center',
    sortable: false,
  },
]

export default {
  components: {
    UserItem,
    TeacherListActions,
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
    }
  },
  created() {
    this.fetchTeachers({ department: this.department.id })
  },
  computed: {
    ...mapGetters('teacher', ['teachers', 'teacher']),
    ...mapState('app', ['department']),
  },
  methods: {
    ...mapActions('teacher', ['fetchTeachers', 'setTeachers']),
    getColor(status) {
      if (status === 'active') return '#46BE8A'
      if (status === 'block') return '#D3D3D3'
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    refresh(query) {
      this.fetchTeachers({ ...query, department: this.department.id })
    },
    classesCount(classes) {
      return get(classes, classes.length, '- -')
    },
  },
  filters: {
    getGender(gender) {
      if (gender === 'male') {
        return 'Nam'
      } else if (gender === 'female') {
        return 'Nữ'
      }
    },
    getStatus(status) {
      switch (status) {
        case 'active':
          return 'Đang dạy'
        case 'block':
          return 'Đã nghỉ'
        default:
          return ''
      }
    },
  },
}
</script>

<style>
</style>
