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
                        {{
                          filterInputs.subjectObj.markType === 'evaluate' 
                          ? getEvaluateMark(filterMarkByFactorAndSemeter(semester.id)(factor.id)(item.marks)[index - 1])
                          : getMark(filterMarkByFactorAndSemeter(semester.id)(factor.id)(item.marks)[index - 1])
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
  accumulateMark
} from './helpers'
import scoreMixin from './mixins'

const transformSemestersToHeader = item => ({
  text: _.get(item, 'title'),
  id: _.get(item, 'id'),
  show: true,
})

const transformMarksToTableRecord = item => ({
  studentId: _.get(item, 'student.id'),
  fullName: _.get(item, 'student.name'),
  mark: {
    id: _.get(item, 'id'),
    semesterId: _.get(item, 'semester.id'),
    factorId: _.get(item, 'factor.id'),
    multiply: _.get(item, 'factor.multiply', 1),
    value: _.get(item, 'value'),
  }
})

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
      const groupedMark = _.groupBy(this.generateDataTable(Object.values(data)), 'studentId')
      const accumulatedMark = mapPropObj(groupedMark)(accumulateMark)
      this.items = Object.values(accumulatedMark)
    },
    'refrencesInfo.semesters': {
      handler (val) {
        this.originHeaders = val.map(transformSemestersToHeader)
        this.headers = val.map(transformSemestersToHeader)
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('mark', ['marks']),
    titleTable () {
      const subjectTitle = _.get(this.filterInputs, 'subjectObj.title')
      const classTitle = _.get(this.filterInputs, 'classObj.title')
      return `Bảng điểm ${[subjectTitle, classTitle].filter(Boolean).join(' - ')}`
    },
    semestersColSpan () {
      const markNumber = this.refrencesInfo.factors.reduce((acc, item) => acc + Number(item.quantity), 0)
      return markNumber
    }
  },
  methods: {
    ...mapActions('mark', ['fetchMarks', 'updateMarks']),
    getEvaluateMark (obj) {
      if (!obj) return 'Không Đạt'
      return _.get(obj, 'value') ? 'Đạt' : 'Không Đạt'
    },
    getMark (obj) {
      return _.get(obj, 'value', 0)
    },
    filterMarkByFactorAndSemeter: (semesterId) => (factorId) => (marks) => {
      return marks.filter(item => item.factorId === factorId && item.semesterId === semesterId)
    },
    setOrderForMark(marks) {
      return marks.map((item, index) => ({ ...item, order: index + 1 }))
    },
    generateDataTable(marks) {
      return marks.map(transformMarksToTableRecord)
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
