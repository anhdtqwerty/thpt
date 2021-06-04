<template>
  <v-dialog v-model="dialog" width="620px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >SỬA HỒ SƠ MÔN HỌC
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-5">
        <SubjectEditForm :subject="subject" ref="form" :state="dialog" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn outlined class="gray--text" @click="cancel">HUỶ</v-btn>
        <v-btn color="primary" @click="save">LƯU</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import SubjectEditForm from '@/components/basic/form/SubjectEditForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    SubjectEditForm
  },
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapState('subjects', ['subject'])
  },

  methods: {
    ...mapActions('subjects', ['updateSubject']),
    async save() {
      try {
        const data = this.$refs.form.getData()
        if (!data) return
        this.$loading.active = true
        await this.updateSubject({ id: this.subject.id, ...data })
        this.$alert.success('Cập nhật thành công')
        this.dialog = false
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.dialog = false
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
