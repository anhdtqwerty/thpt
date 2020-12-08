<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="title" :rules="nameRules" label="Tiêu đề chương" required></v-text-field>
    <v-textarea v-model="description" label="Mô tả chương"></v-textarea>
    <v-textarea v-model="notes" label="Ghi chú"></v-textarea>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    title: '',
    description: '',
    notes: '',
    nameRules: [v => !!v || 'Tiêu đề chương không được để trống']
  }),
  props: {
    session: {
      type: Object,
      default: function () {
        return { title: '', description: '', notes: '' }
      }
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.title = this.session.title
      this.description = this.session.description
      this.notes = this.session.notes
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        title: this.title,
        description: this.description,
        notes: this.notes
      }
    }
  },
  created () {
    this.reset()
  },
  watch: {
    session () {
      this.reset()
    }
  }
}
</script>
