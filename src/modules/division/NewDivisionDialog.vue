<template>
  <v-dialog
    v-model="dialog"
    width="400px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>THÊM BAN MỚI</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="dialog = false">close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            outlined
            dense
            v-model="title"
            class="required mt-4"
            :rules="[$rules.required, titleRule]"
            label="Tên ban"
          />
          <RadioAcademicLevel @change="academicLevel = $event" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row class="ma-2" no-gutters>
          <v-btn class="px-4" outlined light depressed @click="dialog = false"
            >Hủy</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="px-6"
            dark
            depressed
            color="#0D47A1"
            :loading="loading"
            @click="save"
            ><v-icon left>add</v-icon>Thêm</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RadioAcademicLevel from '@/modules/academicLevel/RadioAcademicLevel.vue'
import { textHelpers } from '@/helpers/TextHelper.js'

export default {
  components: { RadioAcademicLevel },
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false,
      loading: false,
      title: '',
      division: '',
      academicLevel: {},
      titleRule: v => {
        const title = textHelpers.removeSpaces(v)
        const d = this.divisions.find(
          d => d.title === title && d.academicLevel.id === this.academicLevel.id
        )
        return !d || 'Phân ban này đã tồn tại'
      }
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user']),
    ...mapState('division', ['divisions'])
  },
  methods: {
    ...mapActions('division', ['createDivision', 'fetchDivision']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        await this.createDivision({
          title: this.title,
          academicLevel: this.academicLevel.id
        })
        this.$alert.addSuccess()
        this.reset()
        this.dialog = false
      } catch (error) {
        this.$alert.addError()
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.title = ''
      this.$refs.form.resetValidation()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    state(state) {
      this.fetchDivision({})
      this.dialog = true
    },
    academicLevel: 'resetValidation'
  }
}
</script>
