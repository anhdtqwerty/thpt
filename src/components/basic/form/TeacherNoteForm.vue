<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class=" pb-0" cols="12">
        <v-textarea v-model="notes" label="Ghi chú" outlined dense rows="3"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 pt-4" cols="12" md="3">
        <v-checkbox class="pa-0 ma-0" v-model="isYoung" label="Đội viên" hide-details></v-checkbox>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <date-picker
          :disabled="!isYoung"
          :date.sync="youngJoinedDate"
          :rules="isYoung ? [$rules.date] : []"
          label="Ngày vào Đội"
          outlined
          dense
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 pt-4" cols="12" md="3">
        <v-checkbox class="pa-0 ma-0" v-model="isCommunist" label="Đoàn viên" hide-details></v-checkbox>
      </v-col>
      <v-col cols="12" md="6">
        <date-picker
          :disabled="!isCommunist"
          :date.sync="communistJoinedDate"
          :rules="isCommunist ? [$rules.date] : []"
          label="Ngày vào Đoàn"
          dense
          outlined
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'

export default {
  components: {
    DatePicker
  },
  props: {
    teacher: Object,
    formState: Boolean
  },
  data: () => ({
    notes: '',
    youngJoinedDate: '',
    communistJoinedDate: '',
    isCommunist: false,
    isYoung: false
  }),
  computed: {},
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.teacher) {
        this.notes = this.teacher.notes
        this.youngJoinedDate = get(this.teacher, 'metadata.youngJoinedDate')
        this.communistJoinedDate = get(this.teacher, 'metadata.communistJoinedDate')
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    getData() {
      return {
        notes: this.notes,
        youngJoinedDate: this.youngJoinedDate,
        communistJoinedDate: this.communistJoinedDate
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    formState(formState) {
      if (!formState) {
        this.initData()
      }
    }
  }
}
</script>

<style scoped></style>
