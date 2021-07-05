<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12">
        <v-text-field v-model="currentLive" label="Địa chỉ hiện tại" outlined hide-details dense></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="province" label="Tỉnh/Thành phố" outlined dense hide-details></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="district" label="Quận/Huyện" outlined hide-details dense></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="phone" label="Số điện thoại" outlined dense :rules="[$rules.phone]"></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="email" label="Email" outlined dense :rules="[rules.email]"></v-text-field>
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
    currentLive: '',
    province: '',
    district: '',
    phone: '',
    email: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    if (this.student) {
      this.currentLive = this.student.data.currentLive
      this.province = this.student.data.province
      this.district = this.student.data.district
      this.phone = this.student.phone
      this.email = this.student.email
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    getData() {
      return {
        currentLive: this.currentLive,
        province: this.province,
        district: this.district,
        phone: this.phone,
        email: this.email
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
