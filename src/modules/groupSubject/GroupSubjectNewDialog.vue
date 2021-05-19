<template>
  <v-dialog v-model="dialog" width="400px" :fullscreen="$vuetify.breakpoint.smAndDown" scrollable>
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>THÊM BỘ MÔN MỚI</v-toolbar-title>
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
            label="Tên bộ môn"
          />
          <RadioAcademicLevel @change="academicLevel = $event" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row class="ma-2" no-gutters>
          <v-btn class="px-4" outlined light depressed @click="cancel">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="px-4" dark depressed color="#0D47A1" :loading="loading" @click="save"
            ><v-icon left>add</v-icon>Thêm</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import RadioAcademicLevel from '@/modules/academicLevel/RadioAcademicLevel.vue'
export default {
  components: {
    RadioAcademicLevel
  },
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false,
      loading: false,
      academicLevel: '',
      title: ''
    }
  },
  computed: {},
  methods: {
    ...mapActions('GroupSubject', ['createGroupSubject']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        await this.createGroupSubject({ title: this.title, academicLevel: this.academicLevel })
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
    cancel() {
      this.dialog = false
      this.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
