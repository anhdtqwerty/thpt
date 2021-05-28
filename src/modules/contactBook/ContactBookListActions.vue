<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item style="cursor: pointer" @click="configDialog = !configDialog">
          <v-list-item-title>Cài đặt sổ</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item @click="detailClicked">
          <v-list-item-title>Xem chi tiết tin đã gửi</v-list-item-title>
        </v-list-item> -->
        <v-list-item @click="unlockContact" v-if="item.contactBook && item.contactBook.status === 'locked'">
          <v-list-item-title>Gỡ khoá</v-list-item-title>
        </v-list-item>
        <v-list-item @click="lockContact" v-else>
          <v-list-item-title>Khoá sổ</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="item.fcmAndroid || item.fcmIos || (item.contactBook && item.contactBook.isApp)"
          @click="configPasswordDialog = !configPasswordDialog"
        >
          <v-list-item-title>Đặt mật khẩu APP</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onRemove">
          <v-list-item-title>Xóa</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <ConfigContactDialog :state="configDialog" :student="item" />
    <ConfigPasswordDialog :state="configPasswordDialog" :student="item" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ConfigContactDialog from '@/views/account/ConfigContactDialog.vue'
import ConfigPasswordDialog from '@/views/account/ConfigPasswordDialog.vue'

export default {
  components: {
    ConfigContactDialog,
    ConfigPasswordDialog
  },
  props: {
    disabled: Boolean,
    filter: Boolean,
    item: Object
  },
  data() {
    return {
      selectedStudent: {},
      search: '',
      loading: false,
      configDialog: false,
      configPasswordDialog: false,
      studentTableOptions: {},
      filteredStudents: []
    }
  },
  computed: {
    ...mapState('student', ['students'])
  },
  methods: {
    ...mapActions('students', ['removeStudent', 'updateStudents', 'updateStudent']),
    ...mapActions('noti', ['sendEmails', 'sendSMS']),
    ...mapActions('sale', ['setStudents']),
    ...mapActions('ContactBook', [
      'createContactBook',
      'updateContactBook',
      'createUser',
      'removeUser',
      'removeContactBook'
    ]),
    async lockContact() {
      this.$dialog.confirm({
        title: 'Khóa sổ liên lạc',
        text: 'Sổ liên lạc sẽ không gửi các thông tin, thông báo của nhà trường đến phụ huynh học sinh.',
        okText: 'Khóa',
        cancelText: 'Hủy',
        done: async () => {
          try {
            this.$loading.active = true
            const contactBook = await this.updateContactBook({
              id: this.item.contactBook.id,
              status: 'locked'
            })
            await this.updateStudent({ id: this.item.id, contactBook: contactBook.id })
            this.$alert.updateSuccess()
          } catch (error) {
            this.$alert.updateError()
          } finally {
            this.$loading.active = false
          }
        }
      })
    },
    async unlockContact() {
      try {
        this.$loading.active = true
        const contactBook = await this.updateContactBook({
          id: this.item.contactBook.id,
          status: 'active'
        })
        await this.updateStudent({ id: this.item.id, contactBook: contactBook.id })
        this.$alert.updateSuccess()
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    },
    // detailClicked() {
    //   this.$router.push(`/contact-book-detail/` + this.item.id)
    // },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa sổ liên lạc',
        text:
          'Các thông tin trong sổ sẽ bị xóa. Phụ huynh sẽ không nhận được các thông tin của học sinh từ sổ liên lạc.',
        okText: 'Xóa',
        cancelText: 'Hủy',
        done: async () => {
          try {
            this.$loading.active = true
            if (this.item.contactBook) await this.removeContactBook(this.item.contactBook.id)
            if (this.item.user) await this.removeUser(this.item.user.id)
            await this.updateStudent({ id: this.item.id })
            this.$alert.deleteSuccess()
          } catch (error) {
            this.$alert.deleteError()
          } finally {
            this.$loading.active = false
          }
        }
      })
    }
  }
}
</script>
