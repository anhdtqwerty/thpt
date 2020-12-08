<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card ref="form" flat>
        <v-card-text>
          <currency-input
            ref="hourSalary"
            v-model="hourSalary"
            :disabled="!policies['update-staff-salary']"
            label="Lương Theo Giờ (đ)"
            placeholder="Nhập Lương Theo Giờ"
            required
          ></currency-input>
          <currency-input
            ref="hourSalary"
            v-model="hourSecondarySalary"
            :disabled="!policies['update-staff-salary']"
            label="Lương Phụ Theo Giờ (đ)"
            placeholder="Nhập Lương Phụ Theo Giờ"
            required
          />
          <currency-input
            ref="monthSalary"
            v-model="monthSalary"
            :disabled="!policies['update-staff-salary']"
            label="Lương Theo Tháng (đ)"
            placeholder="Nhập Lương Theo Tháng"
            required
          />
          <currency-input
            ref="Lương Theo Buổi (đ)"
            v-model="slotSalary"
            :disabled="!policies['update-staff-salary']"
            label="Nhập Lương Theo Buổi"
            placeholder="Nhập Lương Theo Buổi"
          />
          <v-textarea
            :disabled="!policies['update-staff-salary']"
            ref="notes"
            v-model="notes"
            label="Ghi Chú"
            placeholder="Nhập ghi chú"
          ></v-textarea>
        </v-card-text>
        <v-card-actions v-if="policies['update-staff-salary']">
          <div class="flex-grow-1"></div>
          <v-btn depressed small right color="red" @click="cancel">Cancel</v-btn>
          <v-btn depressed small color="green" style="margin: 0 20px" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import CurrencyInput from '@/components/basic/input/CurrencyInput'
export default {
  components: {
    CurrencyInput
  },
  props: {
    staff: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    hourSalary: '',
    hourSecondarySalary: '',
    monthSalary: '',
    school: '',
    notes: '',
    slotSalary: ''
  }),
  computed: {
    ...mapGetters('app', ['department', 'policies'])
  },
  methods: {
    save () {
      this.$emit('save', {
        salary: {
          hourSalary: this.hourSalary,
          monthSalary: this.monthSalary,
          hourSecondarySalary: this.hourSecondarySalary,
          slotSalary: this.slotSalary,
          notes: this.notes
        }
      })
    },
    cancel () {
      this.hourSalary = this.staff.salary.hourSalary
      this.monthSalary = this.staff.salary.monthSalary
      this.hourSecondarySalary = this.staff.salary.hourSecondarySalary
      this.slotSalary = this.staff.salary.slotSalary
      this.notes = this.staff.salary.notes
      this.$emit('cancel')
    },
    refresh () {
      this.hourSalary = this.staff.salary.hourSalary || 0
      this.monthSalary = this.staff.salary.monthSalary || 0
      this.hourSecondarySalary = this.staff.salary.hourSecondarySalary || 0
      this.slotSalary = this.staff.salary.slotSalary || 0
      this.notes = this.staff.salary.notes
    }
  },
  created () {
    this.refresh()
  },
  watch: {
    staff (staff) {
      this.refresh()
    }
  }
}
</script>
