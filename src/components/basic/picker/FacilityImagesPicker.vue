<template>
  <div>
    <v-file-input
      v-bind="this.$attrs"
      multiple
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Upload Ảnh Đại Diện"
      prepend-icon="mdi-camera"
      label="Ảnh Đại Diện"
      @change="onChange"
      v-on:input="$emit('input', $event)"
    ></v-file-input>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    facility: Object
  },
  data: () => ({
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        'Ảnh đại diện cần có dung lượng nhỏ hơn 2 MB!'
    ],
    url: './default-imgs.png'
  }),
  methods: {
    ...mapActions('facility', ['uploadImgs', 'destroyImgs']),
    onChange (file) {
      if (file) {
        this.save(file)
      }
    },
    save (images) {
      images.map(image => {
        let formData = new FormData()
        formData.append('files', image)
        formData.append('refId', this.facility.id)
        formData.append('source', 's3')
        formData.append('field', 'imgs')
        this.uploadImgs(formData)
      })
    }
  }
}
</script>

<style scoped>
</style>
