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
        :filter="onFilterChanged"
      />
    </div>
    <div class="d-flex">
      <AutocompleteSubjectGroup
        v-model="subjectGroup"
        item-text="title"
        item-value="id"
        label="Bộ môn"
        class="required col-md-6 mr-4"
        deletable-chips
        dense
        :rules="[$rules.required]"
        required
        hide-details
        outlined
        :filter="onFilterChanged"
      />
      <v-text-field
        label="Tên môn học"
        class="required col-md-6"
        :rules="[$rules.required, titleRule]"
        v-model="title"
        dense
        outlined
        required
      ></v-text-field>
    </div>
    <div class="d-flex">
      <AutocompleteSubjectType
        :defaultSubjectTypes="defaultSubjectTypes"
        v-model="type"
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
        :rules="[$rules.required, $rules.min(0)]"
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
        :rules="[$rules.required, $rules.min(0), $rules.max(maxWeeklyLesson)]"
        min="0"
        v-model="minWeeklyLesson"
        dense
        outlined
        required
        type="number"
      ></v-text-field>
      <v-text-field
        label="Số tiết tối đa trên tuần"
        class="required col-md-6"
        :rules="[$rules.required, $rules.min(0), $rules.min(minWeeklyLesson)]"
        min="0"
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
          class="pl-3 pr-2 mt-2"
          :rules="[$rules.min(0), $rules.min(minWeeklyLesson)]"
          min="0"
          v-model="weeklyLesson"
          dense
          required
          outlined
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
import { get, map } from 'lodash'
import { mapState } from 'vuex'

const defaultSubjectTypes = [
  { id: 'coreCurriculum', title: 'Chính khoá' },
  { id: 'extraCurriculum', title: 'Ngoại khoá' }
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
      defaultSubjectTypes: defaultSubjectTypes,
      titleRule: v => {
        const title = textHelpers.removeSpaces(v)
        return !map(this.subjects, 'title').includes(title) || 'Đã có môn học này'
      }
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
          grade: this.grade.id,
          division: this.division,
          subjectGroup: this.subjectGroup,
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
      if (get(this.grade, 'academicLevel.id') !== get(grade, 'academicLevel.id')) {
        this.division = null
        this.type = null
      }
      this.grade = grade
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  computed: {
    onFilterChanged() {
      return { academicLevel: get(this.grade, 'academicLevel.id') }
    },
    ...mapState('subjects', ['subjects'])
  },
  watch: {
    state(state) {
      if (!state) {
        this.$refs.form.reset()
      }
    },
    maxWeeklyLesson: 'resetValidation',
    minWeeklyLesson: 'resetValidation',
    multiply: 'resetValidation',
    title: 'resetValidation'
  }
}
</script>
