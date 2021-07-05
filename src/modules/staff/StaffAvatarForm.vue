<template>
  <v-card flat>
    <v-card-text class="flex-row justify-center">
      <picture-input
        ref="pictureInput"
        width="600"
        height="600"
        radius="50"
        margin="16"
        accept="image/jpeg,image/png"
        size="10"
        button-class="btn"
        :prefill="avatar"
        :custom-strings="{ upload: '<h1>Bummer!</h1>', drag: 'Kéo vào để upload avatar' }"
        @change="onChange"
      >
      </picture-input>
    </v-card-text>
  </v-card>
</template>

<script>
import PictureInput from 'vue-picture-input'
import imageCompression from 'browser-image-compression'
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'

export default {
  components: {
    PictureInput
  },
  props: {
    staff: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    image: ''
  }),
  computed: {
    ...mapGetters('upload', ['url']),
    avatar() {
      return get(this.staff, 'avatar.url', '/default-avatar.png')
    }
  },
  methods: {
    ...mapActions('upload', ['upload', 'destroy']),
    async onChange(image) {
      if (image) {
        this.save(this.$refs.pictureInput.file)
      }
    },
    async save(image) {
      if (this.staff.avatar) this.destroy(this.staff.avatar.id)
      let formData = new FormData()
      formData.append('files', image)
      formData.append('refId', this.staff.id)
      formData.append('source', 's3')
      formData.append('field', 'avatar')
      this.upload(formData)
    },
    cancel() {
      this.image = this.staff.avatar
      this.$emit('cancel')
    },
    async compress(image) {
      const options = {
        maxSizeMB: 0.02,
        maxWidthOrHeight: 200,
        useWebWorker: true
      }
      return imageCompression(image, options)
    }
  },
  created() {
    this.image = this.staff.avatar || ''
  },
  watch: {
    staff(staff) {
      this.image = staff.avatar
    },
    url(url) {
      console.log(url)
    }
  }
}
</script>
