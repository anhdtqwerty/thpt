<template>
  <v-row class="pa-4">
    <v-col cols="12" md="4" class="text-center">
      <h2>{{ student.name }}</h2>
      <user-avatar-picker :student="student" />
    </v-col>

    <v-col cols="12" md="4">
      <h3 class="mb-4">Thời gian bảo lưu</h3>
      <date-picker
        @update:date="updateStartDate"
        :date="startDate"
        label="Ngày bắt đầu"
      ></date-picker>
      <date-picker
        @update:date="updateEndDate"
        :date="endDate"
        label="Ngày kết thúc"
      ></date-picker>
      <v-textarea v-model="notes" label="Ghi chú" outlined></v-textarea>
    </v-col>

    <v-col cols="12" md="4" class="text-right">
      <v-btn
        depressed
        medium
        color="primary"
        class="mr-2"
        @click="save"
        :loading="loading"
        >Bảo Lưu</v-btn
      >
      <v-btn depressed medium right @click="activeStudent">Kích hoạt</v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import DatePicker from '@/components/basic/picker/DateIOSPicker'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'

export default {
  components: {
    DatePicker,
    UserAvatarPicker,
  },
  props: {
    student: Object,
  },
  data() {
    return {
      tab: null,
      notes: '',
      loading: false,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    }
  },
  created() {
    this.startDate = this.student.reservation.startDate || this.startDate
    this.endDate = this.student.reservation.endDate || this.endDate
    this.notes = this.student.reservation.notes || this.notes
  },
  methods: {
    ...mapActions('student', ['updateStudent']),
    reset() {
      this.$refs.form.reset()
    },

    async save() {
      this.loading = true
      await this.updateStudent({
        id: this.student.id,
        status: 'reserved',
        reservation: {
          notes: this.notes,
          startDate: this.startDate,
          endDate: this.endDate,
        },
      })
      this.loading = false
    },
    async activeStudent() {
      this.loading = true
      await this.updateStudent({
        id: this.student.id,
        status: 'active',
        reservation: {},
      })
      this.loading = false
    },
    updateStartDate(value) {
      this.startDate = value
    },
    updateEndDate(value) {
      this.endDate = value
    },
  },
}
</script>
