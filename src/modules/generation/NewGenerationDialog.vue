<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text ">
          <v-toolbar-title>THÊM KHÓA MỚI</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon @click="cancel">close</v-icon>
          </v-btn>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <generation-info-form ref="form" :editCode="true" />
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn class="px-4" depressed color="primary" :loading="loading" @click="save"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GenerationInfoForm from '@/components/basic/form/GenerationForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    GenerationInfoForm,
  },
  props: {
    state: Boolean,
  },
  data() {
    return {
      dialog: false,
      loading: false,
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('generation', ['createGeneration']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      await this.createGeneration({ ...data })
      this.$alert.success('Tạo niên khóa mới thành công')
      this.$refs.form.resetDefault()
      this.loading = false
      this.dialog = false
    },
    cancel() {
      this.dialog = false
      this.$refs.form.resetDefault()
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>
