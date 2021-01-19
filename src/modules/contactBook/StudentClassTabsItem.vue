<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card ref="form" outlined flat>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Kodu Game Lab</v-list-item-title>
            <v-list-item-subtitle>Kodu Game Lab Basic 15,</v-list-item-subtitle>
            <v-list-item-subtitle>Trạng Thái Học Phí: đủ</v-list-item-subtitle>
            <v-progress-linear value="15" height="15">
              <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    student: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    name: '',
    email: '',
    parentEmail: '',
    school: '',
    address: '',
    parentName: ''
  }),

  methods: {
    save () {
      this.$emit('save', {
        name: this.name,
        email: this.email,
        parentEmail: this.parentEmail,
        school: this.school,
        address: this.address,
        parentName: this.parentName
      })
    },
    cancel () {
      this.name = this.student.name
      this.email = this.student.email
      this.parentName = this.student.parentName
      this.parentEmail = this.student.parentEmail
      this.address = this.student.address
      this.school = this.student.school
      this.$emit('cancel')
    }
  },
  watch: {
    student (student) {
      this.name = student.name
      this.email = student.email
      this.parentName = student.parentName
      this.parentEmail = student.parentEmail
      this.school = student.school
      this.address = student.address
    }
  }
}
</script>

<style scoped>
</style>
