<template>
  <v-dialog
    v-model="dialog"
    width="800px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="primary white--text "
        >Thêm Khen thưởng kỉ luật
        <v-spacer />
        <v-icon color="white" @click="dialog = false">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <violation-new-form
        ref="form"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          class="mr-4 mt-n4 mb-2 white--text"
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
