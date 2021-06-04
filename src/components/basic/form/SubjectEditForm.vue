<template>
  <v-form ref="form" flat>
    <v-row class="pb-0">
      <v-col cols="6">
        <v-text-field
          label="Hệ số tổng kết"
          class="required "
          :rules="[$rules.required, $rules.min(0)]"
          v-model="multiply"
          min="0"
          dense
          outlined
          required
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="6" />
      <v-col cols="6" class="pt-0">
        <v-text-field
          label="Số tiết tối thiểu trên tuần"
          class="required pa-0"
          :rules="[$rules.required, $rules.min(0), $rules.max(maxWeeklyLesson)]"
          min="0"
          v-model="minWeeklyLesson"
          dense
          outlined
          required
          type="number"
        ></v-text-field
      ></v-col>
      <v-col cols="6" class="pt-0">
        <v-text-field
          label="Số tiết tối đa trên tuần"
          class="required  pa-0"
          :rules="[$rules.required, $rules.min(0), $rules.min(minWeeklyLesson)]"
          min="0"
          v-model="maxWeeklyLesson"
          dense
          outlined
          required
          type="number"
        ></v-text-field
      ></v-col>
      <v-col cols="12" class="pt-0">
        <v-radio-group v-model="markType" mandatory row class="shrink mt-0">
          <v-radio label="Đánh giá bằng cho điểm" hide-details value="mark"></v-radio>
          <v-radio label="Đánh giá bằng nhận xét" hide-details value="evaluate"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-radio-group v-model="compoundClass" mandatory row class="shrink mt-0">
          <v-radio label="Có học ghép lớp" hide-details :value="true"></v-radio>
          <v-radio label="Không học ghép lớp" hide-details :value="false"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    state: Boolean
  },
  components: {},
  data() {
    return {
      multiply: '',
      minWeeklyLesson: '',
      maxWeeklyLesson: '',
      compoundClass: true,
      markType: 'mark'
    }
  },
  computed: {
    ...mapState('subjects', ['subject'])
  },
  methods: {
    getData() {
      if (this.$refs.form.validate()) {
        let subjectClone = JSON.parse(JSON.stringify(this.subject))
        subjectClone.multiply = this.multiply
        subjectClone.markType = this.markType
        subjectClone.data.compoundClass = this.compoundClass
        subjectClone.data.minWeeklyLesson = this.minWeeklyLesson
        subjectClone.data.maxWeeklyLesson = this.maxWeeklyLesson
        return subjectClone
      }
      return null
    },
    resetDefault() {
      if (this.subject != null) {
        this.multiply = this.subject.multiply
        this.markType = this.subject.markType
        const data = this.subject.data
        this.minWeeklyLesson = data.minWeeklyLesson
        this.maxWeeklyLesson = data.maxWeeklyLesson
        this.compoundClass = data.compoundClass
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  created() {
    this.resetDefault()
  },
  watch: {
    state(state) {
      if (state) {
        this.resetDefault()
      } else {
        this.$refs.form.reset()
      }
    },
    maxWeeklyLesson: 'resetValidation',
    minWeeklyLesson: 'resetValidation',
    multiply: 'resetValidation'
  }
}
</script>
