<template>
  <v-form v-bind="this.$attrs">
    <v-row class="py-3">
      <v-col cols="10">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="name"
              label="Tên học sinh"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
              @keyup.enter="onFilterChanged"
            />
          </v-col>
          <v-col cols="4">
            <autocomplete-class
              v-model="classes"
              clear-icon="mdi-close"
              label="Lớp"
              clearable
              outlined
              dense
              return-object
              hide-details
            />
          </v-col>
          <v-col cols="4">
            <DateIOSPicker
              label="Ngày sinh"
              outlined
              dense
              hide-details
              outline
              :date.sync="dob"
              @onEnterPress="onFilterChanged"
            ></DateIOSPicker>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="code"
              clear-icon="mdi-close"
              label="Mã học viên"
              flat
              outlined
              dense
              clearable
              hide-details
              @keyup.enter="onFilterChanged"
            />
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="status"
              :items="studentStatus"
              clear-icon="mdi-close"
              item-text="title"
              item-value="status"
              label="Chọn trạng thái"
              outlined
              dense
              clearable
              hide-details
            />
          </v-col>
          <v-col cols="4">
            <v-select
              :items="genders"
              item-text="title"
              item-value="value"
              v-model="gender"
              label="Giới tính"
              outlined
              dense
              clearable
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex align-end" cols="2">
        <v-btn height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          Tìm kiếm
        </v-btn>
      </v-col>
      <!-- <v-col cols="12" md="10" v-else>
        <v-row no-gutters>
          <v-col cols="12" md="4" class="pt-md-2">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              v-model="code"
              clear-icon="mdi-close"
              clearable
              label="Tìm học sinh"
              outlined
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
              @change="onFilterChanged"
            />
          </v-col>
        </v-row>
      </v-col> -->
      <!-- <v-col class="py-2 d-flex" cols="12" md="2">
        <v-spacer />
        <v-checkbox
          class="mt-n1 pt-3"
          v-model="advanced"
          label="Tìm kiếm nhanh"
        ></v-checkbox>
      </v-col> -->
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import moment from 'moment'
import { textHelpers } from '@/helpers/TextHelper'
import utils from '@/plugins/utils'

export default {
  components: {
    DateIOSPicker,
    AutocompleteClass
  },
  data: () => ({
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
    ],
    classData: ''
  }),
  props: {
    defaultFilters: Object
  },
  computed: {
    ...mapState('constant', ['studentStatus'])
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        tags_contains: textHelpers.removeSpaces(utils.clearUnicode(this.name)),
        currentClass: get(this.classes, 'id', ''),
        dob_gte: moment(this.dob)
          .startOf('day')
          .toISOString(),
        dob_lte: moment(this.dob)
          .endOf('day')
          .toISOString(),
        code_contains: textHelpers.removeSpaces(this.code),
        status: this.status,
        gender: this.gender,
        _sort: 'createdAt:DESC'
      })
    }
  },
  watch: {
    defaultFilters(filters) {
      if (filters) {
        this.code = get(filters, 'code')
      }
    }
  }
}
</script>
