<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Sửa {{ subject.title }}
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <subject-info-form :subject="subject" ref="form" />
      <v-row class="pr-6 pb-6 mt-n7" no-gutters>
        <v-spacer></v-spacer>
        <v-btn
          class="px-6 mx-4 blue--text"
          color="#E3F2FD"
          dark
          depressed
          @click="cancel"
          >Hủy</v-btn
        >
        <v-btn
          class="px-6"
          dark
          depressed
          color="#0D47A1"
          :loading="loading"
          @click="save"
          >Lưu</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import SubjectInfoForm from '@/components/basic/form/SubjectForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    SubjectInfoForm
  },
  props: {
    state: Boolean,
    subject: Object
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user'])
  },

  methods: {
    ...mapActions('subjects', ['updateSubject']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      await this.updateSubject({ id: this.subject.id, ...data })
      this.$alert.success('Cập nhật thành công')
      this.$refs.form.resetDefault()
      this.loading = false
      this.dialog = false
    },
    cancel() {
      this.dialog = false
      this.$refs.form.resetDefault()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    },
    subject() {}
  }
}
</script>
