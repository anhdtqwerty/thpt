<template>
  <div class="pa-2">
    <div class="pa-4 pa-md-2 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý môn"
          :link="[{ text: 'Quản lý môn', href: '../subjects' }]"
        />
      </div>
    </div>
    <v-card class="pa-4" v-if="subject">
      <div>
        <div class="caption">Môn học</div>
        <h1 class="primary--text display-1">{{ subject.title }}</h1>
      </div>
      <v-row class="mt-1">
        <v-col>
          <table class="table">
            <tr>
              <td class="gray--text">Nhóm môn</td>
              <td>Môn chính khóa</td>
            </tr>
            <tr>
              <td class="gray--text">Khối lớp</td>
              <td v-if="subject.grade">{{ subject.grade.title }}</td>
            </tr>
            <tr>
              <td class="gray--text">Hệ số tổng kết</td>
              <td>{{ subject.multiply }}</td>
            </tr>
            <tr>
              <td class="gray--text">Ban</td>
              <td>{{ subject.divisions | getDivision }}</td>
            </tr>
          </table>
        </v-col>
        <v-col>
          <table class="table">
            <tr>
              <td class="gray--text">Loại đánh giá</td>
              <td>{{ subject.markType }}</td>
            </tr>
            <tr>
              <td class="gray--text">Số tiết / tuần</td>
              <td v-if="subject.data">
                {{ subject.data.WeeklyLesson }}
              </td>
            </tr>
            <tr>
              <td class="gray--text">Số tiết / năm</td>
              <td v-if="subject.data">{{ subject.data.anualyLesson }}</td>
            </tr>
            <tr>
              <td class="gray--text">Ghép lớp</td>
              <td>Không</td>
            </tr>
          </table>
        </v-col>
        <v-col>
          <div class="gray--text">Ghi chú</div>
          <p>{{ subject.description }}</p>
        </v-col>
      </v-row>
      <v-btn
        style="position: absolute; top: 8px; right: 8px"
        icon
        @click="state = !state"
        ><v-icon small>mdi-pencil</v-icon></v-btn
      >
    </v-card>
    <v-card class="pa-4 mt-4" v-if="subject">
      <div class="d-flex justify-space-center align-center">
        <div class="caption">Cấu Hình Điểm</div>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          depressed
          small
          @click="factorStateNewDialog = !factorStateNewDialog"
          ><v-icon>mdi-plus</v-icon> Thêm</v-btn
        >
      </div>
      <FactorTable no-data-text="Chưa có cấu hình điểm" :subject="subject" />
    </v-card>
    <SubjectEditDialog :subject="subject" :state="state" />
    <FactorNewDialog :subject="subject" :state="factorStateNewDialog" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SubjectEditDialog from '@/modules/subject/SubjectEditDialog'
import FactorNewDialog from '@/modules/factor/FactorNewDialog'
import FactorTable from '@/modules/factor/FactorTable.vue'
export default {
  components: {
    Breadcrumbs,
    SubjectEditDialog,
    FactorNewDialog,
    FactorTable
  },
  props: {
    role: String
  },
  data() {
    return {
      state: false,
      factorStateNewDialog: false,
      factorStateEditDialog: false,
      factor: {}
    }
  },

  computed: {
    ...mapState('app', ['department']),
    ...mapState('subjects', ['subject']),
    ...mapState('factor', ['factors'])
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
      this.setFactors(this.subject.factors)
    }
  },
  filters: {
    getDivision(divisions) {
      if (!divisions || !divisions.length) return ''
      return divisions.map(d => d.title).join(', ')
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
