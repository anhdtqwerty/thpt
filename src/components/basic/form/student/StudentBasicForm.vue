<template>
  <div v-bind="this.$attrs">
    <v-row no-gutters class="flex-column">
      <p class="text-h5 primary--text mb-0">{{ student.name }}</p>
      <p class="text-subtitle-2">{{ student.code }}</p>
    </v-row>
    <v-row>
      <v-col
        v-for="studentDetail in studentDetails"
        :key="studentDetail.title"
        :cols="studentDetail.cols"
        class="py-0 d-flex flex-column justify-end"
      >
        <p class="text-caption mb-0">{{ studentDetail.title }}</p>
        <p class="text-subtitle-2 mb-0">{{ studentDetail.value }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      studentDetails: [
        { title: 'Lớp', value: this.student.classes[0].title, cols: 2 },
        { title: 'Bố / Người giám hộ', value: `${this.student.data.dadName} / ${this.student.data.dadPhone}`, cols: 5 },
        { title: 'Mẹ / Người giám hộ', value: `${this.student.data.momName} / ${this.student.data.momPhone}`, cols: 5 }
      ],
    }
  },
  props: {
    student: Object,
  },
}
</script>

<style>
</style>
