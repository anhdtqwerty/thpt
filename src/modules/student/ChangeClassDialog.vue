<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mobile"
    v-model="dialog"
    width="661"
  >
    <v-card>
      <v-toolbar dense class="elevation-0" color="#0D47A1" dark>
        <v-toolbar-title>Chuyển lớp cho học sinh</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />

      <v-form ref="form" class="pa-6">
        <h4>{{ currentGeneration.description }}</h4>
        <v-text-field v-model="item.grade" outlined dense></v-text-field>
        <v-text-field v-model="item.classes[0].title" outlined dense></v-text-field>
        <v-text-field outlined dense placeholder="Chuyển sang lớp mới"></v-text-field>
      </v-form>
      <v-card-actions class="px-4">
        <v-spacer></v-spacer>
        <v-btn dark color="#0D47A1" @click="save" :disabled="isLoading" dense
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { get } from 'lodash'

export default {
  data() {
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
        email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      },
    }
  },
  props: {
    state: Boolean,
    hideAdvanceOption: Boolean,
    defaultPhone: String,
    defaultEmail: String,
    defaultName: String,
    item: Object,
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('app', ['currentGeneration']),
    ...mapGetters('app', ['roleIdByName', 'roles']),
    isLoading() {
      return this.loading > 0
    },
    majors() {
      return this.rootMajor.majors || []
    },
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    ...mapActions('student', ['createStudent']),
    async save() {
      if (!this.$refs.form.validate()) return
      const studentGeneralForm = this.$refs.studentGeneralForm.getData()
      const studentContactForm = this.$refs.studentContactForm.getData()
      const studentNoteForm = this.$refs.studentNoteForm.getData()
      const studentFamilyForm = this.$refs.studentFamilyForm.getData()
      this.createStudent({
        data: {
          name: studentGeneralForm.name,
          phone: studentContactForm.phone,
          address: studentContactForm.currentLive,
          notes: studentNoteForm.notes,
          email: studentContactForm.email,
          gender: studentGeneralForm.gender,
          dob: studentGeneralForm.dob,
          data: {
            ...studentGeneralForm,
            ...studentContactForm,
            ...studentFamilyForm,
            ...studentNoteForm,
          },
        },
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
        username_no,
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
      this.$emit('cancel')
    },
    reset() {
      this.name = ''
      this.username = ''
      this.phone = ''
      this.status = 'active'
      this.password = ''
      this.email = ''
    },
  },
  watch: {
    state(state) {
      this.dialog = true
      this.phone = this.defaultPhone || ''
      this.email = this.defaultEmail || ''
      this.name = this.defaultName || ''
      if (this.defaultName) {
        this.nameLostFocus()
      }
    },
    rootMajor() {},
  },
}
</script>
