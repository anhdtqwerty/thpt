<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Quản lý cấp học" :link="[{ text: 'Nâng cao', href: '../academics' }]" />
      </div>
    </div>
    <div class="d-flex justify-center align-center flex-column">
      <v-card class="mb-4" :style="{ width: '500px', backgroundColor: switch1 ? 'pink' : 'white' }" outlined>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="9">
            <v-col cols="12" class="d-flex flex-row align-center">
              <div class="ml-4 mr-8">
                <h2 :class="textColor(switch1)">Cấp 1</h2>
              </div>
              <v-switch @change="changeSwitch('primary')" color="white" inset v-model="switch1"></v-switch>
            </v-col>
            <v-col class="mx-4" cols="12">
              <p :class="textColor(switch1)">Khối 1 * Khối 2 * Khối 3 * Khối 4 * Khối 5</p></v-col
            >
          </v-col>
          <v-col cols="3">
            <img :src="PrimaryIcon" alt="student-setting" />
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mb-4" :style="{ width: '500px', backgroundColor: switch2 ? '#C589FD' : 'white' }" outlined>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="9">
            <v-col cols="12" class="d-flex flex-row align-center">
              <div class="ml-4 mr-8">
                <h2 :class="textColor(switch2)">Cấp 2</h2>
              </div>
              <v-switch @change="changeSwitch('secondary')" color="white" inset v-model="switch2"></v-switch>
            </v-col>
            <v-col class="mx-4" cols="12"> <p :class="textColor(switch2)">Khối 6 * Khối 7 * Khối 8 * Khối 9</p></v-col>
          </v-col>
          <v-col cols="3">
            <img :src="SecondaryIcon" alt="student-setting" />
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mb-4" :style="{ width: '500px', backgroundColor: switch3 ? '#59BDFE' : 'white' }" outlined>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="9">
            <v-col cols="12" class="d-flex flex-row align-center">
              <div class="ml-4 mr-8">
                <h2 :class="textColor(switch3)">Cấp 3</h2>
              </div>
              <v-switch @change="changeSwitch('high')" color="white" inset v-model="switch3"></v-switch>
            </v-col>
            <v-col class="mx-4" cols="12"> <p :class="textColor(switch3)">Khối 10 * Khối 11 * Khối 12</p></v-col>
          </v-col>
          <v-col cols="3">
            <img :src="HighIcon" alt="student-setting" />
          </v-col>
        </v-row>
      </v-card>
    </div>
    <ConfirmDialog :state="primaryDialog" :title="title" :message="message" @ok="okPrimary" @cancel="cancelPrimary" />
    <ConfirmDialog
      :state="secondaryDialog"
      :title="title"
      :message="message"
      @ok="okSecondary"
      @cancel="cancelSecondary"
    />
    <ConfirmDialog :state="highDialog" :title="title" :message="message" @ok="okHigh" @cancel="cancelHigh" />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ConfirmDialog from '@/components/basic/dialog/ConfirmDialog.vue'
import PrimaryIcon from '@/assets/primary.svg'
import SecondaryIcon from '@/assets/secondary.svg'
import HighIcon from '@/assets/high.svg'

export default {
  components: {
    Breadcrumbs,
    ConfirmDialog
  },
  props: {
    role: String
  },
  data() {
    return {
      switch1: false,
      switch2: false,
      switch3: false,
      primaryDialog: false,
      secondaryDialog: false,
      highDialog: false,
      title: '',
      message: '',
      PrimaryIcon,
      SecondaryIcon,
      HighIcon
    }
  },

  computed: {
    ...mapState('AcademicLevel', ['primary', 'secondary', 'high']),
    ...mapGetters('app', ['department'])
  },
  async created() {
    await this.fetchAcademics({ department: this.department.id })
    this.switch1 = this.primary.status === 'active'
    this.switch2 = this.secondary.status === 'active'
    this.switch3 = this.high.status === 'active'
  },
  methods: {
    ...mapActions('AcademicLevel', ['fetchAcademics', 'updateAcademic']),
    textColor(switchValue) {
      return switchValue ? 'white--text' : 'grey--text'
    },

    changeSwitch(academicLevel) {
      let active
      switch (academicLevel) {
        case 'primary':
          active = this.switch1
          this.primaryDialog = !this.primaryDialog
          break
        case 'secondary':
          active = this.switch2
          this.secondaryDialog = !this.secondaryDialog
          break
        case 'high':
          active = this.switch3
          this.highDialog = !this.highDialog
          break
      }

      if (active) {
        this.title = 'Kích hoạt cấp học'
        this.message = 'Bạn có chắc muốn mở cấp học này. Các thông tin liên quan về cấp học sẽ được mở cùng.'
      } else {
        this.title = 'Hủy kích hoạt cấp học'
        this.message = 'Bạn có chắc muốn hủy kích hoạt cấp học này. Các thông tin liên quan về cấp học sẽ bị đóng.'
      }
    },
    async okHigh() {
      await this.updateAcademic({ id: this.high.id, status: this.switch3 ? 'active' : 'inactive' })
    },
    cancelHigh() {
      this.switch3 = !this.switch3
    },
    async okSecondary() {
      await this.updateAcademic({ id: this.secondary.id, status: this.switch2 ? 'active' : 'inactive' })
    },
    cancelSecondary() {
      this.switch2 = !this.switch2
    },
    async okPrimary() {
      await this.updateAcademic({ id: this.primary.id, status: this.switch1 ? 'active' : 'inactive' })
    },
    cancelPrimary() {
      this.switch1 = !this.switch1
    }
  }
}
</script>

<style scoped></style>
