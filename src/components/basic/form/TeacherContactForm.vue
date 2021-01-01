<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="currentLive"
          v-model="currentLive"
          label="Địa chỉ hiện tại"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="province"
          v-model="province"
          label="Tỉnh/thành phố đang sống"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="landlinePhone"
          v-model="landlinePhone"
          label="Điện thoại nhà riêng"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
export default {
  props: {
    teacher: {
      type: [Object],
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    currentLive: '',
    province: '',
    mobilePhone: '',
    landlinePhone: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    if (this.teacher) {
      this.reset()
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
        mobilePhone: this.mobilePhone,
        landlinePhone: this.landlinePhone
      }
    },
    reset() {
      this.currentLive = this.teacher.metadata.currentLive
      this.province = this.teacher.metadata.province
      this.mobilePhone = this.teacher.metadata.mobilePhone
      this.landlinePhone = this.teacher.metadata.landlinePhone
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    teacher(teacher) {
      this.reset()
    }
  }
}
</script>

<style scoped></style>
