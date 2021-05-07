<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">3. Ghi chú về học sinh</p>
    <v-row class="pr-12">
      <v-col class="py-0" cols="12">
        <v-subheader class="pa-0">Ghi chú</v-subheader>
        <p>{{ student.notes }}</p>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-subheader class="pa-0">Ngày vào đội</v-subheader>
        <p>
          {{ student.data.youngJoinedDate | ddmmyyyy }}
        </p>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-subheader class="pa-0">Ngày vào đoàn</v-subheader>
        <p>{{ student.data.communistJoinedDate | ddmmyyyy }}</p>
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
    },
    edit: Boolean
  },
  data: () => ({
    valid: true,
    isCommunist: false,
    isYoung: false
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
</style>
