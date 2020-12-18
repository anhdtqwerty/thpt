<template>
  <v-form ref="form" flat class="pa-6">
    <v-text-field
      label="Tên khối mới"
      v-model="title"
      dense
      outlined
      required
    ></v-text-field>
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
import TextFieldCode from '@/components/basic/input/TextFieldCode'
import { mapGetters } from 'vuex'
export default {
  components: {
    TextFieldCode,
  },
  data: () => ({
    valid: true,
    subjects: '',
    description: '',
    title: '',
  }),
  computed: {
    ...mapGetters('app', ['department']),
  },
  props: {
    grade: { type: Object, default: () => {} },
    editCode: { type: Boolean, default: false },
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
          description: this.description,
        }
      }
    },
    resetDefault() {
      if (this.division) {
        this.description = this.division.description
        this.title = this.division.title
      } else {
        this.title = ''
        this.description = ''
      }
    },
  },
  created() {
    this.resetDefault()
  },
}
</script>