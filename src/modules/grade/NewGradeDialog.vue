<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>THÊM KHỐI MỚI</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="dialog = false">close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
      <create-grade-form ref="form" :editCode="true" />
      </v-card-text>
      <v-card-actions>
        <v-row class="pa-2" no-gutters>
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
      </v-card-actions>
      
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
