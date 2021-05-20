<template>
  <v-form ref="form" flat class="pt-5">
    <p class="caption">Thông tin môn học</p>
    <v-text-field
      label="Tên Môn"
      class="required"
      :rules="[$rules.required]"
      v-model="title"
      dense
      outlined
      required
    ></v-text-field>
    <v-text-field
      label="Nhóm môn học"
      class="required"
      :rules="[$rules.required]"
      v-model="type"
      dense
      outlined
      required
    ></v-text-field>
    <div class="d-flex">
      <AutocompleteGrade
        return-object
        v-model="grade"
        item-text="title"
        item-value="id"
        label="Khối"
        class="required mr-4"
        :rules="[$rules.required]"
        required
        dense
        outlined
        @change="gradeChanged"
      />
      <AutocompleteDivision
        v-model="division"
        item-text="title"
        item-value="id"
        label="Phân ban"
        class="required"
        :rules="[$rules.required]"
        :filter="divisionFilter"
        return-object
        chip
        clearable
        required
        dense
        outlined
      />
    </div>
    <div class="d-flex">
      <v-text-field
        class="mr-4"
        label="Số tiết / tuần"
        v-model="weeklyLesson"
        dense
        type="number"
        outlined
        required
      ></v-text-field>
      <v-text-field label="Số tiết / năm" v-model="anualyLesson" dense type="number" outlined required></v-text-field>
    </div>
    <div class="d-flex">
      <v-text-field
        class="mr-4"
        label="Hệ số tổng kết"
        v-model="multiply"
        dense
        type="number"
        outlined
        required
      ></v-text-field>
      <v-select
        label="Loại đánh giá"
        :items="[
          { id: 'mark', text: 'Điểm số' },
          { id: 'evaluate', text: 'Đánh giá' }
        ]"
        item-text="text"
        item-value="id"
        v-model="markType"
        dense
        outlined
        required
      ></v-select>
    </div>
    <v-textarea ref="description" v-model="description" label="Ghi chú" outlined dense></v-textarea>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteDivision,
    AutocompleteGrade
  },
  data() {
    return {
      valid: true,
      title: '',
      description: '',
      grade: '',
      markType: 'mark',
      multiply: 1,
      division: '',
      type: '',
      weeklyLesson: 0,
      anualyLesson: 0
    }
  },
  computed: {
    ...mapGetters('app', ['department']),
    divisionFilter() {
      return { academicLevel: get(this.grade, 'academicLevel') }
    }
  },
  props: {
    subject: { type: Object, default: () => {} },
    editCode: { type: Boolean, default: false }
  },
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
    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.division = null
      }
      this.grade = grade
    },
    getData() {
      if (this.$refs.form.validate()) {
        return {
          title: this.title,
          type: this.type,
          description: this.description,
          markType: this.markType,
          multiply: this.multiply,
          grade: this.grade ? this.grade.id : '',
          division: this.division,
          data: {
            weeklyLesson: this.weeklyLesson,
            anualyLesson: this.anualyLesson
          }
        }
      }
    },
    resetDefault() {
      if (this.subject && this.subject.id) {
        this.title = this.subject.title
        this.markType = this.subject.markType
        this.multiply = this.subject.multiply
        this.description = this.subject.description
        this.grade = this.subject.grade
        this.division = this.subject.division
        this.type = this.type
        if (this.subject.data) {
          this.anualyLesson = this.subject.data.anualyLesson
          this.weeklyLesson = this.subject.data.weeklyLesson
        }
      }
    }
  },
  created() {
    this.resetDefault()
  }
}
</script>
