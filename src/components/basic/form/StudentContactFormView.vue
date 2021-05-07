<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">2. Thông tin liên lạc</p>
    <v-row class="pr-12">
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Địa chỉ</v-subheader>
        <p class="mb-0">{{ student.data.currentLive }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Quận/huyện</v-subheader>
        <p class="mb-0">{{ student.data.district }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Tỉnh/thành phố</v-subheader>
        <p class="mb-0">{{ student.data.province }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Số điện thoại</v-subheader>
        <p class="mb-0">{{ student.phone }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Email</v-subheader>
        <p class="mb-0">{{ student.email }}</p>
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
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {},
  methods: {
    validate() {
      return this.$refs.form.validate()
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
p {
  color: black;
}
.v-subheader {
  width: 30%;
}
</style>
