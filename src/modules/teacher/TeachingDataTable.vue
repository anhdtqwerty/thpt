<template>
  <v-data-table
    mobile-breakpoint="0"
    item-key="id"
    :headers="headers"
    :items-per-page="10"
    :items="teachings"
    loading-text="Đang Tải"
    sort-by="name"
    :footer-props="{ 'items-per-page-text': 'Hiển thị mỗi trang' }"
  >
    <template v-slot:[`footer.page-text`]="items">
      {{ items.pageStart }} - {{ items.pageStop }} trên tổng
      {{ items.itemsLength }}
    </template>
    <template v-slot:[`item.class.title`]="{ item }">
      <router-link style="text-decoration: none" :to="'/class/' + (item.class && item.class.id)">
        <span v-if="item.class">{{ item.class && item.class.title }}</span>
      </router-link>
    </template>
    <template v-slot:[`item.teacher.name`]="{ item }">
      <CardTeacherName v-if="item.teacher" :teacher="item.teacher" link />
      <span v-else style="color: red">Chưa có giáo viên</span>
    </template>
    <template v-slot:[`item.teacher.dob`]="{ item }">
      {{ item.teacher && item.teacher.dob | ddmmyyyy }}
    </template>
    <template v-slot:[`item.teacher.gender`]="{ item }">
      <span v-if="item.teacher">{{ item | _get('teacher.gender') | gender }}</span>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn @click="$emit('edit', item)" icon><v-icon left>mdi-pencil</v-icon></v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CardTeacherName from '@/components/basic/card/CardTeacherName.vue'

const originHeaders = [
  {
    text: 'Lớp',
    value: 'class.title',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Khối',
    value: 'grade.gradeNumber',
    align: 'left',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Môn học',
    value: 'subject.title',
    align: 'left',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Giáo viên',
    value: 'teacher.name',
    align: 'left',
    sortable: true,
    show: true
  },
  {
    text: 'Ngày sinh',
    value: 'teacher.dob',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Giới tính',
    value: 'teacher.gender',
    align: 'left',
    sortable: false,
    show: true,
    width: 100
  },

  {
    align: 'right',
    text: 'Thao tác',
    value: 'action',
    sortable: false,
    show: true
  }
]

export default {
  components: {
    CardTeacherName
  },
  data() {
    return {
      headers: originHeaders
    }
  },
  computed: {
    ...mapState('teaching', ['teachings']),
    ...mapGetters('app', ['commonQuery'])
  },
  methods: {
    ...mapActions('teaching', ['searchTeaching']),
    refresh(query) {
      this.searchTeaching({ ...query, ...this.commonQuery })
    }
  },
  created() {
    this.refresh({})
  }
}
</script>
