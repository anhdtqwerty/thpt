<template>
  <v-form>
    <v-row>
      <v-col md="3">
        <v-text-field
          v-model="name"
          label="Tên học sinh"
          placeholder="Tìm Tên"
          return-object
          clearable
          flat
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col md="3">
        <AutocompleteClass
          v-model="classes"
          clear-icon="mdi-close"
          placeholder="Tìm kiếm lớp"
          label="Lớp"
          clearable
          flat
          outlined
          dense
          return-object
          hide-details
        />
      </v-col>
      <v-col md="3">
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
      <v-col md="3">
        <v-btn height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
export default {
  components: { AutocompleteClass },
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
    ]
  }),
  computed: {
    ...mapState('constant', ['studentStatus'])
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
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
        _sort: 'createdAt:desc'
      })
    }
  }
}
</script>
