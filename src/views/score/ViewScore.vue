<template>
  <div>
    <div class="pa-4 pa-md-2 py-md-4 d-flex justify-space-between align-center">
      <Breadcrumbs
        headline="Danh sách"
        :link="[
          { text: 'Giáo viên', href: '../teachers' },
          { text: 'Danh sách' },
        ]"
      />
    </div>
    <v-card class="pa-2 pa-md-4 ma-md-2 elevation-1 mb-5">
      <v-card-text class="px-5">
        <v-row>
          <v-col cols="12">
            <v-row class="basic-filter" v-if="filterMode === 'normal'">
              <v-col cols="12" md="4">
                <autocomplete-class
                  placeholder="Chọn lớp"
                  filled
                  dense
                  @change="filterInputs.classObj = $event"
                />
              </v-col>
              <v-col cols="12" md="3">
                <autocomplete-subject
                  return-object
                  placeholder="Chọn môn học"
                  filled
                  dense
                  @change="filterInputs.subjectObj = $event"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-btn color="primary" style="width: 100%" @click="onClickSearchButton">Tìm kiếm</v-btn>
              </v-col>
            </v-row>

            <div
              class="text-right font-weight-medium"
              style="cursor: pointer"
              @click="onChangeFilterMode"
            >
              <span class="primary--text">{{
                this.filterOptions[this.filterMode].label
              }}</span>
              <v-icon color="primary">{{
                this.filterOptions[this.filterMode].icon
              }}</v-icon>
            </div>

            <v-row class="advance-filter" v-if="filterMode === 'advanced'">
              <v-col cols="12" md="4">
                <autocomplete-grade
                  placeholder="Chọn khối"
                  filled
                  dense
                  @change="filterInputs.gradeObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-class
                  placeholder="Chọn lớp"
                  filled
                  dense
                  @change="filterInputs.classObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-subject
                  return-object
                  placeholder="Chọn môn học"
                  filled
                  dense
                  @change="filterInputs.subjectObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-btn color="primary" style="width: 100%" @click="onClickSearchButton">Tìm kiếm</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="pa-2 pa-md-4 ma-md-2 elevation-1">
      <v-card-text>
        <div class="table-label primary--text mb-5">
          {{ titleTable }}
        </div>
        <template v-if="filterInputs.subjectObj">
          <div class="text-right">
            <setting-table-header
              :default-headers="originHeaders"
              @change="headers = $event"
            />
            <KebapMenu v-if="!$vuetify.breakpoint.xs">
              <v-list>
                <v-list-item>
                  <export-excel :custom-header="[]" api="/classes/" />
                </v-list-item>
              </v-list>
            </KebapMenu>
          </div>
          <table class="mark-table">
          <thead>
            <tr>
              <th rowspan="2">STT</th>
              <th rowspan="2">Học sinh</th>
              <th class="semseter-header" :colspan="semestersColSpan" v-for="semester in headers" :key="semester.id">{{ semester.text }}</th>
            </tr>
            <tr>
              <template v-for="semester in headers">
                <th v-for="factor in refrencesInfo.factors" :key="factor.id + semester.id" :colspan="factor.quantity">{{ factor.title }}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, order) in items" :key="item.studentId">
              <td>{{ order + 1 }}</td>
              <td>{{ item.fullName }}</td>
              <template v-for="semester in headers">
                <template  v-for="factor in refrencesInfo.factors" >
                  <td class="mark-td" v-for="index in factor.quantity" :key="factor.id + semester.id + index">
                    {{ getValues(filterMarkByFactorAndSemeter(semester.id)(factor.id)(item.marks)[index - 1]) }}
                  </td>
                </template>
              </template>
            </tr>
          </tbody>
        </table>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/basic/Breadcrumbs'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import ExportExcel from '@/components/basic/ExportExcel'
import KebapMenu from '@/components/basic/menu/KebapMenu.vue'
import _ from 'lodash'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import { mapState, mapActions } from 'vuex'
import { Semester, Factor } from '@/plugins/api'
export default {
  components: {
    Breadcrumbs,
    SettingTableHeader,
    KebapMenu,
    ExportExcel,
    AutocompleteClass,
    AutocompleteSubject,
    AutocompleteGrade
  },
  data() {
    return {
      filterMode: 'normal',
      filterOptions: {
        normal: {
          label: 'Tìm kiếm nâng cao',
          icon: 'mdi-chevron-down',
        },
        advanced: {
          label: 'Ẩn tìm kiếm nâng cao',
          icon: 'mdi-chevron-up',
        },
      },
      filterInputs: {
        classObj: '',
        subjectObj: '',
        studentObj: '',
        gradeObj: ''
      },
      loading: false,
      filterQuery: {},
      items: [],
      headers: [],
      refrencesInfo: {
        semesters: [],
        factors: []
      }
    }
  },
  watch: {
    filterMode() {
      this.filterInputs = {
        classObj: '',
        subjectObj: '',
        studentObj: '',
      }
    },
    marks(data) {
      this.items = this.groupBy('studentId')(
        this.generateDataTable(Object.values(data))
      )
    },
  },
  computed: {
    ...mapState('mark', ['marks']),
    titleTable () {
      const subjectTitle = _.get(this.filterInputs, 'subjectObj.title')
      const classTitle = _.get(this.filterInputs, 'classObj.title')
      return `Bảng điểm ${[subjectTitle, classTitle].filter(Boolean).join(' - ')}`
    },
    semestersColSpan () {
      const markNumber = this.refrencesInfo.factors.reduce((acc, item) => acc + item.quantity, 0)
      return markNumber
    },
    originHeaders () {
      return this.refrencesInfo.semesters.map(item => ({
        text: item.title,
        id: item.id,
        show: true,
      }))
    }
  },
  methods: {
    ...mapActions('mark', ['fetchMarks', 'updateMarks']),
    getValues (obj) {
      if (!obj) return 'Không Đạt'
      return _.get(obj, 'value') ? 'Đạt' : 'Không Đạt'
    },
    filterMarkByFactorAndSemeter: (semesterId) => (factorId) => (marks) => {
      return marks.filter(item => item.factorId === factorId && item.semesterId === semesterId)
    },
    setOrderForMark(marks) {
      return marks.map((item, index) => ({ ...item, order: index + 1 }))
    },
    groupBy: (field) => (marks) => {
      let accumulatedFactor = []
      if (marks.length > 0) {
        const groupResult = marks.reduce((acc, item) => {
          const compareField = item[field]
          if (!acc[compareField]) {
            acc[compareField] = { ...item }
          } else {
            acc[compareField].marks.push({ ...item.marks[0] })
          }
          return acc
        }, {})
        accumulatedFactor = Object.values(groupResult)
      }
      return accumulatedFactor
    },
    generateDataTable(marks) {
      return marks.map((item) => ({
        studentId: item.student.id,
        fullName: item.student.name,
        marks: [
          {
            id: item.id,
            semesterId: item.semester ? item.semester.id : undefined,
            factorId: item.factor ? item.factor.id : undefined,
            value: item.value,
          },
        ]
      }))
    },
    onChangeFilterMode() {
      if (this.filterMode === 'normal') {
        this.filterMode = 'advanced'
      } else {
        this.filterMode = 'normal'
      }
    },
    onClickSearchButton () {
      const data = this.filterInputs
      console.log(data)
      const classId = _.get(data, 'classObj.id')
      const subjectId = _.get(data, 'subjectObj.id')
      const studentId = _.get(data, 'studentObj.id')
      const gradeId = _.get(data, 'gradeObj.id')
      if (subjectId && classId) {
        this.fetchMarks({
          class: classId,
          subject: subjectId,
          student: studentId,
          grade: gradeId
        })
      }
    }
  },
  created () {
    Semester.fetch({}).then(data => {
      this.refrencesInfo.semesters = data
    })
    Factor.fetch({}).then(data => {
      this.refrencesInfo.factors = data
    })
  }
}
</script>

<style lang="scss" scoped>
  .table-label {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
  }
  .mark-table {
    width: 100%;
    td, tr, th {
      border: 1px solid #E0E0E0;
    }
    td, th {
      padding: 14px 20px;
    }
    .semseter-header {
      font-size: 20px;
      color: #0D47A1;
      text-transform: uppercase;
    }
    color: #212121;
    border-collapse: collapse;
  }
</style>
