<template>
  <v-dialog
    v-model="dialog"
    width="600"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-card >
      <v-card-title class="primary white--text "
        ><v-toolbar-title>THÊM KHEN THƯỞNG KỈ LUẬT</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="dialog = false">close</v-icon>
      </v-card-title>
      <v-card-text>
        <violation-new-form
        ref="form"
      />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          class="ma-2 white--text"
          @click="save"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ViolationNewForm from '@/components/basic/form/ViolationNewForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ViolationNewForm
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
    ...mapActions('violation', ['createViolation']),
    async save() {
      if (!this.$refs.form.validate()) return
      this.loading = true
      const data = this.$refs.form.getData()
      await this.createViolation({ ...data, class: data.classData })
      this.$alert.success('Tạo mới thành công')
      this.$refs.form.resetDefault()
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
