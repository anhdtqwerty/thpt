<template>
  <v-form>
    <v-row no-gutters>
      <v-col md="3">
        <v-text-field
          v-model="name"
          placeholder="Tên học sinh"
          return-object
          clearable
          flat
          filled
          dense
          hide-details
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="classes"
          clear-icon="mdi-close"
          placeholder="Lớp"
          clearable
          flat
          filled
          dense
          return-object
          hide-details
        />
      </v-col>
      <v-col cols="12" md="3">
        <date-picker @update:date="getDate"></date-picker>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="code"
          clear-icon="mdi-close"
          placeholder="Mã học viên"
          flat
          filled
          dense
          clearable
          hide-details
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="status"
          :items="studentStatus"
          clear-icon="mdi-close"
          item-text="title"
          item-value="status"
          placeholder="Chọn trạng thái"
          flat
          filled
          dense
          clearable
          hide-details
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="3">
        <v-autocomplete
          :items="genders"
          item-text="title"
          item-value="value"
          v-model="gender"
          placeholder="Giới tính"
          flat
          filled
          dense
          clearable
          hide-details
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-btn
          class="py-5"
          depressed
          color="#0D47A1"
          @click="onFilterChanged"
          dark
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import DatePicker from '@/components/basic/picker/DateIOSPicker'
import moment from 'moment'

export default {
  components: {
    DatePicker,
  },
  data: () => ({
    show: false,
    query: '',
    major: {},
    status: 'running',
    generation: '',
    code: '',
    dob: '',
    tags: '',
    selectedCourse: [],
    genders: [
      { title: 'Nam', value: 'male' },
      { title: 'Nữ', value: 'female' },
      { title: 'Khác', value: 'other' },
    ],
    start: moment().startOf('week').toISOString(),
    end: moment().endOf('week').toISOString()
  }),
  computed: {
    ...mapState('constant', ['studentStatus']),
  },
  methods: {
    onFilterChanged() {
      console.log(this.start)
      console.log(this.end)
      console.log(this.dob)
      this.$emit('onFilterChanged', {
        name_contains: this.name,
        classes: this.classes,
        dob_gt: this.start,
        dob_lt: this.end,
        code_contains: this.code,
        status: this.status,
        gender: this.gender,
        _sort: 'createdAt:desc',
      })
    },
    getDate(data) {
      this.dob = data
      this.start = this.start.startOf('day').toISOString()
      this.end = this.end.endOf('day').toISOString()
    }
  },
}
</script>
