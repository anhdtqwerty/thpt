<template>
  <div>
    <div class="pa-4 pa-md-2 d-flex justify-space-between align-center">
      <Breadcrumbs
        headline="Sổ điểm"
        :link="[
          { text: 'Điểm số' },
          { text: 'Sổ điểm', href: '/marks' },
        ]"
      />
    </div>
    <v-card  class="px-2 px-md-4 mx-md-2 elevation-1 mb-2">
      <v-card-text class="px-2">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row class="basic-filter" v-if="filterMode === 'normal'">
              <v-col cols="12" md="4">
                <autocomplete-class
                  placeholder="Chọn lớp"
                  filled
                  dense
                  hide-details
                  @change="filterInputs.classObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-subject
                  return-object
                  placeholder="Chọn môn học"
                  filled
                  dense
                  hide-details
                  @change="filterInputs.subjectObj = $event"
                />
              </v-col>
              <v-col cols="0" md="2" class="pa-0 ma-0"></v-col>
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
                  hide-details
                  @change="filterInputs.gradeObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-class
                  placeholder="Chọn lớp"
                  filled
                  dense
                  hide-details
                  @change="filterInputs.classObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-subject
                  return-object
                  placeholder="Chọn môn học"
                  filled
                  dense
                  hide-details
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
            <drop-menu
              :default-headers="originHeaders"
              @change="headers = $event"
              v-if="$vuetify.breakpoint.mdAndUp"
            ></drop-menu>
          </div>
          <div class="table-container">
            <table class="mark-table">
              <thead>
                <tr>
                  <th rowspan="2">STT</th>
                  <th rowspan="2">Học sinh</th>
                  <th class="semseter-header" :rowspan="semester.rowspan" :colspan="semester.expand" v-for="semester in headers" :key="semester.id">{{ semester.text }}</th>
                </tr>
                <tr>
                  <template v-for="semester in headers">
                    <template v-if="semester.type !== 'year'">
                      <th v-for="factor in refrencesInfo.factors" :key="factor.id + semester.id" :colspan="factor.quantity">{{ factor.title }}</th>
                    </template>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, order) in items" :key="item.studentId">
                  <td>{{ order + 1 }}</td>
                  <td>{{ item.fullName }}</td>
                  <template v-for="(semester, indexSemester) in headers">
                    <template v-if="semester.type !== 'year'">
                      <template v-for="(factor, indexFactor) in refrencesInfo.factors" >
                        <td class="mark-td" v-for="index in factor.quantity" :key="`${indexFactor}-${indexSemester}-${index}`">
                          {{
                            filterInputs.subjectObj.markType === 'evaluate'
                            ? getEvaluateMark(filterMarkByFactorAndSemeter(semester.type)(factor.id)(item.marks)[index - 1])
                            : getMark(filterMarkByFactorAndSemeter(semester.type)(factor.id)(item.marks)[index - 1])
                          }}
                        </td>
                      </template>
                    </template>
                    <template v-else>
                      <td class="mark-td" :key="`${indexSemester}`">
                          {{
                            getMark(filterMarkByFactorAndSemeter('year')('avgYear')(item.marks))
                          }}
                        </td>
                    </template>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import DropMenu from '@/modules/student/menu/Menu.vue'
import _ from 'lodash'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import { mapState, mapActions } from 'vuex'
import { Semester, Factor } from '@/plugins/api'
import {
  mapPropObj,
  evaluateAvgMark,
  toggle,
  getMultiplePath,
  pipe,
  trace
} from './helpers'
import scoreMixin from './mixins'

const CONSTANTS = {
  MARK_PASS: 'Đạt',
  MARK_FAIL: 'Không Đạt',
  FILTER_MODE_NORMAL: 'normal',
  FILTER_MODE_ADVANCED: 'advanced',
  SEMESTER_1: 'semester-1',
  SEMESTER_2: 'semester-2',
  SEMESTER_YEAR: 'year',
  FACTOR_YEAR_ID: 'avgYear',
  MULTIPLIER_1: 1,
  MULTIPLIER_2: 2
}
const transformSemestersToHeader = item => ({
  text: _.get(item, 'title'),
  id: _.get(item, 'id'),
  type: _.get(item, 'type'),
  show: true,
})

const transformMarksToTableRecord = item => ({
  studentId: _.get(item, 'student.id'),
  fullName: _.get(item, 'student.name'),
  mark: {
    id: _.get(item, 'id'),
    semesterId: _.get(item, 'semester.id'),
    semesterType: _.get(item, 'semester.type'),
    factorId: _.get(item, 'factor.id'),
    multiply: _.get(item, 'factor.multiply', 1),
    value: _.get(item, 'value'),
  }
})

const accumulateMark = marks => {
  return marks.reduce((acc, item) => {
    const { mark, ...info } = item
    return { ...info, marks: [...acc.marks, mark] }
  }, { marks: [] })
}

const filterMarkSemester = semesterType => marks => {
  return marks.filter(mark => mark.semesterType === semesterType)
}

const computeAvgMarkSemester = semesterType => pipe(
  filterMarkSemester(semesterType),
  evaluateAvgMark
)
const computeAvgMarkSemester1 = computeAvgMarkSemester(CONSTANTS.SEMESTER_1)
const computeAvgMarkSemester2 = computeAvgMarkSemester(CONSTANTS.SEMESTER_2)

const computedAvgMarkForEachStudent = ({ marks, ...info }) => {
  const avgSemester1 = computeAvgMarkSemester1(marks)
  const avgSemester2 = computeAvgMarkSemester2(marks)
  const avgYear = CONSTANTS.MULTIPLIER_1 * avgSemester1 + CONSTANTS.MULTIPLIER_2 * avgSemester2
  const yearMarkObj = {
    semesterType: CONSTANTS.SEMESTER_YEAR,
    factorId: CONSTANTS.FACTOR_YEAR_ID,
    value: avgYear
  }
  return {
    ...info,
    marks: [ ...marks, yearMarkObj ]
  }
}

const formatMarks = marks => marks.map(transformMarksToTableRecord)
const groupMarkByStudentId = marks => _.groupBy(marks, 'studentId')
const reduceMarkByStudent = marksByStudentObj => mapPropObj(marksByStudentObj)(accumulateMark)
const computeAvgMark = marksByStudentObj => mapPropObj(marksByStudentObj)(computedAvgMarkForEachStudent)

const handleMarkFlow = pipe(
  formatMarks,
  groupMarkByStudentId,
  reduceMarkByStudent,
  computeAvgMark
)

export default {
  components: {
    Breadcrumbs,
    DropMenu,
    AutocompleteClass,
    AutocompleteSubject,
    AutocompleteGrade
  },
  mixins: [ scoreMixin ],
  data() {
    return {
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
      originHeaders: [],
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
      const marks = Object.values(data)
      this.items = Object.values(handleMarkFlow(marks))
    },
    refrencesInfo: {
      handler ({ factors, semesters }) {
        const markNumber = factors.reduce((acc, item) => acc + Number(item.quantity), 0)
        this.originHeaders = semesters.map(transformSemestersToHeader).map(item => ({ ...item, expand: markNumber }))
        this.originHeaders.push({
          text: 'Cả năm',
          id: Date.now(),
          expand: 1,
          show: true,
          type: 'year',
          rowspan: 2
        })
        this.headers = this.originHeaders.map(x => x)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapState('mark', ['marks']),
    titleTable () {
      const subjectTitle = _.get(this.filterInputs, 'subjectObj.title')
      const classTitle = _.get(this.filterInputs, 'classObj.title')
      return `Bảng điểm ${[subjectTitle, classTitle].filter(Boolean).join(' - ')}`
    }
  },
  methods: {
    ...mapActions('mark', ['fetchMarks', 'updateMarks']),
    getEvaluateMark (obj) {
      if (!obj) return CONSTANTS.MARK_FAIL
      return _.get(obj, 'value') ? CONSTANTS.MARK_PASS : CONSTANTS.MARK_FAIL
    },
    getMark (obj) {
      return _.get(obj, 'value', 0)
    },
    filterMarkByFactorAndSemeter: (semesterType) => (factorId) => (marks) => {
      return marks.filter(item => item.factorId === factorId && item.semesterType === semesterType)
    },
    onChangeFilterMode() {
      this.filterMode = toggle(CONSTANTS.FILTER_MODE_NORMAL, CONSTANTS.FILTER_MODE_ADVANCED)(this.filterMode)
    },
    onClickSearchButton () {
      const [
        classId,
        subjectId,
        studentId,
        gradeId
      ] = getMultiplePath([
        'classObj.id',
        'subjectObj.id',
        'studentObj.id',
        'gradeObj.id'
      ])(this.filterInputs)

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
    Promise.all([
      Semester.fetch({}),
      Factor.fetch({})
    ])
      .then(([semesters, factors]) => {
        this.refrencesInfo.semesters = semesters
        this.refrencesInfo.factors = factors
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
  .table-container {
    overflow: auto;
    max-width: 100%;
  }
</style>
