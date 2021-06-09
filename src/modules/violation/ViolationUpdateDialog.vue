<template>
  <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown" scrollable>
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>Sửa KTKL</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-card-text>
        <violation-edit-form v-bind:violation="violation" ref="form" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end">
        <v-btn class="ma-2" outlined light depressed @click="cancel">Hủy</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" :loading="loading" @click="save">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ViolationEditForm from '@/components/basic/form/ViolationForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ViolationEditForm
  },
  props: {
    state: Boolean,
    violation: { type: Object, default: () => {} }
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
    ...mapActions('violation', ['updateViolation', 'fetchViolation']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      console.log(data)
      await this.updateViolation({
        id: this.violation.id,
        class: this.classData,
        ...data
      })
      this.$alert.success('Cập nhật thành công')
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
    }
  }
}
</script>
