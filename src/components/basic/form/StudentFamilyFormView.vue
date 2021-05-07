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
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Họ và tên bố</v-subheader>
            <p class="mb-0">{{ student.data.dadName }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Số điện thoại bố</v-subheader>
            <p class="mb-0">{{ student.data.dadPhone }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Email bố</v-subheader>
            <p class="mb-0">{{ student.data.dadEmail }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Nghề nghiệp bố</v-subheader>
            <p class="mb-0">{{ student.data.dadJob }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Cơ quan công tác</v-subheader>
            <p class="mb-0">{{ student.data.dadCompany }}</p>
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
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Họ và tên mẹ</v-subheader>
            <p class="mb-0">{{ student.data.momName }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Số điện thoại mẹ</v-subheader>
            <p class="mb-0">{{ student.data.momPhone }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Email mẹ</v-subheader>
            <p class="mb-0">{{ student.data.momEmail }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Nghề nghiệp mẹ</v-subheader>
            <p class="mb-0">{{ student.data.momJob }}</p>
          </v-col>
          <v-col class="d-flex align-center py-0" cols="12">
            <v-subheader class="px-0">Cơ quan công tác</v-subheader>
            <p class="mb-0">{{ student.data.momCompany }}</p>
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
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
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
