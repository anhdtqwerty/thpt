<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mobile" v-model="dialog" width="420">
    <v-card>
      <v-toolbar dense class="elevation-0" color="#0D47A1" dark>
        <v-toolbar-title>Thêm Mới Học Sinh</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-form ref="form" class="pa-4">
        <h3>1. Thông tin cơ bản</h3>
        <v-text-field
          :rules="[rules.required]"
          v-model="name"
          label="Họ và Tên đệm"
          @blur="nameLostFocus()"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          :rules="[rules.required]"
          v-model="username"
          disabled
          label="Mã Học Sinh"
          outlined
          dense
        ></v-text-field>
        <date-picker></date-picker>
        <h3>2. Thông tin liên lạc</h3>
        <v-text-field
          v-model="email"
          label="Email"
          :error-messages="emailError"
          validate-on-blur
          @blur="emailLostFocus()"
          outlined
          dense
        ></v-text-field>
        <h3>3. Thông tin gia đình</h3>
        <v-text-field
          :rules="[rules.required]"
          v-model="phone"
          label="Số điện thoại"
          outlined
          dense
        ></v-text-field>
      </v-form>
      <v-card-actions class="px-4">
        <v-spacer></v-spacer>
        <v-btn dark color="#0D47A1" @click="save" :disabled="isLoading" dense>Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DatePicker from '@/components/basic/picker/DateIOSPicker'

import { get } from 'lodash'
export default {
  components: {
    DatePicker
  },
  data () {
    return {
      dialog: false,
      loading: 0,
      name: '',
      major: '',
      classes: [],
      rootMajor: {},
      generation: '',
      phone: '',
      email: '',
      lastemail: '',
      username: '',
      username_indexing: '',
      username_no: 0,
      role: '',
      show: false,
      password: '',
      emailError: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 6 || 'Min 8 characters',
        email: (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      }
    }
  },
  props: {
    state: Boolean,
    hideAdvanceOption: Boolean,
    defaultPhone: String,
    defaultEmail: String,
    defaultName: String
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapGetters('app', ['roleIdByName', 'roles']),
    isLoading () {
      return this.loading > 0
    },
    majors () {
      return this.rootMajor.majors || []
    }
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    ...mapActions('students', ['createStudent']),
    async save () {
      if (!this.$refs.form.validate()) return
      const student = await this.createStudent({
        name: this.name,
        phone: this.phone + '',
        majors: [this.major.id].filter((m) => !!m),
        classes: this.classes.map(c => c.id),
        rootMajor: get(this.rootMajor, 'id'),
        generation: get(this.generation, 'id'),
        username: this.username,
        username_indexing: this.username_indexing,
        username_no: this.username_no,
        status: 'active',
        role: this.roleIdByName('Student'),
        department: this.department.id,
        email: this.email,
        password: this.password
      })
      this.dialog = false
      this.reset()
      this.$emit('done', student)
    },
    async nameLostFocus () {
      const {
        username,
        // eslint-disable-next-line
        username_indexing,
        // eslint-disable-next-line
        username_no,
      } = await this.generateUserName(this.name)
      this.username = username
      // eslint-disable-next-line
      this.username_indexing = username_indexing
      // eslint-disable-next-line
      this.username_no = username_no
    },
    async emailLostFocus () {
      try {
        this.loading += 1
        if (this.email !== this.lastemail) {
          this.emailError = await this.validateEmail(this.email)
        }
        this.lastemail = this.email
      } finally {
        this.loading -= 1
      }
    },
    cancel () {
      this.dialog = false
      this.reset()
      this.$emit('cancel')
    },
    reset () {
      this.name = ''
      this.username = ''
      this.phone = ''
      this.status = 'active'
      this.password = ''
      this.email = ''
    }
  },
  watch: {
    state (state) {
      this.dialog = true
      this.phone = this.defaultPhone || ''
      this.email = this.defaultEmail || ''
      this.name = this.defaultName || ''
      if (this.defaultName) {
        this.nameLostFocus()
      }
    },
    rootMajor () {}
  }
}
</script>
