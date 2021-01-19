<template>
  <div class="pa-4" style="display: block">
    <contact-list
      :contacts="student.contacts"
      @edit="updateContact"
      @add="createState=!createState"
    ></contact-list>
    <v-btn depressed small right color="error" @click="cancel">Cancel</v-btn>
    <v-btn depressed small color="success" style="margin: 0 20px" @click="save">Save</v-btn>
    <new-contact-dialog :state="createState" :student="student" />
  </div>
</template>

<script>
import ContactList from '@/components/basic/list/ContactList'
import NewContactDialog from '@/modules/contact/NewContactDialog'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ContactList,
    NewContactDialog
  },
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
    parentName: '',
    createState: false
  }),
  computed: {
    ...mapGetters('contact', ['search'])
  },
  methods: {
    ...mapActions('contact', ['searchContact']),
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
    },
    addContact () {},
    updateContact () {}
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
