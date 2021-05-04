<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">4. Thông tin gia đình</p>
    <v-row>
      <v-col class="py-0 pr-14" cols="12">
        <v-row>
          <v-col class="d-flex py-0" cols="12">
            <p class="font-weight-black text-subtitle-2 mb-0 mt-4">
              Thông tin về bố (Người giám hộ)
            </p>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Họ và tên bố</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="dadName" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Số điện thoại bố</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="dadPhone" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Email bố</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="dadEmail" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Nghề nghiệp bố</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="dadJob" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Cơ quan công tác</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="dadCompany" dense regular></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="mt-4 py-0 pr-14" cols="12">
        <v-row>
          <v-col class="d-flex py-0" cols="12">
            <p class="font-weight-black text-subtitle-2 mb-0 mt-4">
              Thông tin về mẹ (Người giám hộ)
            </p>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Họ và tên mẹ</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="momName" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Số điện thoại mẹ</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="momPhone" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Email mẹ</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="momEmail" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Nghề nghiệp mẹ</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="momJob" dense regular></v-text-field>
          </v-col>
          <v-col class="d-flex py-0" cols="12">
            <v-subheader class="px-0">Cơ quan công tác</v-subheader>
            <v-text-field class="pt-1" flat solo hide-details v-model="momCompany" dense regular></v-text-field>
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
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    dadName: '',
    dadEmail: '',
    dadPhone: '',
    momName: '',
    momEmail: '',
    momPhone: '',
    dadJob: '',
    dadCompany: '',
    momJob: '',
    momCompany: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    if (this.student) {
      this.dadName = this.student.data.dadName
      this.dadEmail = this.student.data.dadEmail
      this.dadPhone = this.student.data.dadPhone
      this.momName = this.student.data.momName
      this.momEmail = this.student.data.momEmail
      this.momPhone = this.student.data.momPhone
      this.dadJob = this.student.data.dadJob
      this.dadCompany = this.student.data.dadCompany
      this.momJob = this.student.data.momJob
      this.momCompany = this.student.data.momCompany
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
        dadJob: this.dadJob,
        dadCompany: this.dadCompany,
        momJob: this.momJob,
        momCompany: this.momCompany
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>
.v-subheader {
  width: 30%;
}
</style>
