<template>
  <v-dialog fullscreen v-model="dialog">
    <v-card>
      <v-toolbar dense class="elevation-0" color="#0D47A1" dark>
        <v-toolbar-title>LỌC TÌM KIẾM</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-form class="pa-2">
        <v-row no-gutters>
          <v-col class="mt-4" cols="12">
            <v-text-field
              v-model="name"
              placeholder="Tên học sinh"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col class="mt-4" cols="12">
            <v-text-field
              v-model="classes"
              clear-icon="mdi-close"
              placeholder="Lớp"
              clearable
              flat
              outlined
              dense
              return-object
              hide-details
            />
          </v-col>
          <v-col class="mt-4" cols="12">
            <date-iso-picker placeholder="Ngày sinh" outlined outline :date.sync="dob"></date-iso-picker>
          </v-col>
          <v-col class="mt-4" cols="12">
            <v-text-field
              v-model="code"
              clear-icon="mdi-close"
              placeholder="Mã học viên"
              flat
              outlined
              dense
              clearable
              hide-details
            />
          </v-col>
          <v-col class="mt-4" cols="12">
            <v-autocomplete
              v-model="status"
              :items="studentStatus"
              clear-icon="mdi-close"
              item-text="title"
              item-value="status"
              placeholder="Chọn trạng thái"
              flat
              outlined
              dense
              clearable
              hide-details
            ></v-autocomplete>
          </v-col>
          <v-col class="mt-4" cols="12">
            <v-autocomplete
              :items="genders"
              item-text="title"
              item-value="value"
              v-model="gender"
              placeholder="Giới tính"
              flat
              outlined
              dense
              clearable
              hide-details
            />
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn outlined color="#0D47A1" @click="onFilterChanged">
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import DateIsoPicker from '@/components/basic/picker/DateIOSPicker'
import moment from 'moment'

export default {
  components: {
    DateIsoPicker
  },
  props: {
    state: Boolean
  },
  data: () => ({
    dialog: false,
    show: false,
    status: 'active',
    code: '',
    dob: '',
    name: '',
    classes: [],
    gender: '',
    selectedCourse: [],
    genders: [
      { title: 'Nam', value: 'male' },
      { title: 'Nữ', value: 'female' },
      { title: 'Khác', value: 'other' }
    ]
  }),
  computed: {
    ...mapState('constant', ['studentStatus'])
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterDialogChanged', {
        name_contains: this.name,
        classes: this.classes,
        dob_gt: moment(this.dob)
          .startOf('month')
          .toISOString(),
        dob_lt: moment(this.dob)
          .endOf('month')
          .toISOString(),
        code_contains: this.code,
        status: this.status,
        gender: this.gender,
        _sort: 'createdAt:DESC'
      })
      this.cancel()
    },
    cancel() {
      this.dialog = false
      this.reset()
      this.$emit('cancel')
    },
    reset() {
      this.selectedCourse = ''
      this.generation = ''
      this.code = ''
      this.status = ''
      this.major = ''
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
