<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12">
        <v-text-field
          v-model="currentLive"
          label="Địa chỉ liên hệ hiện tại"
          outlined
          dense
          class="required"
          :rules="[$rules.required]"
        />
      </v-col>
      <v-col class="pt-0" cols="12" md="6">
        <v-text-field v-model="district" label="Quận/ Huyện" outlined hide-details dense />
      </v-col>
      <v-col class="pt-0" cols="12" md="6">
        <v-text-field ref="province" v-model="province" label="Tỉnh/ Thành phố" outlined hide-details dense />
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="phone"
          label="Điện thoại"
          outlined
          dense
          type="number"
          class="required"
          min="0"
          :rules="[$rules.required]"
        />
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          dense
          required
          class="required"
          :rules="[$rules.required, $rules.email]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { get } from 'lodash'
export default {
  props: {
    teacher: Object,
    formState: Boolean
  },
  data: () => ({
    currentLive: '',
    province: '',
    district: '',
    phone: '',
    email: ''
  }),
  computed: {},
  created() {
    this.initData()
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    initData() {
      if (this.teacher) {
        this.currentLive = get(this.teacher, 'metadata.currentLive')
        this.province = get(this.teacher, 'metadata.province')
        this.district = get(this.teacher, 'metadata.district')
        this.phone = this.teacher.phone
        this.email = this.teacher.email
      }
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
