<template>
  <v-flex fill-height class="pa-2">
    <div class="pa-4 pa-md-2 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          :headline="subject.title"
          :link="[
            { text: 'Nâng cao', href: '../divisions' },
            { text: 'Danh sách môn', href: '../subjects' }
          ]"
        />
      </div>
    </div>
    <v-card class="pa-4" v-if="subject">
      <v-row>
        <v-col cols="4">
          <p>môn học</p>
          <h1>{{ subject.title }}</h1>
        </v-col>
        <v-col cols="1.5">
          <p>Hệ số tổng kết</p>
          <p>{{ subject.multiply }}</p>
        </v-col>
        <v-col cols="1.5">
          <p>Đánh giá theo</p>
          <p>{{ subject.markType | getMarkType }}</p>
        </v-col>
        <v-col cols="2">
          <p>Số tiết trên tuần</p>
          <p>Tối thiểu {{ subject.data | maxWeeklyLesson }} / Tối đa {{ subject.data | minWeeklyLesson }}</p>
        </v-col>
        <v-col cols="1.5">
          <p>Ghép lớp</p>
          <p>{{ subject.data && subject.data.compoundClass | compoundClass }}</p>
        </v-col>
        <v-col cols="1.5" class="d-flex justify-end justify-content-center align-center">
          <v-btn class="ma-2 text-capitalize" outlined color="indigo" @click="detailSubject = !detailSubject"
            >Hồ sơ chi tiết</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pa-4 mt-4" v-if="subject">
      <div class="d-flex justify-space-center align-center">
        <div class="caption">Cấu Hình Điểm</div>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed small @click="addFactor = !addFactor"
          ><v-icon>mdi-plus</v-icon> Thêm đầu điểm</v-btn
        >
      </div>
      <FactorTable no-data-text="Chưa có cấu hình điểm" :subject="subject" />
    </v-card>
    <SubjectDeleteDialog :subject="subject" :state="deleteSubject" />
    <FactorNewDialog :state="addFactor" />
    <SubjectDetailDialog :state="detailSubject" @editSubjectProfile="editSubject = !editSubject" />
    <SubjectEditDialog :state="editSubject" />
    <div class="d-flex flex-column align-center mt-8">
      <v-btn outlined color="red" @click="deleteSubject = !deleteSubject">Xoá môn học</v-btn>
    </div>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SubjectEditDialog from '@/modules/subject/SubjectEditDialog'
import SubjectDetailDialog from '@/modules/subject/SubjectDetailDialog'
import SubjectDeleteDialog from '@/modules/subject/SubjectDeleteDialog'
import FactorTable from '@/modules/factor/FactorTable.vue'
import FactorNewDialog from '@/modules/factor/FactorNewDialog'
import _ from 'lodash'
export default {
  components: {
    Breadcrumbs,
    SubjectEditDialog,
    SubjectDetailDialog,
    SubjectDeleteDialog,
    FactorTable,
    FactorNewDialog
  },
  props: {
    role: String
  },
  data() {
    return {
      state: false,
      deleteSubject: false,
      addFactor: false,
      detailSubject: false,
      editSubject: false
    }
  },

  computed: {
    ...mapState('subjects', ['subject'])
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('subjects', ['fetchSubject']),
    ...mapActions('factor', ['setFactors']),
    updateDraw(draw) {
      this.draw = draw
    },
    async refresh() {
      await this.fetchSubject(this.$route.params.id)
      const factors = _.filter(this.subject.factors, f => {
        return f.semesterType === 'semester-1'
      })
      this.setFactors(factors)
    }
  },
  filters: {
    getDivision(divisions) {
      if (!divisions || !divisions.length) return ''
      return divisions.map(d => d.title).join(', ')
    },
    getMarkType(type) {
      if (type === 'mark') return 'Điểm số'
      return 'Đánh giá'
    },
    compoundClass(value) {
      return value ? 'Có' : 'Không'
    },
    minWeeklyLesson(data) {
      return _.isEmpty(data && data.minWeeklyLesson) ? 0 : data.minWeeklyLesson
    },
    maxWeeklyLesson(data) {
      return _.isEmpty(data && data.maxWeeklyLesson) ? 0 : data.maxWeeklyLesson
    }
  }
}
</script>
<style scoped>
.table .gray--text {
  margin-right: 10px;
  margin-bottom: 50px;
  color: gray;
  padding-right: 24px;
  padding-bottom: 4px;
}
</style>
