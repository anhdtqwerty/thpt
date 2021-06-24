<template>
  <v-dialog v-model="dialog" width="600px" scrollable :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase">
        <v-toolbar-title>SỬA PHÂN BAN</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <v-form ref="form">
          <v-text-field
            outlined
            dense
            v-model="title"
            class="required mt-4"
            :rules="[$rules.required, titleRule]"
            label="Tên ban"
          />
          <RadioAcademicLevel :defaultLevel="academicLevel" @change="academicLevel = $event" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row class="pa-2" no-gutters>
          <v-btn class="px-4" outlined light depressed @click="cancel">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="px-6" dark depressed color="#0D47A1" :loading="loading" @click="save">Lưu</v-btn>
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
  components: {
    RadioAcademicLevel
  },
  props: {
    state: Boolean,
    division: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      title: '',
      academicLevel: {},
      titleRule: v => {
        const title = textHelpers.removeSpaces(v)
        const d = this.divisions.find(d => d.title === title && d.academicLevel.id === this.academicLevel.id)
        return !d || 'Phân ban này đã tồn tại'
      }
    }
  },
  created() {
    if (this.division) {
      this.title = this.division.title
      this.academicLevel = this.division.academicLevel
    }
  },
  computed: {
    ...mapState('division', ['divisions'])
  },
  methods: {
    ...mapActions('division', ['updateDivision', 'fetchDivision']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        await this.updateDivision({ id: this.division.id, title: this.title, academicLevel: this.academicLevel.id })
        this.$alert.updateSuccess()
        this.dialog = false
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.title = ''
      this.$refs.form.resetValidation()
    },
    resetValidation() {
      this.$refs.form && this.$refs.form.resetValidation()
    },
    cancel() {
      this.dialog = false
      this.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    },
    academicLevel: 'resetValidation'
  }
}
</script>
