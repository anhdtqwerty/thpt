<template>
  <div>
    <div style="position: relative">
      <v-img width="100%" :src="focusImg"></v-img>
      <v-file-input
        class="position-in-image"
        v-bind="this.$attrs"
        multiple
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        @change="onChange"
        hide-input
        v-on:input="$emit('input', $event)"
      ></v-file-input>
    </div>

    <div class="mt-2 d-flex gallery">
      <v-img
        @click="focusImgChanged(index)"
        v-for="(img, index) in listImg"
        :key="img"
        max-width="30%"
        height="auto"
        class="mr-2"
        :src="img"
      >
      </v-img>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    facility: Object,
  },
  data() {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Ảnh đại diện cần có dung lượng nhỏ hơn 2 MB!',
      ],
      url: 'https://thaibah.com/dev/assets/img/default-img.jpg',
      index: 0,
    }
  },
  computed: {
    focusImg() {
      return this.listImg[this.index] || this.url
    },
    listImg() {
        if (this.facility.imgs) {
            return this.facility.imgs.map(f => f.url)
        }
        return this.url
    }
  },
  methods: {
    focusImgChanged(index) {
      this.index = index
    },
    ...mapActions('facility', ['uploadImgs', 'destroyImgs']),
    onChange(file) {
      if (file) {
        this.save(file)
      }
    },
    save(images) {
      images.map((image) => {
        let formData = new FormData()
        formData.append('files', image)
        formData.append('refId', this.facility.id)
        formData.append('ref', 'facility')
        formData.append('field', 'imgs')
        this.uploadImgs(formData)
      })
    },
  },
}
</script>

<style scoped>
.gallery {
  overflow: scroll;
}
.position-in-image {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
