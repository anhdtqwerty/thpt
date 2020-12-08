<template>
    <v-tab-item
      key="2"
      value="tab-2"
    >
      <v-list subheader>
        <v-subheader>Bố</v-subheader>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Nguyễn Đăng Bá</v-list-item-title>
            <v-list-item-subtitle>
              Điện Thoại: 0123456789
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Email: Ba@gmail.com
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon >edit</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>Mẹ</v-subheader>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Đào Thị Lan</v-list-item-title>
            <v-list-item-subtitle>
              Điện Thoại: 0123456789
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Email: Ba@gmail.com
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon >edit</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-tab-item>
</template>

<script>
export default {
  props: {
    staff: { type: [Object], required: true, default: () => {} }
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
      this.name = this.staff.name
      this.email = this.staff.email
      this.parentName = this.staff.parentName
      this.parentEmail = this.staff.parentEmail
      this.address = this.staff.address
      this.school = this.staff.school
      this.$emit('cancel')
    }
  },
  watch: {
    staff (staff) {
      this.name = staff.name
      this.email = staff.email
      this.parentName = staff.parentName
      this.parentEmail = staff.parentEmail
      this.school = staff.school
      this.address = staff.address
    }
  }
}
</script>

<style scoped>

</style>
