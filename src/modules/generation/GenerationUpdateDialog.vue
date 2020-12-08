<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title color="#0D47A1" class="white--text"
        >{{ generation.name }}
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <generation-info-form
        v-if="generation.id"
        :generation="generation"
        ref="form"
      />
      <v-row class="pr-6 pb-6 mt-n7" no-gutters>
        <v-spacer></v-spacer>
        <v-btn
          class="px-6"
          depressed
          color="primary"
          :loading="loading"
          @click="save"
          >Lưu</v-btn
        >
      </v-row>
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
