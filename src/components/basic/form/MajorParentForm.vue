<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      ref="title"
      dense
      v-model="title"
      label="Tên khối"
      placeholder="Nhập tên khối"
      required
      outlined
    ></v-text-field>

    <v-text-field
      ref="code"
      dense
      v-model="code"
      label="Mã Khối"
      placeholder="Nhập mã Khối"
      required
      outlined
    ></v-text-field>

    <v-text-field
      ref="descriptions"
      dense
      v-model="descriptions"
      label="Mô tả"
      placeholder="Nhập mô tả khối"
      required
      outlined
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    major: {
      code: [Object],
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    title: '',
    code: '',
    descriptions: '',
  }),
  created() {
    this.reset()
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      if (this.major) {
        this.title = this.major.title
        this.code = this.major.code
        this.descriptions = this.major.descriptions
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      return {
        title: this.title,
        code: this.code,
        descriptions: this.descriptions,
      }
    },
  },
  watch: {
    major(major) {
      this.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
      color: #eeeeee;
    }
  }
</style>
