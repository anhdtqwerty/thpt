<template>
  <div>
    <v-avatar v-bind="this.$attrs" size="230" rounded>
      <img :src="avatar" alt="Avatar" style="boder-radius: 4px !important;" />
      <v-file-input
        class="file-input"
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        hide-input
        @change="onChange"
      ></v-file-input>
    </v-avatar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    student: Object,
    type: String
  },
  data: () => ({
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        'Ảnh đại diện cần có dung lượng nhỏ hơn 2 MB!'
    ],
    url: '/default-avatar.png'
  }),
  computed: {
    avatar() {
      if (this.student.avatar) {
        return this.student.avatar.url
      }
      return this.url
    }
  },
  methods: {
    ...mapActions('student', ['uploadAvatar', 'destroyAvatar']),
    onChange(file) {
      if (file) {
        this.save(file)
      }
    },
    save(image) {
      if (this.student.avatar) {
        this.destroyAvatar(this.student.avatar.id)
      }
      let formData = new FormData()
      formData.append('files', image)
      formData.append('refId', this.student.id)
      formData.append('ref', this.type)
      formData.append('field', 'avatar')
      this.uploadAvatar(formData)
    }
  }
}
</script>

<style scoped>
.file-input {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
