<template>
  <v-form>
    <v-row no-gutters>
      <v-col cols="12" md="8" v-if="advanced">
        <v-row no-gutters>
          <v-col
            class="py-2 pr-4"
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="name"
              label="Tên học sinh"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col
            class="py-2 pr-4"
            cols="12"
            md="4"
          >
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
          <v-col
            class="py-2 pr-4"
            cols="12"
            md="4"
          >
            <date-picker
              label="Ngày sinh"
              placeholder="DD/MM/YYYY"
              outlined
              dense
              hide-details
              outline
              :date.sync="dob"
            ></date-picker>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            class="py-2 pr-4"
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="code"
              clear-icon="mdi-close"
              label="Mã học viên"
              flat
              outlined
              dense
              clearable
              hide-details
            />
          </v-col>
          <v-col
            class="py-2 pr-4"
            cols="12"
            md="4"
          >
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
          <v-col
            class="py-2 pr-4"
            cols="12"
            md="4"
          >
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
      <v-col cols="12" md="8" v-else>
        <v-row no-gutters>
          <v-col cols="12" md="4" class="pt-md-2">
            <AutocompleteClass
              prepend-inner-icon="mdi-magnify"
              v-model="classData"
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              label="Tìm kiếm Lớp"
              outlined
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
              @change="onFilterChanged"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="py-2 d-flex" cols="12" md="4">
        <v-btn v-if="advanced" height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
        <v-spacer />
        <v-checkbox
        class="mt-n1 pt-3"
          v-model="advanced"
          label="Nâng cao"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import moment from 'moment'

export default {
  components: {
    DatePicker,
    AutocompleteClass,
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
      { title: 'Khác', value: 'other' },
    ],
    advanced: false,
    classData: ''
  }),
  computed: {
    ...mapState('constant', ['studentStatus']),
  },
  methods: {
    onFilterChanged() {
      console.log(this.classes)

      this.$emit('onFilterChanged', {
        name_contains: this.name,
        classes: get(this.classes, 'id', ''),
        dob_gt: moment(this.dob).startOf('month').toISOString(),
        dob_lt: moment(this.dob).endOf('month').toISOString(),
        code_contains: this.code,
        status: this.status,
        gender: this.gender,
        _sort: 'createdAt:desc',
      })
    },
  },
}
</script>
