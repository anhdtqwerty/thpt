<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-card-title color="#0D47A1" class="white--text">
          <span class="text-uppercase">{{
            $moment(slotData.startTime).format('DD/MM/yyyy HH:mm')
          }}</span>
          <v-spacer />
          <v-icon color="white" @click="cancel">close</v-icon>
        </v-card-title>
        <slot-info-form
          v-if="slotData"
          :slotData="slotData"
          @cancel="cancel"
          @save="save"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SlotInfoForm from '@/modules/slot/SlotInfoForm'
export default {
  components: {
    SlotInfoForm
  },
  props: {
    state: Boolean,
    slotData: Object
  },
  data() {
    return {
      dialog: this.state,
      tab: null,
      classData: {}
    }
  },
  computed: {},
  methods: {
    ...mapActions('classDetail', ['updateSlot']),
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    save(data) {
      this.updateSlot({ ...this.slotData, ...data })
    },
    cancel() {
      this.dialog = false
      this.$emit('onDrawerStateChange', this.dialog)
    }
  },
  watch: {
    dialog() {
      this.$emit('onDrawerStateChange', this.dialog)
    },
    async slotData(slotData) {
      if (slotData) {
        this.classData = slotData.class
      }
    }
  }
}
</script>
