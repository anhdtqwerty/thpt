<template>
  <v-form ref="form" flat class="pt-5">
    <div class="d-flex">
      <AutocompleteGrade
        return-object
        v-model="grade"
        item-text="title"
        item-value="id"
        label="Khối"
        class="required col-md-6 mr-4"
        :rules="[$rules.required]"
        required
        dense
        outlined
        auto-select-first
        @change="gradeChanged"
      />
      <AutocompleteDivision
        v-model="division"
        item-text="title"
        item-value="id"
        label="Ban"
        class="required col-md-6"
        clear-icon="mdi-close"
        :rules="[$rules.required]"
        outlined
        required
        dense
        deletable-chips
        hide-details
        :filter="filterByGrade"
      />
    </div>
    <div class="d-flex">
      <AutocompleteSubjectType
        v-model="type"
        item-text="title"
        item-value="id"
        label="Bộ môn"
        class="required col-md-6 mr-4"
        :rules="[$rules.required]"
        required
        deletable-chips
        dense
        hide-details
        outlined
        :filter="filterByGrade"
      />
      <v-text-field
        label="Tên môn học"
        class="required col-md-6"
        :rules="[$rules.required]"
        v-model="title"
        dense
        outlined
        required
      ></v-text-field>
    </div>
    <div class="d-flex">
      <AutocompleteSubjectGroup
        :defaultSubjectGroups="defaultSubjectGroups"
        v-model="subjectGroup"
        item-text="title"
        item-value="id"
        label="Nhóm môn học"
        class="required col-md-6 mr-4"
        :rules="[$rules.required]"
        required
        dense
        outlined
      />
      <v-text-field
        label="Hệ số tổng kết"
        class="required col-md-6"
        :rules="[$rules.required]"
        v-model="multiply"
        dense
        outlined
        required
        type="number"
      ></v-text-field>
    </div>
    <div class="d-flex">
      <v-text-field
        label="Số tiết tối thiểu trên tuần"
        class="required col-md-6 mr-4"
        :rules="[$rules.required]"
        v-model="minWeeklyLesson"
        dense
        outlined
        required
        type="number"
      ></v-text-field>
      <v-text-field
        label="Số tiết tối đa trên tuần"
        class="required col-md-6"
        :rules="[$rules.required]"
        v-model="maxWeeklyLesson"
        dense
        outlined
        required
        type="number"
      ></v-text-field>
    </div>
    <v-row>
      <v-col cols="6" class="pa-0">
        <v-text-field
          label="Số tiết trên năm"
          class="required pl-3 pr-2 mt-2"
          :rules="[$rules.required]"
          v-model="weeklyLesson"
          dense
          outlined
          required
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-radio-group row class="shrink mt-0" mandatory v-model="markType">
      <v-radio label="Đánh giá bằng cho điểm" hide-details value="mark"></v-radio>
      <v-radio label="Đánh giá bằng nhận xét" hide-details value="evaluate"></v-radio>
    </v-radio-group>
    <v-radio-group row class="shrink mt-0" mandatory v-model="compoundClass">
      <v-radio label="Có học ghép lớp" hide-details :value="true"></v-radio>
      <v-radio label="Không học ghép lớp" hide-details :value="false"></v-radio>
    </v-radio-group>
  </v-form>
</template>
<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
import AutocompleteSubjectGroup from '@/components/basic/input/AutocompleteSubjectGroup'
import AutocompleteSubjectType from '@/components/basic/input/AutocompleteSubjectType'
import { textHelpers } from '@/helpers/TextHelper.js'
import { get } from 'lodash'
const defaultSubjectGroups = [
  { id: '1', title: 'Chính khoá' },
  { id: '2', title: 'Ngoại khoá' }
]
export default {
  components: {
    AutocompleteDivision,
    AutocompleteGrade,
    AutocompleteSubjectGroup,
    AutocompleteSubjectType
  },
  props: {
    state: Boolean
  },
  data() {
    return {
      title: '',
      grade: '',
      markType: 'mark',
      multiply: '',
      division: '',
      type: '',
      weeklyLesson: '',
      minWeeklyLesson: '',
      maxWeeklyLesson: '',
      compoundClass: true,
      subjectGroup: '',
      defaultSubjectGroups: defaultSubjectGroups
    }
  },
  methods: {
    getData() {
      if (this.$refs.form.validate()) {
        return {
          title: textHelpers.removeSpaces(this.title),
          type: this.type,
          markType: this.markType,
          multiply: this.multiply,
          grade: this.grade,
          division: this.division,
          group_subject: this.subjectGroups,
          data: {
            weeklyLesson: this.weeklyLesson,
            minWeeklyLesson: this.minWeeklyLesson,
            maxWeeklyLesson: this.maxWeeklyLesson,
            compoundClass: this.compoundClass
          }
        }
      }
      return null
    },
    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.division = null
        this.type = null
      }
      this.grade = grade
    }
  },
  computed: {
    filterByGrade() {
      return { academicLevel: get(this.grade, 'academicLevel') }
    }
  },
  watch: {
    state(state) {
      if (!state) {
        this.$refs.form.reset()
      }
    }
  }
}
</script>
