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
          label="Email"
          outlined
          dense
          class="required"
          :rules="[rules.required, rules.email]"
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
        phone: this.phone,
        email: this.email
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset(user) {
      this.phone = user ? user.phone : ''
      this.email = user ? user.email : ''
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    student(student) {
      this.reset(student.contact || {})
    },
    teacher(teacher) {
      this.reset(teacher)
    }
  }
}
</script>
