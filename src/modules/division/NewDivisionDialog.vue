<template>
  <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown" scrollable>
    <v-card>
      <v-card-title class="blue darken-4 white--text"
        ><v-toolbar-title>THÊM BAN MỚI</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="dialog = false">close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <division-info-form ref="form" :editCode="true" />
      </v-card-text>
      <v-card-actions>
        <v-row class="" no-gutters>
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
import DivisionInfoForm from '@/components/basic/form/DivisionNewForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    DivisionInfoForm
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
    ...mapActions('division', ['createDivision']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        const data = this.$refs.form.getData()
        await this.createDivision({ ...data })
        this.$alert.addSuccess()
        this.$refs.form.reset()
        this.dialog = false
      } catch (error) {
        this.$alert.addError()
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.$refs.form.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
