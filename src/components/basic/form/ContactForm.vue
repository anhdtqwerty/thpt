<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="name" :rules="nameRules" label="Tên học sinh" required></v-text-field>
    <v-text-field v-model="phone" :rules="phoneRules" label="Số điện thoại" required></v-text-field>

    <v-text-field v-model="email" label="email học sinh"></v-text-field>
    <v-checkbox v-model="hasParent" label="Thêm thông tin phụ huynh"></v-checkbox>
    <v-text-field
      v-if="hasParent"
      v-model="parentName"
      :rules="nameRules"
      label="Tên Phụ Huynh"
      required
    ></v-text-field>
    <v-text-field
      v-if="hasParent"
      v-model="parentPhone"
      :rules="phoneRules"
      label="Số điện thoại phụ huynh"
      required
    ></v-text-field>

    <v-text-field
      v-if="hasParent"
      :rules="emailRules"
      v-model="parentEmail"
      label="Email phụ huynh"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    phone: '',
    facebook: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    email: '',
    hasParent: true,
    nameRules: [v => !!v || 'Tiêu đề chương không được để trống'],
    phoneRules: [
      v => v.length >= 10 || 'Số điện thoại phải có ít nhất 10 ký tự'
    ],

    emailRules: [v => /.+@.+/.test(v) || 'E-mail chưa hợp lệ']
  }),
  props: {
    contact: {
      type: Object,
      default: function () {
        return {
          name: '',
          email: '',
          phone: '',
          parentName: '',
          parentPhone: '',
          parentEmail: ''
        }
      }
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.name = this.contact.name
      this.email = this.contact.email
      this.phone = this.contact.phone
      this.parentName = this.contact.parentName
      this.parentEmail = this.contact.parentEmail
      this.parentPhone = this.contact.parentPhone
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        name: this.name,
        email: this.email,
        phone: this.phone,
        parentName: this.parentName,
        parentEmail: this.parentEmail,
        parentPhone: this.parentPhone
      }
    }
  },
  created () {
    this.reset()
  },
  watch: {
    contact () {
      this.reset()
    }
  }
}
</script>
