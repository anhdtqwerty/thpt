<template>
  <v-form ref="form" flat class="pa-6">
    <v-text-field
      label="Tên"
      v-model="name"
      dense
      outlined
      required
    ></v-text-field>
    <text-field-code
      patern="XXXX"
      ref="code"
      v-model="code"
      label="Mã niên khóa"
      required
      outlined
      dense
      :disabled="!editCode"
    ></text-field-code>
    <v-textarea
      ref="description"
      v-model="description"
      label="Mô Tả"
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
    TextFieldCode
  },
  data: () => ({
    valid: true,
    code: '',
    description: '',
    name: ''
  }),
  computed: {
    ...mapGetters('app', ['department'])
  },
  props: {
    generation: { type: Object, default: () => {} },
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
          code: this.code,
          description: this.description,
          name: this.name,
          department: this.department.id
        }
      }
    },
    resetDefault() {
      if (this.generation) {
        this.code = this.generation.code
        this.description = this.generation.description
        this.name = this.generation.name
      } else {
        this.name = ''
        this.description = ''
        this.code = ''
      }
    }
  },
  created() {
    this.resetDefault()
  },
  watch: {}
}
</script>

<style scoped></style>
