<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Sửa {{ grade.title }}
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <grade-info-form v-bind:grade="grade" ref="form" />
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
          @click="save"
          >Lưu</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import GradeInfoForm from '@/components/basic/form/GradeForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    GradeInfoForm
  },
  props: {
    state: Boolean,
    grade: { type: Object, default: () => {} }
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
    ...mapActions('grade', ['updateGrade', 'fetchGrades']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      await this.updateGrade({ id: this.grade.id, ...data })
      this.$alert.success('Cập nhật thành công')
      this.$refs.form.reset()
      this.loading = false
      this.dialog = false
    },
    cancel() {
      this.dialog = false
      this.$refs.form.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
