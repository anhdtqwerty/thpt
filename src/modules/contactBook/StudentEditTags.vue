<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" outlined class="mr-2" depressed>
        <v-icon left>mdi-pencil</v-icon>Sửa Nhóm
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Sửa nhóm</v-card-title>
      <v-container>
        <v-text-field
          :disabled="loading"
          :rules="[rules.required]"
          v-model="tags"
          label="Tên nhóm"
          placeholder="Nhập tên nhóm mới"
        ></v-text-field>
        <small v-if="students">{{students.length}} Học sinh được chọn</small>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small @click="cancel" depressed>Hủy</v-btn>
        <v-btn small color="primary" @click="save" depressed :loading="loading">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      dialog: false,
      loading: false,
      tags: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 8 characters',
        email: v => /.+@.+/.test(v) || 'E-mail must be valid'
      }
    }
  },
  props: {
    state: Boolean,
    students: Array
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapGetters('app', ['roleIdByName', 'roles'])
  },
  created () {},
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    ...mapActions('students', ['updateStudents']),
    async save () {
      this.loading = true
      await this.updateStudents(
        this.students.map(s => ({
          id: s.id,
          tags: this.tags
        }))
      )
      this.loading = false
      this.dialog = false
      this.reset()
    },

    cancel () {
      this.dialog = false
      this.reset()
    },
    reset () {
      this.tags = ''
    }
  },
  watch: {
    state (state) {
      this.dialog = true
    }
  }
}
</script>
