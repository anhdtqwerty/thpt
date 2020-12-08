<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      ref="frequentlyAddress"
      dense
      outlined
      v-model="frequentlyAddress"
      label="Địa Chỉ Thường Chú"
      placeholder="Nhập địa chỉ thường chú"
      required
    ></v-text-field>
    <v-text-field
      ref="birthPlace"
      dense
      outlined
      v-model="birthPlace"
      label="Nơi Sinh"
      placeholder="Nhập Nơi Sinh"
      required
    ></v-text-field>
    <v-text-field
      ref="currentLive"
      dense
      outlined
      v-model="currentLive"
      label="Nơi ở hiện tại"
      placeholder="Nhập nơi ở hiện tại"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    address: Object
  },
  data: () => ({
    valid: true,
    frequentlyAddress: '',
    currentLive: '',
    achievements: '',
    birthPlace: ''
  }),
  created () {
    this.reset()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      if (this.address) {
        this.frequentlyAddress = this.address.frequentlyAddress
        this.currentLive = this.address.currentLive
        this.birthPlace = this.address.birthPlace
        this.achievements = this.address.achievements
      } else {
        this.frequentlyAddress = ''
        this.currentLive = ''
        this.birthPlace = ''
        this.achievements = ''
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        frequentlyAddress: this.frequentlyAddress,
        currentLive: this.currentLive,
        birthPlace: this.birthPlace,
        achievements: this.achievements
      }
    }
  },
  watch: {
    address (student) {
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
