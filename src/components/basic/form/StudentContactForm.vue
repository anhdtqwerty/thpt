<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12">
        <v-text-field v-model="currentLive" label="Địa chỉ hiện tại" outlined hide-details dense></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-autocomplete
          v-model="province"
          label="Tỉnh/Thành phố"
          :items="provinces"
          item-text="name"
          @change="onChangePrivince"
          outlined
          dense
          hide-details
          return-object
        ></v-autocomplete>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-autocomplete
          v-model="district"
          label="Quận/Huyện"
          :items="currentProvinceDistricts"
          item-text="name"
          outlined
          hide-details
          dense
          return-object
        ></v-autocomplete>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="phone" label="Số điện thoại" outlined dense :rules="[$rules.phone]"></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="email" label="Email" outlined dense :rules="[rules.email]"></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { province } from '@/jsons/province'
import { district } from '@/jsons/district'
export default {
  props: {
    student: {
      type: [Object],
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    currentLive: '',
    provinces: [],
    province: {},
    districts: [],
    currentProvinceDistricts: [],
    district: {},
    phone: '',
    email: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    if (this.student) {
      this.currentLive = this.student.data.currentLive
      this.provinces = this.student.data.province
      this.district = this.student.data.district
      this.phone = this.student.phone
      this.email = this.student.email
    }
    this.provinces = province
    this.districts = district
  },
  methods: {
    onChangePrivince() {
      this.currentProvinceDistricts = this.districts.filter(d => d.parent_code === this.province.code)
    },
    validate() {
      return this.$refs.form.validate()
    },
    getData() {
      return {
        currentLive: this.currentLive,
        province: this.province,
        district: this.district,
        phone: this.phone,
        email: this.email
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped></style>
