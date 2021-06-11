<template>
  <v-card flat class="d-flex flex-column justify-center py-4">
    <v-stepper class="elevation-0" alt-labels :value="value">
      <v-stepper-header>
        <v-stepper-step :complete="value > 1" step="1">
          <div class="d-flex justify-center align-center">
            Khai báo thông tin năm học
          </div>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="value > 2" step="2">
          Kiểm tra quá trình lên lớp
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="value > 3" step="3">
          Tạo lớp mới
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="value > 4" step="4">
          Xét duyệt cho học sinh đầu năm
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5">
          Hoàn thành
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <v-divider></v-divider>
    <NewGenerationInfo v-if="value === 1" @saveGenerationInfo="value = 2" />
    <NewClassInfo v-if="value === 2" @saveNewClass="value = 3" />
    <CreateNewClass v-if="value === 3" @createNewClass="value = 4" />
    <ApproveStudentClass v-if="value === 4" @approveStudentClass="value = 5" />
    <GenerationDone v-if="value === 5" />
  </v-card>
</template>

<script>
import NewGenerationInfo from '@/modules/generation/NewGenerationInfo.vue'
import NewClassInfo from '@/modules/generation/NewClassInfo.vue'
import CreateNewClass from '@/modules/generation/CreateNewClass.vue'
import ApproveStudentClass from '@/modules/generation/ApproveStudentClass.vue'
import GenerationDone from '@/modules/generation/GenerationDone.vue'

export default {
  components: { NewGenerationInfo, NewClassInfo, CreateNewClass, ApproveStudentClass, GenerationDone },
  data() {
    return {
      checkbox: false,
      value: 1
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
