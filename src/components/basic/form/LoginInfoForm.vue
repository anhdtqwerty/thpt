<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="phone"
          label="Số điện thoại"
          :rules="[rules.required]"
          class="required"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email Học Sinh"
          outlined
          dense
          class="required"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
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
    }
  },
  data: () => ({
    valid: true,
    show: false,
    phone: `${Date.now()}`,
    email: `random${Date.now()}@gmail.com`,
    password: '123123',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    if (this.student) {
      this.reset()
    }
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    getData() {
      return {
        phone: this.phone,
        email: this.email,
        password: this.password
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.phone = this.phone
      this.email = this.email
      this.password = this.password
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    student(student) {
      this.reset()
    }
  }
}
</script>
