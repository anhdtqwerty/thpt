<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="password"
          label="Mật Khẩu"
          outlined
          dense
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          hint="At least 6 characters"
          class="required"
        ></v-text-field>
        <v-text-field
          v-model="retypePassword"
          label="Nhập Lại Mật Khẩu"
          outlined
          dense
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          hint="At least 6 characters"
          class="required"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
// import { get } from 'lodash'

export default {
  props: {
    student: {
      type: [Object],
      default: () => {}
    },
    teacher: {
      type: [Object],
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    show: false,
    phone: '',
    email: '',
    password: '',
    retypePassword: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    this.reset(this.student ? this.student.contact : this.teacher)
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    getData() {
      return {
        password: this.password
      }
    },
    validate() {
      if (this.password !== this.retypePassword) {
        this.$alert.error('Mật khẩu nhập lại không khớp')
        return false
      }
      return this.$refs.form.validate()
    },
    reset(user) {
      this.password = ''
      this.retypePassword = ''
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
