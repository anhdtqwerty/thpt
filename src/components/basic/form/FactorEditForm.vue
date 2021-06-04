<template>
  <v-form ref="form" class="pt-1" flat>
    <div class="d-flex">
      <v-text-field
        label="Số điểm tối thiểu trên học sinh"
        class="required col-md-6 mr-4"
        :rules="[$rules.required, $rules.min(0), $rules.max(maxMark)]"
        v-model="minMark"
        dense
        outlined
        required
        min="0"
        type="number"
      ></v-text-field>
      <v-text-field
        label="Số điểm tối đa trên học sinh"
        class="required col-md-6"
        :rules="[$rules.required, $rules.min(0), $rules.min(minMark)]"
        min="0"
        v-model="maxMark"
        dense
        outlined
        type="number"
        required
      ></v-text-field>
    </div>
  </v-form>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      minMark: '',
      maxMark: ''
    }
  },
  props: {
    state: Boolean,
    factor: { type: Object, default: () => {} }
  },
  computed: {
    ...mapState('subjects', ['subject'])
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    getData() {
      if (this.$refs.form.validate()) {
        const semester2Id = this.subject.factors.find(
          f => f.type === this.factor.type && f.semesterType === 'semester-2'
        ).id
        let factorClone = JSON.parse(JSON.stringify(this.factor))
        if (factorClone && factorClone.data != null) {
          factorClone.data.minMark = this.minMark
          factorClone.data.maxMark = this.maxMark
        } else {
          return {
            factorSemester1: { ...factorClone, data: { minMark: this.minMark, maxMark: this.maxMark } },
            semester2Id
          }
        }
        return { factorSemester1: factorClone, semester2Id }
      }
      return null
    },
    resetDefault() {
      if (this.factor && this.factor.data) {
        this.minMark = this.factor.data.minMark
        this.maxMark = this.factor.data.maxMark
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
    factor() {
      this.resetDefault()
    },
    state(state) {
      if (state) {
        this.resetDefault()
      } else {
        this.reset()
      }
    },
    minMark: 'resetValidation',
    maxMark: 'resetValidation'
  }
}
</script>
