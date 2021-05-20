<template>
  <v-dialog v-model="dialog" width="400px" scrollable :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase">
        <v-toolbar-title>SỬA BỘ MÔN</v-toolbar-title>
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
            :rules="[$rules.required]"
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
import { mapActions } from 'vuex'
import RadioAcademicLevel from '@/modules/academicLevel/RadioAcademicLevel.vue'

export default {
  components: {
    RadioAcademicLevel
  },
  props: {
    state: Boolean,
    groupSubject: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      title: '',
      academicLevel: ''
    }
  },
  created() {
    if (this.groupSubject) {
      this.title = this.groupSubject.title
      this.academicLevel = this.groupSubject.academicLevel
    }
  },
  computed: {},
  methods: {
    ...mapActions('GroupSubject', ['updateGroupSubject']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        await this.updateGroupSubject({
          id: this.groupSubject.id,
          title: this.title,
          academicLevel: this.academicLevel
        })
        this.$alert.updateSuccess()
        this.dialog = false
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
