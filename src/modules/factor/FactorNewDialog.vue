<template>
  <v-dialog v-model="dialog" width="620px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        >THÊM ĐẦU ĐIỂM MỚI
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <div class="d-flex flex-row pt-5">
          <div class="d-flex flex-column mr-10">
            <span>Môn học</span>
            <h3>{{ subject.title }}</h3>
          </div>
          <div class="d-flex flex-column mr-10">
            <span>Khối</span>
            <h3>{{ subject && subject.grade && subject.grade.gradeNumber }}</h3>
          </div>
          <div class="d-flex flex-column mr-10">
            <span>Ban</span>
            <h3>{{ subject.division && subject.division.title }}</h3>
          </div>
          <div class="d-flex flex-column mr-10">
            <span>Đánh giá theo</span>
            <h3>{{ subject.markType | getMarkType }}</h3>
          </div>
        </div>

        <div class="d-flex flex-row pt-5">
          <p class="mr-5">Đầu điểm</p>
          <p>Điểm kiểm tra miệng</p>
        </div>
        <FactorNewForm ref="form" :state="dialog" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn depressed outlined @click="cancel">Huỷ</v-btn>
        <v-btn depressed color="primary" :loading="loading" @click="save">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FactorNewForm from '@/components/basic/form/FactorNewForm.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    FactorNewForm
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
    ...mapState('subjects', ['subject'])
  },
  methods: {
    ...mapActions('factor', ['createFactor']),
    async save() {
      try {
        const data = this.$refs.form.getData()
        if (!data) return
        this.loading = true
        await this.createFactor({ ...data, subject: this.subject.id })
        this.$alert.success('Tạo đầu điểm mới thành công')
        this.dialog = false
      } catch (error) {
        this.$alert.addError()
      } finally {
        this.loading = false
      }
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
