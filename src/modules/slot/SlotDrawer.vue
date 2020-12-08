<template>
  <v-navigation-drawer fixed right clipped app v-model="state" width="320" v-if="slotId">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{slotData.title}}</v-list-item-title>
          <v-list-item-subtitle>{{ "Mã buổi : " + slotData.code}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn icon @click.stop="state=false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-tabs v-model="tab">
      <v-tab href="#tab-1">Điểm Danh</v-tab>
      <v-tab href="#tab-2">Thông Tin</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" value="tab-1">
          <slot-attendance
            v-if="slotId"
            :slotData="slotData"
            :classData="classData"
            @cancel="cancel"
            @save="save"
          />
        </v-tab-item>
        <v-tab-item :key="2" value="tab-2">
          <slot-info-form v-if="slotId" :slotData="slotData" @cancel="cancel" @save="save" />
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SlotInfoForm from '@/modules/slot/SlotInfoForm'
import SlotAttendance from '@/modules/slot/SlotAttendance'
export default {
  components: {
    SlotAttendance,
    SlotInfoForm
  },
  props: {
    draw: Boolean,
    slotId: String
  },
  data () {
    return {
      state: this.draw,
      tab: null,
      classData: {}
    }
  },
  computed: {
    ...mapGetters('slot', ['slot']),
    slotData () {
      return this.slot(this.slotId) || {}
    }
  },
  methods: {
    ...mapActions('slot', [
      'fetchSlot',
      'fetchClass',
      'updateSlot',
      'removeSlot'
    ]),
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    save (data) {
      this.updateSlot({ ...this.slotData, ...data })
    },
    remove () {
      this.removeSlot(this.slotData.id)
    },
    cancel () {
      this.state = false
    }
  },
  watch: {
    state (state) {
      this.$emit('onDrawerStateChange', state)
    },
    async slotId (slotId) {
      if (slotId) {
        await this.fetchSlot(slotId)
        this.classData = this.slotData.class
      }
    },
    draw (draw) {
      this.state = draw
    }
  }
}
</script>
