<template>
  <v-form ref="form" v-model="valid">
      <v-select
          v-model="formData.grade"
          :items="grades"
          label="Chọn khối"
          dense
          outlined
          item-text="title"
          item-value="_id"
          required
          :rules="[
            $rules.required
          ]"
        />
      <v-select
          v-model="formData.division"
          :items="divisions"
          label="Phân ban"
          dense
          outlined
          item-text="title"
          item-value="_id"
          required
          :rules="[
            $rules.required
          ]"
        />
        <v-text-field v-model="formData.className" dense outlined label="Tên lớp"
        :rules="[
            $rules.required
          ]" required/>
        <v-select
          v-model="formData.teacher"
          :items="teachers"
          label="Giáo viên"
          dense
          outlined
          item-text="name"
          item-value="_id"
          required
          :rules="[
            $rules.required
          ]"
        />
        <v-textarea outlined v-model="formData.note" dense label="Ghi chú" />
  </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      valid: true,
      formData: {
        division: '',
        grade: '',
        className: '',
        teacher: '',
        note: ''
      }
    }
  },
  computed: {
    ...mapState('division', ['divisions']),
    ...mapState('grade', ['grades']),
    ...mapGetters('teacher', ['teachers']),
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getFormData () {
      return this.formData
    }
  }
}
</script>

<style>

</style>
