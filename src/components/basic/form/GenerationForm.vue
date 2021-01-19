<template>
  <v-form ref="form"  class="pt-6">
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
      required
      outlined
      dense
      :disabled="!editCode"
    ></text-field-code>
    <v-row no-gutters>
      <v-col
        :class="{
          'pa-0': $vuetify.breakpoint.mobile,
          'pl-0': !$vuetify.breakpoint.mobile,
        }"
        cols="12"
        md="6"
      >
        <date-iso-picker
          :date.sync="startDate"
          placeholder="Ngày khai giảng"
          outlined
        ></date-iso-picker>
      </v-col>
      <v-col
        :class="{
          'pa-0': $vuetify.breakpoint.mobile,
          'pr-0': !$vuetify.breakpoint.mobile,
        }"
        cols="12"
        md="6"
      >
        <date-iso-picker
          placeholder="Ngày kết thúc"
          :date.sync="endDate"
          outlined
        ></date-iso-picker>
      </v-col>
    </v-row>
    <v-textarea
      v-model="notes"
      placeholder="Ghi chú"
      outlined
      dense
    ></v-textarea>
  </v-form>
</template>
<script>
import TextFieldCode from '@/components/basic/input/TextFieldCode'
import DateIsoPicker from '@/components/basic/picker/DateIOSPicker'
import { get } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  components: {
    TextFieldCode,
    DateIsoPicker,
  },
  data: () => ({
    valid: true,
    code: '',
    notes: '',
    name: '',
    startDate: '',
    endDate: '',
    date: '',
  }),
  computed: {
    ...mapGetters('app', ['department']),
  },
  props: {
    generation: { type: Object, default: () => {} },
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
          code: this.code,
          name: this.name,
          data: {
            notes: this.notes,
            startDate: this.startDate,
            endDate: this.endDate,
          },
          department: this.department.id,
        }
      }
    },
    resetDefault() {
      this.code = this.generation.code
      this.notes = get(this.generation, 'data.notes', '')
      this.name = this.generation.name
      this.startDate = get(this.generation, 'data.startDate', '')
      this.endDate = get(this.generation, 'data.endDate', '')
    },
  },
  created() {
    this.resetDefault()
  },
  watch: {
    generation() {
      this.resetDefault()
    },
  },
}
</script>
