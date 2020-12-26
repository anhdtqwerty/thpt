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
        <div class="text-right">
          <setting-table-header
            :default-headers="originHeaders"
            @change="headers = $event"
          />
          <KebapMenu v-if="!$vuetify.breakpoint.xs">
            <v-list>
              <v-list-item>
                <export-excel :custom-header="headers" api="/classes/" />
              </v-list-item>
            </v-list>
          </KebapMenu>
        </div>
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
              <v-col cols="12" md="3">
                <autocomplete-factor
                  placeholder="Chọn đầu điểm"
                  filled
                  dense
                  @change="filterInputs.factorObj = $event"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-btn color="primary" style="width: 100%">Tìm kiếm</v-btn>
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
                <autocomplete-semeter
                  placeholder="Chọn học kỳ"
                  filled
                  dense
                  @change="filterInputs.semesterObj = $event"
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
                <autocomplete-factor
                  placeholder="Chọn đầu điểm"
                  filled
                  dense
                  @change="filterInputs.factorObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-btn color="primary" style="width: 100%">Tìm kiếm</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="pa-2 pa-md-4 ma-md-2 elevation-1">
      <v-card-text>
        <template v-if="filterInputs.subjectObj">
          <div class="table-label primary--text mb-3">
            <div>
              <div class="mb-5">
                Nhập điểm {{ filterInputs.subjectObj.title }} -
                {{ filterInputs.classObj.title }} -
                {{ filterInputs.factorObj.title }}
              </div>
              <div>
                <autocomplete-student
                  placeholder="Chọn học sinh"
                  filled
                  dense
                  @change="filterInputs.studentObj = $event"
                />
              </div>
            </div>
            <div>
              <v-btn color="success" @click="onClickSaveButton">Lưu</v-btn>
            </div>
          </div>
          <v-data-table :headers="headers" :items="items" :loading="loading">
            <template v-slot:item.mark="{ item }">
              <input
                v-for="mark in item.marks"
                :key="mark.id"
                class="custom-input"
                type="text"
                :value="mark.value"
                @input="
                  (event) =>
                    onInputMark(item.studentId, mark.id, event.target.value)
                "
              />
            </template>
          </v-data-table>
        </template>
        <template v-else>
          <div class="table-label primary--text mb-3">Nhập điểm môn học</div>
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
import AutocompleteFactor from '@/components/basic/input/AutocompleteFactor'
import AutocompleteSemeter from '@/components/basic/input/AutocompleteSemester'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Breadcrumbs,
    SettingTableHeader,
    KebapMenu,
    ExportExcel,
    AutocompleteClass,
    AutocompleteSubject,
    AutocompleteFactor,
    AutocompleteSemeter,
    AutocompleteStudent,
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
        factorObj: '',
        semesterObj: '',
        studentObj: '',
      },
      originHeaders: [
        {
          text: 'STT',
          value: 'order',
          align: 'left',
          sortable: false,
          show: true,
        },
        {
          text: 'Họ và tên',
          value: 'fullName',
          align: 'left',
          sortable: false,
          show: true,
        },
        {
          text: 'Ngày sinh',
          value: 'dateOfBirth',
          align: 'left',
          sortable: false,
          show: true,
        },
        {
          text: 'Điểm miệng',
          value: 'mark',
          align: 'left',
          sortable: false,
          show: true,
        },
      ],
      headers: [],
      totalClass: 0,
      options: {},
      loading: false,
      filterQuery: {},
      items: [],
    }
  },
  watch: {
    filterMode() {
      this.filterInputs = {
        classObj: '',
        subjectObj: '',
        factorObj: '',
        semesterObj: '',
        studentObj: '',
      }
    },
    filterInputs: {
      handler(data) {
        const classId = _.get(data, 'classObj.id')
        const subjectId = _.get(data, 'subjectObj.id')
        const factorId = _.get(data, 'factorObj.id')
        const semesterId = _.get(data, 'semesterObj.id')
        const studentId = _.get(data, 'studentObj.id')
        console.log({
          class: classId,
          subject: subjectId,
          factor: factorId,
          semester: semesterId,
          student: studentId
        })
        if (subjectId && classId && factorId) {
          this.fetchMarks({
            class: classId,
            subject: subjectId,
            factor: factorId,
            semester: semesterId,
            student: studentId,
          })
        }
      },
      deep: true,
    },
    marks(data) {
      this.items = this.groupBy('studentId')(
        this.generateDataTable(this.setOrderForMark(Object.values(data)))
      )
    },
  },
  computed: {
    ...mapState('mark', ['marks']),
  },
  methods: {
    ...mapActions('mark', ['fetchMarks', 'updateMarks']),
    setOrderForMark(marks) {
      return marks.map((item, index) => ({ ...item, order: index + 1 }))
    },
    generateDataTable(marks) {
      return marks.map((item) => ({
        tag: 'origin',
        order: item.order,
        factorId: item.factor ? item.factor.id : undefined,
        studentId: item.student.id,
        fullName: item.student.name,
        dateOfBirth: item.student.dob,
        marks: [
          {
            id: item.id,
            value: item.value,
          },
        ],
      }))
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
    findAndUpdate: (arr) => (key) => (value) => (fn) => {
      return arr.map((item) => (item[key] === value ? fn(item) : item))
    },
    updateMark(studentId, markId, mark) {
      return (marks) => {
        return this.findAndUpdate(marks)('studentId')(studentId)((item) => {
          return {
            ...item,
            tag: 'updated',
            marks: this.findAndUpdate(item.marks)('id')(markId)((m) => ({
              ...m,
              tag: 'updated',
              value: mark,
            })),
          }
        })
      }
    },
    onInputMark(studentId, markId, mark) {
      this.items = this.updateMark(studentId, markId, Number(mark))(this.items)
    },
    onChangeFilterMode() {
      if (this.filterMode === 'normal') {
        this.filterMode = 'advanced'
      } else {
        this.filterMode = 'normal'
      }
    },
    onClickSaveButton() {
      const updatedMarks = this.items
        .filter((item) => item.tag === 'updated')
        .flatMap((item) => item.marks)
        .filter((item) => item.tag === 'updated')
        .map(({ id, value }) => ({
          ...this.marks[id],
          value,
        }))
      this.updateMarks(updatedMarks)
    },
  },
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
  .custom-input {
    max-width: 80px;
    margin-right: 10px !important;
    text-align: right;
    padding: 8px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
  }
</style>