<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field ref="dadName" v-model="dadName" label="Họ Và Tên Bố" outlined hide-details dense></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="dadJob" label="Nghề nghiệp" outlined hide-details dense></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="dadCompany" label="Cơ quan công tác" outlined hide-details dense></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="dadPhone"
          v-model="dadPhone"
          label="Số điện thoại bố"
          outlined
          dense
          :rules="[$rules.phone]"
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="dadEmail"
          v-model="dadEmail"
          label="Email Bố"
          dense
          outlined
          :rules="[rules.email]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="12" md="6">
        <v-text-field ref="momName" v-model="momName" label="Họ Và Tên Mẹ" outlined hide-details dense></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="momJob" label="Nghề nghiệp" outlined hide-details dense></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="momCompany" label="Cơ quan công tác" outlined hide-details dense></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="momPhone" label="Số điện thoại mẹ" outlined dense :rules="[$rules.phone]"></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="momEmail" label="Email Mẹ" dense outlined :rules="[rules.email]"></v-text-field>
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
    dadJob: '',
    dadCompany: '',
    dadEmail: '',
    dadPhone: '',
    momName: '',
    momEmail: '',
    momPhone: '',
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
      this.dadJob = this.student.data.dadJob
      this.dadCompany = this.student.data.dadCompany
      this.momName = this.student.data.momName
      this.momEmail = this.student.data.momEmail
      this.momPhone = this.student.data.momPhone
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
        dadJob: this.dadJob,
        dadCompany: this.dadCompany,
        momPhone: this.momPhone,
        momName: this.momName,
        momEmail: this.momEmail,
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

<style scoped></style>
