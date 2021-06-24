<template>
  <v-data-table
    mobile-breakpoint="0"
    :items-per-page="10"
    item-key="generatedId"
    :headers="headers"
    :items="ownClassTeacherData"
    loading-text="Đang Tải"
    sort-by="name"
  >
    <template v-slot:[`item.title`]="{ item }">
      <router-link style="text-decoration: none" :to="'/class/' + item.id">
        {{ item.title }}
      </router-link>
    </template>
    <template v-slot:[`item.headTeacher.name`]="{ item }">
      <CardTeacherName link v-if="item.headTeacher" :teacher="item.headTeacher" />
      <span style="color:red" v-else>Chưa có giáo viên chủ nhiệm</span>
    </template>
    <template v-slot:[`item.headTeacher.dob`]="{ item }">
      <div v-if="item.headTeacher" class="align-self-center center">
        <p class="grey--text mb-0">Ngày sinh</p>
        <p>{{ item | _get('headTeacher.dob') | ddmmyyyy }}</p>
      </div>
    </template>
    <template v-slot:[`item.headTeacher.gender`]="{ item }">
      <div v-if="item.headTeacher">
        <p class="grey--text mb-0">Giới tính</p>
        <p>{{ item | _get('headTeacher.gender') | gender }}</p>
      </div>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn @click="$emit('editState', { ownClass: item, headTeacher: item.headTeacher })" icon
        ><v-icon left>mdi-pencil</v-icon></v-btn
      >
    </template>
  </v-data-table>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CardTeacherName from '@/components/basic/card/CardTeacherName.vue'

const originHeaders = [
  {
    text: 'Lớp',
    value: 'title',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Khối',
    value: 'grade.gradeNumber',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Giáo viên chủ nhiệm',
    value: 'headTeacher.name',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: '',
    value: 'headTeacher.dob',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: '',
    value: 'headTeacher.gender',
    align: 'left',
    sortable: false,
    show: true
  },

  {
    text: 'Thao tác',
    value: 'action',
    align: 'right',
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
      headers: originHeaders,
      ownClassTeachers: []
    }
  },
  computed: {
    ...mapState('ownClassTeacher', ['ownClassTeacherData']),
    ...mapGetters('app', ['commonQuery'])
  },
  methods: {
    ...mapActions('ownClassTeacher', ['searchOwnClassTeacher']),
    refresh(query) {
      this.searchOwnClassTeacher({ ...query, ...this.commonQuery })
    }
  },
  created() {
    this.refresh({})
  }
}
</script>
