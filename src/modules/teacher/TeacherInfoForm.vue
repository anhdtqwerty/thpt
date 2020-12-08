<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card ref="form" flat>
        <v-card-text>
          <p>Đăng Nhập</p>
          <v-text-field
            ref="name"
            v-model="name"
            label="Nhân Viên"
            outlined
            :disabled="!policies['update-staff-info']"
            placeholder="Nhập tên Nhân Viên"
            required
          ></v-text-field>
          <v-text-field
            ref="name"
            v-model="code"
            label="Mã Nhân Viên"
            outlined
            :disabled="!policies['update-staff-info']"
            placeholder="Nhập mã Nhân Viên"
            required
          ></v-text-field>
          <v-text-field
            ref="phone"
            v-model="phone"
            outlined
            label="Số điện thoại"
            :disabled="!policies['update-staff-info']"
            placeholder="Nhập số điện thoại"
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            outlined
            v-model="email"
            :disabled="!policies['update-staff-info']"
            label="Email"
            placeholder="Nhập email"
          ></v-text-field>
          <v-text-field
            :disabled="!policies['update-staff-info']"
            ref="address"
            v-model="address"
            outlined
            label="Địa Chỉ"
            placeholder="Nhập địa chỉ"
          ></v-text-field>
          <v-textarea
            :disabled="!policies['update-staff-info']"
            ref="notes"
            v-model="notes"
            outlined
            label="Ghi Chú"
            placeholder="Nhập ghi chú"
          ></v-textarea>
        </v-card-text>
        <v-card-actions v-if="policies['update-staff-info']">
          <div class="flex-grow-1"></div>
          <v-btn depressed small right color="error" @click="cancel">Cancel</v-btn>
          <v-btn depressed small color="success" style="margin: 0 20px" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    staff: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('app', ['department', 'policies'])
  },
  data: () => ({
    valid: true,
    name: '',
    email: '',
    parentEmail: '',
    code: '',
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
        code: this.code,
        phone: this.phone,
        address: this.address,
        notes: this.notes
      })
    },
    cancel () {
      this.name = this.staff.name
      this.email = this.staff.email
      this.code = this.staff.code
      this.phone = this.staff.phone
      this.address = this.staff.address
      this.notes = this.staff.notes
      this.$emit('cancel')
    }
  },
  watch: {
    staff (staff) {
      this.name = staff.name
      this.email = staff.email
      this.code = staff.code
      this.phone = staff.phone
      this.notes = staff.notes
      this.address = staff.address
    }
  }
}
</script>
