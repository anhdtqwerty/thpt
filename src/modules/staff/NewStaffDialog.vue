<template>
  <v-dialog :fullscreen="isMobile" width="604" v-model="dialog">
    <v-card>
      <v-toolbar color="#0D47A1" dark dense class="elevation-0 px-2 mb-6">
        <v-toolbar-title>THÊM MỚI NHÂN VIÊN</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="cancel" class="white--text">close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form class="py-4 px-4" ref="form">
        <v-text-field
          :rules="[rules.required]"
          v-model="name"
          label="Họ và Tên"
          @blur="nameLostFocus()"
          outlined
        ></v-text-field>
        <v-text-field
          outlined
          :rules="[rules.required]"
          v-model="username"
          label="Mã Nhân Viên"
          disabled
        ></v-text-field>
        <v-text-field
          outlined
          :rules="[rules.required]"
          v-model="phone"
          label="Số điện thoại"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          :error-messages="emailError"
          validate-on-blur
          @blur="emailLostFocus()"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Mật Khẩu"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          hint="At least 6 characters"
          outlined
        ></v-text-field>
        <v-select
          :items="roles"
          label="Loại"
          item-value="id"
          item-text="description"
          v-model="role"
          outlined
        ></v-select>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="isLoading"
          depressed
          class="mr-2 mb-4"
          color="success"
          medium
          @click="save"
          :disabled="isLoading"
        >
          <v-icon left>add</v-icon>
          <span>Thêm</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      loading: 0,
      name: '',
      phone: '',
      email: '',
      lastemail: '',
      username: this.username,
      username_indexing: this.username_indexing,
      username_no: this.username_no,
      role: '',
      show: false,
      password: '',
      emailError: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 8 characters',
        email: v => /.+@.+/.test(v) || 'E-mail must be valid'
      },
      isMobile: false
    }
  },
  props: {
    state: Boolean
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    isLoading() {
      return this.loading > 0
    }
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted() {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    ...mapActions('staff', ['createStaff']),
    save() {
      this.createStaff({
        name: this.name,
        phone: this.phone,
        username: this.username,
        username_indexing: this.username_indexing,
        username_no: this.username_no,
        status: 'active',
        role: this.role,
        department: this.department.id,
        email: this.email,
        password: this.password
      })
      this.dialog = false
      this.reset()
    },
    async nameLostFocus() {
      const {
        username,
        // eslint-disable-next-line
        username_indexing,
        // eslint-disable-next-line
        username_no
      } = await this.generateUserName(this.name)
      this.username = username
      // eslint-disable-next-line
      this.username_indexing = username_indexing
      // eslint-disable-next-line
      this.username_no = username_no
    },
    async emailLostFocus() {
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
    cancel() {
      this.dialog = false
      this.reset()
    },
    reset() {
      this.name = ''
      this.username = ''
      this.phone = ''
      this.password = ''
      this.email = ''
      this.emailError = ''
    },
    onResize() {
      if (window.innerWidth < 600) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
