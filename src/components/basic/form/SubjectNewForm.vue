<template>
  <v-form ref="form" flat class="pt-5">
    <div class="d-flex">
      <AutocompleteGrade
        v-model="grade"
        item-text="title"
        item-value="id"
        label="Khối"
        class="required col-md-6 mr-4"
        :rules="[$rules.required]"
        required
        dense
        outlined
      />
      <AutocompleteDivision
        v-model="division"
        item-text="title"
        item-value="id"
        label="Ban"
        class="required col-md-6"
        :rules="[$rules.required]"
        return-object
        chip
        clearable
        multiple
        required
        dense
        outlined
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
        dense
        outlined
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
      <AutocompleteSubjectMultiply
        v-model="multiply"
        item-text="title"
        item-value="id"
        label="Hệ số tổng kết"
        class="required col-md-6"
        :rules="[$rules.required]"
        return-object
        chip
        clearable
        multiple
        required
        dense
        outlined
      />
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
      ></v-text-field>
      <v-text-field
        label="Số tiết tối đa trên tuần"
        class="required col-md-6"
        :rules="[$rules.required]"
        v-model="maxWeeklyLesson"
        dense
        outlined
        required
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
        ></v-text-field>
      </v-col>
    </v-row>
    <v-radio-group row class="shrink mt-0" v-model="markType">
      <v-radio label="Đánh giá bằng cho điểm" hide-details value="mark"></v-radio>
      <v-radio label="Đánh giá bằng nhận xét" hide-details value="evaluate"></v-radio>
    </v-radio-group>
    <v-radio-group row class="shrink mt-0" v-model="compoundClass">
      <v-radio label="Có học ghép lớp" hide-details :value="true"></v-radio>
      <v-radio label="Không học ghép lớp" hide-details :value="false"></v-radio>
    </v-radio-group>
  </v-form>
</template>
<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
import AutocompleteSubjectGroup from '@/components/basic/input/AutocompleteSubjectGroup'
import AutocompleteSubjectMultiply from '@/components/basic/input/AutocompleteSubjectMultiply'
import AutocompleteSubjectType from '@/components/basic/input/AutocompleteSubjectType'
export default {
  components: {
    AutocompleteDivision,
    AutocompleteGrade,
    AutocompleteSubjectGroup,
    AutocompleteSubjectMultiply,
    AutocompleteSubjectType
  },
  data() {
    return {
      title: '',
      grade: '',
      markType: 'mark',
      multiply: '',
      division: '',
      type: '',
      weeklyLesson: 0,
      minWeeklyLesson: '',
      maxWeeklyLesson: '',
      compoundClass: true,
      subjectGroup: ''
    }
  },
  props: {},
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      return this.$refs.form.validate()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      if (this.$refs.form.validate()) {
        return {
          title: this.title,
          type: this.type,
          markType: this.markType,
          multiply: this.multiply,
          grade: this.grade ? this.grade.id : '',
          division: this.division,
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
    resetDefault() {
      if (this.subject && this.subject.id) {
        this.title = ''
        this.markType = 'mark'
        this.multiply = ''
        this.grade = ''
        this.division = 'this.division'
        this.type = ''
        this.weeklyLesson = ''
        this.minWeeklyLesson = ''
        this.maxWeeklyLesson = ''
        this.subjectGroup = ''
        this.compoundClass = true
      }
    }
  },
  created() {
    this.resetDefault()
  }
}
</script>
