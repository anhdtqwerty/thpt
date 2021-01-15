<template>
  <v-dialog
    v-model="dialog"
    width="661px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text ">
          <v-toolbar-title>SỬA KHÓA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
         <v-divider></v-divider>
      <generation-info-form
        v-if="generation.id"
        :generation="generation"
        ref="form"
      />
      </v-card-text>
      <v-card-actions class="d-flex justify-end pa-6">
        <v-btn
          depressed
          color="primary"
          :loading="loading"
          @click="save"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GenerationInfoForm from '@/components/basic/form/GenerationForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    GenerationInfoForm
  },
  props: {
    state: Boolean,
    generation: { type: Object, default: () => {} }
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
    ...mapActions('generation', ['updateGeneration', 'fetchGenerations']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      await this.updateGeneration({ id: this.generation.id, ...data })
      await this.fetchGenerations({ department: this.department.id })
      this.loading = false
      this.dialog = false
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
