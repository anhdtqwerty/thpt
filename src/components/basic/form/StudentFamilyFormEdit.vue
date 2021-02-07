<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2 mb-0">4. Thông tin gia đình</p>
    <v-row>
      <v-col class="pb-0 pr-14" cols="12">
        <v-row>
          <v-col class="d-flex pb-0" cols="12">
            <v-subheader class="px-0">Họ và tên bố</v-subheader>
            <v-text-field ref="dadName" v-model="dadName" dense></v-text-field>
          </v-col>
          <v-col class="d-flex pb-0" cols="12">
            <v-subheader class="px-0">Số điện thoại bố</v-subheader>
            <v-text-field
              ref="dadPhone"
              v-model="dadPhone"
              dense
            ></v-text-field>
          </v-col>
          <v-col class="d-flex pb-0" cols="12">
            <v-subheader class="px-0">Email bố</v-subheader>
            <v-text-field
              ref="dadEmail"
              v-model="dadEmail"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pb-0 pr-14" cols="12">
        <v-row>
          <v-col class="d-flex pb-0" cols="12">
            <v-subheader class="px-0">Họ và tên mẹ</v-subheader>
            <v-text-field ref="momName" v-model="momName" dense></v-text-field>
          </v-col>
          <v-col class="d-flex pb-0" cols="12">
            <v-subheader class="px-0">Số điện thoại mẹ</v-subheader>
            <v-text-field
              ref="momPhone"
              v-model="momPhone"
              dense
            ></v-text-field>
          </v-col>
          <v-col class="d-flex pb-0" cols="12">
            <v-subheader class="px-0">Email mẹ</v-subheader>
            <v-text-field
              ref="momEmail"
              v-model="momEmail"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    student: {
      type: [Object],
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    dadName: '',
    dadEmail: '',
    dadPhone: '',
    momName: '',
    momEmail: '',
    momPhone: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    if (this.student) {
      this.dadName = this.student.data.dadName
      this.dadEmail = this.student.data.dadEmail
      this.dadPhone = this.student.data.dadPhone
      this.momName = this.student.data.momName
      this.momEmail = this.student.data.momEmail
      this.momPhone = this.student.data.momPhone
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    getData() {
      return {
        dadName: this.dadName,
        dadEmail: this.dadEmail,
        dadPhone: this.dadPhone,
        momPhone: this.momPhone,
        momName: this.momName,
        momEmail: this.momEmail,
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped>
.v-subheader {
  width: 30%;
}
</style>
