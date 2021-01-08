<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>THÊM KHỐI MỚI</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="dialog = false">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <create-grade-form ref="form" :editCode="true" />
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
import CreateGradeForm from '@/components/basic/form/CreateGradeForm.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    CreateGradeForm
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
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('grade', ['createGrade']),
    async save() {
      if (!this.$refs.form.validate()) return
      this.loading = true
      const data = this.$refs.form.getData()
      await this.createGrade({ ...data })
      this.$alert.success('Tạo phân ban mới thành công')
      this.loading = false
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
