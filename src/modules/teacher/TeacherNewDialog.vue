<template>
  <v-dialog :fullscreen="isMobile" width="604" v-model="dialog">
    <v-card>
      <v-toolbar color="#0D47A1" dark dense class="elevation-0 px-2 mb-6">
        <v-toolbar-title>THÊM MỚI GIÁO VIÊN</v-toolbar-title>
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
          dense
          outlined
          @blur="nameLostFocus()"
        ></v-text-field>

        <v-text-field
          :rules="[rules.required]"
          v-model="username"
          outlined
          dense
          label="Mã Nhân Viên"
          disabled
        ></v-text-field>

        <v-text-field
          :rules="[rules.required]"
          v-model="phone"
          outlined
          dense
          label="Số điện thoại"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email"
          :error-messages="emailError"
          validate-on-blur
          outlined
          dense
          :rules="[rules.required]"
          @blur="emailLostFocus()"
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
        ></v-text-field>

        <autocomplete-major
          v-model="majors"
          item-text="title"
          item-value="id"
          outlined
          dense
          label="Chuyên Ngành"
          required
          multiple
        ></autocomplete-major>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import AutocompleteMajor from '@/components/basic/input/AutocompleteRootMajor.vue'

export default {
  components: { AutocompleteMajor },
  data() {
    return {
      dialog: false,
      loading: 0,
      name: '',
      phone: '',
      email: '',
      lastemail: '',
      username: '',
      username_indexing: '',
      username_no: 0,
      role: '',
      majors: '',
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

  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted() {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },
  props: {
    state: Boolean
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapGetters('app', ['roleIdByName']),
    isLoading() {
      return this.loading > 0
    }
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    ...mapActions('teacher', ['createTeacher']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        await this.createTeacher({
          data: {
            name: this.name,
            phone: this.phone,
            username: this.username,
            username_indexing: this.username_indexing,
            username_no: this.username_no,
            status: 'active',
            role: this.roleIdByName('Teacher'),
            department: this.department.id,
            email: this.email,
            majors: this.majors.filter(m => !!m),
            password: this.password
          }
        })
        this.dialog = false
        this.reset()
      } catch (e) {}
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
      this.majors = ''
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

<style>
.v-data-footer {
  flex-wrap: nowrap;
}

.v-data-footer__icons-before {
  order: -1;
}
</style>
