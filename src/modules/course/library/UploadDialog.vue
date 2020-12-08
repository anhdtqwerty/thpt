<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline">Upload Tài Liệu</v-card-title>
      <v-card-text>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error darken-1" @click="dialog = false" small>Hủy</v-btn>
        <v-btn color="success darken-1" @click="dialog = false" small>Tải lên</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: { vueDropzone },
  props: {
    state: Boolean
  },
  data: () => ({
    dialog: false,
    dropzoneOptions: {
      url: 'https://httpbin.org/post',
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      headers: { 'My-Awesome-Header': 'header value' }
    }
  }),
  watch: {
    state (state) {
      this.dialog = true
    }
  }
}
</script>
<style scoped>
</style>
