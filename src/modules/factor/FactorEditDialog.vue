<template>
  <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        >Sửa Đầu điểm
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <factor-form v-if="subject" :subject="subject" :factor="factor" ref="form" />
      <v-row class="pr-6 pb-6 mt-n7" no-gutters>
        <v-spacer></v-spacer>
        <v-btn class="px-6" dark depressed color="#0D47A1" :loading="loading" @click="save"
          ><v-icon left>mdi-content-save</v-icon>Lưu</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import FactorForm from '@/components/basic/form/FactorNewForm.vue'
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
    ...mapActions('factor', ['updateFactor']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      await this.updateFactor({
        ...data,
        subject: this.subject.id,
        id: this.factor.id
      })
      this.$alert.success('Cập nhật đầu điểm thành công')
      this.loading = false
      this.dialog = false
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
