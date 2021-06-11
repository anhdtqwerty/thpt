<template>
  <v-card class="d-flex elevation-0 flex-column justify-center ma-8 mx-16 pa-4">
    <v-form ref="form">
      <p class="font-weight-bold">Thông tin năm học mới</p>
      <p class="font-weight-bold">Năm học mới</p>
      <v-row>
        <v-col class="pb-0" cols="12" md="6">
          <DateIOSPicker
            :date.sync="generationDateFrom"
            label="Ngày bắt đầu"
            dense
            outlined
            class="required"
            :rules="[$rules.required, $rules.date]"
          />
        </v-col>
        <v-col class="pb-0" cols="12" md="6">
          <DateIOSPicker
            :date.sync="generationDateTo"
            label="Ngày kết thúc"
            dense
            outlined
            class="required"
            :rules="[$rules.required, $rules.date]"
          />
        </v-col>
      </v-row>
      <p class="font-weight-bold">Học kỳ I</p>
      <v-row>
        <v-col class="pb-0" cols="12" md="6">
          <DateIOSPicker
            :date.sync="semester1DateFrom"
            label="Ngày bắt đầu"
            dense
            outlined
            class="required"
            :rules="[$rules.required, $rules.date]"
          />
        </v-col>
        <v-col class="pb-0" cols="12" md="6">
          <DateIOSPicker
            :date.sync="semester1DateTo"
            label="Ngày kết thúc"
            dense
            outlined
            class="required"
            :rules="[$rules.required, $rules.date]"
          />
        </v-col>
      </v-row>
      <p class="font-weight-bold">Học kỳ II</p>
      <v-row>
        <v-col class="pb-0" cols="12" md="6">
          <DateIOSPicker
            :date.sync="semester2DateFrom"
            label="Ngày bắt đầu"
            dense
            outlined
            class="required"
            :rules="[$rules.required, $rules.date]"
          />
        </v-col>
        <v-col class="pb-0" cols="12" md="6">
          <DateIOSPicker
            :date.sync="semester2DateTo"
            label="Ngày kết thúc"
            dense
            outlined
            class="required"
            :rules="[$rules.required, $rules.date]"
          />
        </v-col>
      </v-row>
    </v-form>

    <p class="text--secondary mt-4 mb-0">
      <span class="error--text">*</span> Vui lòng cung cấp các thông tin học kỳ thật chính xác. Thông tin này sẽ ảnh
      hưởng đến quá trình diễn ra năm học và các thông tin này sẽ không được phép thay đổi sau này.
    </p>

    <v-card-actions class="pa-0">
      <v-btn class="px-6 mt-4" outlined light depressed>Hủy</v-btn>
      <v-spacer />
      <v-btn @click="done" depressed color="primary" class="px-6 mt-4  white--text">Tiếp tục</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'

export default {
  components: { DateIOSPicker },
  data() {
    return {
      checkbox: false,
      generationDateFrom: '',
      generationDateTo: '',
      semester1DateFrom: '',
      semester1DateTo: '',
      semester2DateFrom: '',
      semester2DateTo: ''
    }
  },
  computed: {},
  methods: {
    done() {
      //   if (!this.$refs.form.validate()) return
      const params = {
        generationDateFrom: this.generationDateFrom,
        generationDateTo: this.generationDateTo,
        semester1DateFrom: this.semester1DateFrom,
        semester1DateTo: this.semester1DateTo,
        semester2DateFrom: this.semester2DateFrom,
        semester2DateTo: this.semester2DateTo
      }

      this.$emit('saveGenerationInfo', params)
    }
  }
}
</script>

<style lang="scss" scoped></style>
