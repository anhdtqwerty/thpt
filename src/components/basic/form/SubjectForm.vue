<template>
  <v-form ref="form" flat class="pt-5">
    <p class="caption">Thông tin môn học</p>
    <v-text-field
      label="Tên Môn *"
      v-model="title"
      dense
      outlined
      required
    ></v-text-field>
    <v-text-field
      label="Nhóm môn học *"
      v-model="type"
      dense
      outlined
      required
    ></v-text-field>
    <div class="d-flex">
      <autocomplete-grade
        v-model="grade"
        class="mr-4"
        item-text="title"
        item-value="id"
        label="Khối *"
        return-object
        required
        dense
        outlined
      ></autocomplete-grade>
      <autocomplete-division
        v-model="divisions"
        item-text="title"
        item-value="id"
        label="Ban *"
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
        class="mr-4"
        label="Số tiết / tuần"
        v-model="weeklyLesson"
        dense
        type="number"
        outlined
        required
      ></v-text-field>
      <v-text-field
        label="Số tiết / năm"
        v-model="anualyLesson"
        dense
        type="number"
        outlined
        required
      ></v-text-field>
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
    <v-textarea
      ref="description"
      v-model="description"
      label="Ghi chú"
      outlined
      dense
    ></v-textarea>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
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
      divisions: '',
      type: '',
      weeklyLesson: 0,
      anualyLesson: 0
    }
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  props: {
    subject: { type: Object, default: () => {} },
    editCode: { type: Boolean, default: false }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
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
          divisions: this.divisions ? [...this.divisions.map(d => d.id)] : '',
          data: {
            weeklyLesson: this.weeklyLesson,
            anualyLesson: this.anualyLesson
          }
        }
      }
    },
    resetDefault() {
      console.log(this.subject)
      if (this.subject && this.subject.id) {
        console.log(this.subject.title)

        this.title = this.subject.title
        this.markType = this.subject.markType
        this.multiply = this.subject.multiply
        this.description = this.subject.description
        this.grade = this.subject.grade
        this.divisions = this.subject.divisions
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
