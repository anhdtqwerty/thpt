<template>
  <div>
    <v-avatar v-bind="this.$attrs" size="128" rounded>
      <v-btn class="remove-button" icon v-if="avatar !== url">
        <v-icon color="grey" @click="removeImage">close</v-icon>
      </v-btn>
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
    user: Object,
    type: String
  },
  data: () => ({
    rules: [value => !value || value.size < 2000000 || 'Ảnh đại diện cần có dung lượng nhỏ hơn 2 MB!'],
    url: '/default-avatar.png'
  }),
  computed: {
    avatar() {
      if (this.user && this.user.avatar) {
        return this.user.avatar.url
      }
      return this.url
    }
  },
  methods: {
    ...mapActions('student', { uploadStudentAvatar: 'uploadAvatar' }),
    ...mapActions('student', { destroyStudentAvatar: 'destroyAvatar' }),
    ...mapActions('teacher', { uploadTeacherAvatar: 'uploadAvatar' }),
    ...mapActions('teacher', { destroyTeacherAvatar: 'destroyAvatar' }),
    onChange(file) {
      if (file) {
        this.save(file)
      }
    },
    removeImage() {
      this.$dialog.confirm({
        title: 'Xóa ảnh đại diện',
        text: ` Bạn có Chắc Chắn muốn xóa ảnh đại diện ?`,
        okText: 'Có',
        cancelText: 'Hủy',
        done: () => {
          this.type === 'teacher'
            ? this.destroyTeacherAvatar(this.user.avatar.id)
            : this.destroyStudentAvatar(this.user.avatar.id)
        }
      })
    },
    save(image) {
      if (this.user) {
        if (this.user.avatar) {
          this.destroyAvatar(this.user.avatar.id)
        }
        let formData = new FormData()
        formData.append('files', image)
        formData.append('refId', this.user.id)
        formData.append('ref', this.type)
        formData.append('field', 'avatar')
        this.type === 'teacher' ? this.uploadTeacherAvatar(formData) : this.uploadStudentAvatar(formData)
      }
    }
  },
  watch: {}
}
</script>

<style scoped>
.file-input {
  position: absolute;
  bottom: 0;
  right: 0;
}

.remove-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
