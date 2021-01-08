<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>THÊM BAN MỚI</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="dialog=false">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <division-info-form ref="form" :editCode="true" />
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
import DivisionInfoForm from '@/components/basic/form/DivisionNewForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    DivisionInfoForm
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
    ...mapActions('division', ['createDivision']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      console.log(data)
      await this.createDivision({ ...data })
      this.$alert.success('Tạo phân ban mới thành công')
      this.$refs.form.resetDefault()
      this.loading = false
      this.dialog = false
    },
    cancel() {
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
