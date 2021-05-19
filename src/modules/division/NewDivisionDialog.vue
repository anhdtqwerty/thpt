<template>
  <v-dialog v-model="dialog" width="400px" :fullscreen="$vuetify.breakpoint.smAndDown" scrollable>
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
            :rules="[$rules.required]"
            label="Tên ban"
          />
          <RadioAcademicLevel @change="academicLevel = $event" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row class="ma-2" no-gutters>
          <v-btn class="px-4" outlined light depressed @click="dialog = false">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="px-6" dark depressed color="#0D47A1" :loading="loading" @click="save"
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
      academicLevel: ''
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('division', ['createDivision']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        await this.createDivision({ title: this.title, academicLevel: this.academicLevel })
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
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
