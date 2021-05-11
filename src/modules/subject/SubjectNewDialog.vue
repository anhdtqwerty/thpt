<template>
  <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown" scrollable>
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>THÊM MÔN HỌC MỚI</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <SubjectForm ref="form" :editCode="true" />
      </v-card-text>
      <v-card-actions class="d-flex justify-end pa-6">
        <v-btn dark depressed color="#0D47A1" :loading="loading" @click="save"><v-icon left>add</v-icon>Thêm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubjectForm from '@/components/basic/form/SubjectForm'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    SubjectForm
  },
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('subjects', ['createSubject']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        const data = this.$refs.form.getData()
        await this.createSubject({ ...data })
        this.$alert.addSuccess()
        this.$refs.form.resetDefault()
        this.dialog = false
      } catch (error) {
        this.$alert.addError()
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.dialog = false
      this.$refs.form.resetDefault()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
