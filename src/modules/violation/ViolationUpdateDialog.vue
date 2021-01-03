<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Sửa Khen thưởng kỉ luật
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <violation-edit-form v-bind:violation="violation" ref="form" />
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
          @click="save()"
          >Lưu</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import ViolationEditForm from '@/components/basic/form/ViolationForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ViolationEditForm,
  },
  props: {
    state: Boolean,
    violation: { type: Object, default: () => {} },
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
    ...mapActions('violation', ['updateViolation','fetchViolation']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      console.log(data)
      await this.updateViolation({
        id: this.violation.id,
        class: this.classData,
        ...data,
      })
      this.$alert.success('Cập nhật thành công')
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
