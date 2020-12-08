<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-card-title color="#0D47A1" class="white--text">
          <span class="text-uppercase">Thêm buổi học</span>
          <v-spacer />
          <v-icon color="white" @click="cancel">close</v-icon>
        </v-card-title>
        <slots-form
          ref="slotForm"
          :major="{}"
          :classData="classData"
          class="mx-4 mt-4"
        ></slots-form>
        <v-card-actions class="pr-6 pb-6 mt-n4">
          <v-spacer></v-spacer>
          <v-btn class="px-4" color="success" @click="save"
            ><v-icon>mdi-plus</v-icon>Thêm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SlotsForm from '@/components/basic/form/SlotsForm'
import { mapActions } from 'vuex'

export default {
  components: {
    SlotsForm
  },
  props: {
    state: Boolean,
    classData: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions('classDetail', ['createSlots']),
    cancel() {
      this.$refs.slotForm.reset()
      this.dialog = false
    },
    async save() {
      if (this.$refs.slotForm.validate()) {
        await this.createSlots(this.$refs.slotForm.getData())
        this.$refs.slotForm.reset()
        this.dialog = false
        this.$alert.success('Thêm mới buổi học thành công!')
      }
    }
  },
  watch: {
    state() {
      this.dialog = true
    }
  }
}
</script>
