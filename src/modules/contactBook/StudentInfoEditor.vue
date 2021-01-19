<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-text-field
        ref="name"
        v-model="name"
        label="Học Sinh"
        placeholder="Nhập tên học sinh"
        required
      ></v-text-field>
      <v-menu
        ref="menu"
        v-model="showDob"
        :close-on-content-click="false"
        :return-value.sync="dob"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field v-model="dob" label="Ngày sinh" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="dob" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="showDob = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(dob)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <v-text-field
        ref="phone"
        v-model="phone"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        required
      ></v-text-field>
      <v-text-field
        ref="email"
        v-model="email"
        label="Email Học Sinh"
        placeholder="Nhập email học sinh"
      ></v-text-field>
      <v-text-field ref="school" v-model="school" label="Trường" placeholder="Nhập Trường "></v-text-field>
      <v-text-field ref="address" v-model="address" label="Địa Chỉ" placeholder="Nhập địa chỉ"></v-text-field>
      <v-textarea ref="notes" v-model="notes" label="Ghi Chú" placeholder="Nhập ghi chú"></v-textarea>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn depressed small right color="error" @click="cancel">Cancel</v-btn>
        <v-btn depressed small color="success" style="margin: 0 20px" @click="save">Save</v-btn>
      </v-card-actions>
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
    showDob: false,
    dob: new Date().toISOString().substr(0, 10),
    name: '',
    email: '',
    parentEmail: '',
    school: '',
    notes: '',
    phone: '',
    address: '',
    parentName: ''
  }),

  methods: {
    save () {
      this.$emit('save', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        parentEmail: this.parentEmail,
        school: this.school,
        address: this.address,
        notes: this.notes,
        parentName: this.parentName
      })
    },
    cancel () {
      this.name = this.student.name
      this.email = this.student.email
      this.phone = this.student.phone
      this.parentName = this.student.parentName
      this.parentEmail = this.student.parentEmail
      this.address = this.student.address
      this.notes = this.student.notes
      this.school = this.student.school
      this.$emit('cancel')
    }
  },
  watch: {
    student (student) {
      this.name = student.name
      this.email = student.email
      this.phone = student.phone
      this.parentName = student.parentName
      this.parentEmail = student.parentEmail
      this.school = student.school
      this.notes = student.notes
      this.address = student.address
    }
  }
}
</script>

<style scoped>
</style>
