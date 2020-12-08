<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="title" :rules="nameRules" label="Tiêu đề chương" dense required />
    <v-textarea v-model="description" label="Mô tả bài" dense />
    <v-select :items="items" label="Chọn loại bài học" dense v-model="contentType" />
    <v-divider></v-divider>
    <v-lauout v-if="contentType==='video'">
      <v-file-input accept="video/mp4, video/x-m4v, video/*" label="Bấm vào để upload videos"></v-file-input>
    </v-lauout>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    contentType: 'video',
    title: '',
    description: '',
    items: [
      'video',
      'drive',
      'pdf',
      'kiểm tra',
      'youtube',
      'assignment',
      'other'
    ],
    nameRules: [v => !!v || 'Tiêu đề bài không được để trống']
  }),
  props: {
    lesson: Object
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.title = this.lesson.title
      this.description = this.lesson.description
      this.contentType = this.lesson.contentType
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        title: this.title,
        description: this.description,
        contentType: this.contentType
      }
    }
  },
  created () {
    this.reset()
  },
  watch: {
    lesson (lesson) {
      this.reset()
    }
  }
}
</script>
