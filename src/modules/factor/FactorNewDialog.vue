<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        >Thêm Đầu điểm
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <factor-form v-if="subject" :subject="subject" ref="form" />
      <v-row class="pr-6 pb-6 mt-n7" no-gutters>
        <v-spacer></v-spacer>
        <v-btn
          class="px-6"
          dark
          depressed
          color="#0D47A1"
          :loading="loading"
          @click="save"
          ><v-icon left>add</v-icon>Thêm</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import FactorForm from '@/components/basic/form/factorForm.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    FactorForm
  },
  props: {
    state: Boolean,
    factor: Object,
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
    ...mapActions('factor', ['createFactor']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      await this.createFactor({ ...data, subject: this.subject.id })
      this.$alert.success('Tạo đầu điểm mới thành công')
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
    }
  }
}
</script>
