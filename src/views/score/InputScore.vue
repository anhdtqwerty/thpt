<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <Breadcrumbs
        headline="Nhập điểm"
        :link="[
          { text: 'Điểm số', href: '/marks' },
          { text: 'Nhập điểm', href: '/marks-input' }
        ]"
      />
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1 mb-2">
      <v-card-text class="px-2">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row class="basic-filter" v-if="filterMode === 'normal'">
              <v-col cols="12" md="3">
                <autocomplete-class
                  placeholder="Chọn lớp"
                  outlined
                  dense
                  @change="filterInputs.classObj = $event"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="3">
                <autocomplete-subject
                  return-object
                  placeholder="Chọn môn học"
                  outlined
                  dense
                  hide-details
                  @change="filterInputs.subjectObj = $event"
                />
              </v-col>
              <v-col cols="12" md="3">
                <autocomplete-factor
                  placeholder="Chọn đầu điểm"
                  outlined
                  dense
                  hide-details
                  @change="filterInputs.factorObj = $event"
                />
              </v-col>
              <v-col cols="0" md="1" class="pa-0 ma-0"></v-col>
              <v-col cols="12" md="2">
                <v-btn color="primary" depressed style="width: 100%" @click="onClickSearch">Tìm kiếm</v-btn>
              </v-col>
            </v-row>

            <div class="text-right font-weight-medium" style="cursor: pointer" @click="onChangeFilterMode">
              <span class="primary--text">{{ this.filterOptions[this.filterMode].label }}</span>
              <v-icon color="primary">{{ this.filterOptions[this.filterMode].icon }}</v-icon>
            </div>

            <v-row class="advance-filter" v-if="filterMode === 'advanced'">
              <v-col cols="12" md="4">
                <autocomplete-semeter
                  placeholder="Chọn học kỳ"
                  outlined
                  dense
                  hide-details
                  @change="filterInputs.semesterObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-class
                  placeholder="Chọn lớp"
                  outlined
                  dense
                  hide-details
                  @change="filterInputs.classObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-subject
                  return-object
                  placeholder="Chọn môn học"
                  outlined
                  dense
                  hide-details
                  @change="filterInputs.subjectObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <autocomplete-factor
                  placeholder="Chọn đầu điểm"
                  outlined
                  dense
                  hide-details
                  @change="filterInputs.factorObj = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-btn color="primary" style="width: 100%" @click="onClickSearch">Tìm kiếm</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="px-md-6 mx-md-4 elevation-1 mb-2">
      <v-card-text>
        <template v-if="filterInputs.subjectObj && filterInputs.classObj && filterInputs.factorObj">
          <div class="table-label primary--text mb-3">
            <div>
              <div class="mb-5">
                {{ titleTable }}
              </div>
              <div>
                <autocomplete-student
                  style="max-width: 275px"
                  placeholder="Chọn học sinh"
                  outlined
                  dense
                  @change="filterInputs.studentObj = $event"
                />
              </div>
            </div>
            <div>
              <v-btn color="success" @click="onClickSaveButton">Lưu</v-btn>
            </div>
          </div>
          <v-data-table :headers="originHeaders" :items="items" :loading="loading">
            <template v-if="filterInputs.subjectObj.markType === 'evaluate'" v-slot:item.mark="{ item }">
              <v-select
                class="mark-input"
                v-for="mark in item.marks"
                :key="mark.id"
                :items="[
                  { text: 'Đạt', value: 1 },
                  { text: 'Không đạt', value: 0 }
                ]"
                :value="mark.value"
                @change="event => onInputMark(item.studentId, mark.id, event)"
                hide-details
                outlined
                dense
              ></v-select>
            </template>
            <template v-else v-slot:item.mark="{ item }">
              <v-text-field
                class="mark-input"
                v-for="mark in item.marks"
                :key="mark.id"
                :value="mark.value"
                hide-details
                outlined
                dense
                @input="event => onInputMark(item.studentId, mark.id, event)"
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
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { get, groupBy } from 'lodash'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteFactor from '@/components/basic/input/AutocompleteFactor'
import AutocompleteSemeter from '@/components/basic/input/AutocompleteSemester'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent'
import { mapState, mapActions } from 'vuex'
import { mapPropObj, accumulateMark } from './helpers'
import scoreMixin from './mixins'
export default {
  components: {
    Breadcrumbs,
    AutocompleteClass,
    AutocompleteSubject,
    AutocompleteFactor,
    AutocompleteSemeter,
    AutocompleteStudent
  },
  mixins: [scoreMixin],
  data() {
    return {
      filterInputs: {
        classObj: '',
        subjectObj: '',
        factorObj: '',
        semesterObj: '',
        studentObj: ''
      },
      originHeaders: [
        {
          text: 'STT',
          value: 'order',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Họ và tên',
          value: 'fullName',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Ngày sinh',
          value: 'dateOfBirth',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: '',
          value: 'mark',
          align: 'left',
          sortable: false,
          show: true
        }
      ],
      totalClass: 0,
      options: {},
      loading: false,
      filterQuery: {},
      items: []
    }
  },
  watch: {
    filterMode() {
      this.filterInputs = {
        classObj: '',
        subjectObj: '',
        factorObj: '',
        semesterObj: '',
        studentObj: ''
      }
    },
    marks(data) {
      const groupedMark = groupBy(this.generateDataTable(Object.values(data)), 'studentId')
      const accumulatedMark = mapPropObj(groupedMark)(accumulateMark)
      this.items = Object.values(accumulatedMark)
    }
  },
  computed: {
    ...mapState('mark', ['marks']),
    titleTable() {
      const subjectTitle = get(this.filterInputs, 'subjectObj.title')
      const classTitle = get(this.filterInputs, 'classObj.title')
      const factorTitle = get(this.filterInputs, 'factorObj.title')
      return `Nhập điểm ${[subjectTitle, classTitle, factorTitle].filter(Boolean).join(' - ')}`
    }
  },
  methods: {
    ...mapActions('mark', ['fetchMarks', 'updateMarks']),
    setOrderForMark(marks) {
      return marks.map((item, index) => ({ ...item, order: index + 1 }))
    },
    generateDataTable(marks) {
      return marks.map(item => ({
        tag: 'origin',
        order: item.order,
        factorId: item.factor ? item.factor.id : undefined,
        studentId: item.student.id,
        fullName: item.student.name,
        dateOfBirth: item.student.dob,
        mark: {
          id: item.id,
          value: item.value
        }
      }))
    },
    findAndUpdate: arr => key => value => fn => {
      return arr.map(item => (item[key] === value ? fn(item) : item))
    },
    updateMark(studentId, markId, mark) {
      return marks => {
        return this.findAndUpdate(marks)('studentId')(studentId)(item => {
          return {
            ...item,
            tag: 'updated',
            marks: this.findAndUpdate(item.marks)('id')(markId)(m => ({
              ...m,
              tag: 'updated',
              value: mark
            }))
          }
        })
      }
    },
    onInputMark(studentId, markId, mark) {
      this.items = this.updateMark(studentId, markId, mark)(this.items)
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
        .filter(item => item.tag === 'updated')
        .flatMap(item => item.marks)
        .filter(item => item.tag === 'updated')
        .map(({ id, value }) => ({
          ...this.marks[id],
          value
        }))
      this.updateMarks(updatedMarks)
    },
    onClickSearch() {
      const data = this.filterInputs
      const classId = get(data, 'classObj.id')
      const subjectId = get(data, 'subjectObj.id')
      const factorId = get(data, 'factorObj.id')
      const factorTitle = get(data, 'factorObj.title')
      const semesterId = get(data, 'semesterObj.id')
      const studentId = get(data, 'studentObj.id')

      this.originHeaders = this.originHeaders.map((item, index) => {
        if (index === 3) {
          item.text = factorTitle
        }
        return item
      })
      this.fetchMarks({
        class: classId,
        subject: subjectId,
        factor: factorId,
        semester: semesterId,
        student: studentId
      })
    }
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
.mark-input {
  display: inline-block;
  max-width: 150px;
  margin-right: 10px;
}
</style>
