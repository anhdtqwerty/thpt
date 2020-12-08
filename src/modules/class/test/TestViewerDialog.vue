<template>
  <v-dialog v-model="dialog" width="800">
    <v-card>
      <v-card-title>
        <test-result />
      </v-card-title>
      <test-viewer />
    </v-card>
  </v-dialog>
</template>

<script>
import TestViewer from '@/modules/class/test/TestViewer'
import TestResult from '@/modules/class/test/TestResult'

export default {
  components: { TestViewer, TestResult },
  data () {
    return {
      dialog: false,
      name: '',
      phone: '',
      email: '',
      code: '',
      role: '',
      show: false,
      temporary: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 8 characters',
        email: v => /.+@.+/.test(v) || 'E-mail must be valid'
      }
    }
  },
  props: {
    state: Boolean
  },
  watch: {
    state (state) {
      this.dialog = true
    }
  }
}
</script>
