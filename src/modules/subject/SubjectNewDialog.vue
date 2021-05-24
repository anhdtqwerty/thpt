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
        <SubjectNewForm ref="form" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn class="gray--text" depressed :loading="loading" outlined @click="cancel">HUỶ</v-btn>
        <v-btn depressed color="primary" :loading="loading" @click="save">LƯU</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubjectNewForm from '@/components/basic/form/SubjectNewForm'
import { mapActions } from 'vuex'
export default {
  components: {
    SubjectNewForm
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
