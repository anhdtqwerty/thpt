<template>
  <v-dialog v-model="dialog" width="800px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="primary white--text"
        ><v-toolbar-title>THÊM LỚP HỌC</v-toolbar-title>
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <ClassNewForm ref="form" :classData="{}" :major="major" :course="course" />
      <v-card-actions>
        <v-spacer />
        <v-btn depressed color="primary" class="mr-4 mt-n4 mb-2 white--text" @click="save"
          ><v-icon color="white" left> mdi-plus </v-icon>Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassNewForm from '@/components/basic/form/ClassNewForm.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { Class } from '@/plugins/api'

export default {
  components: {
    ClassNewForm
  },
  props: {
    state: Boolean,
    major: Object,
    course: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user']),
    ...mapState('app', ['currentGeneration']),
    ...mapGetters('class', ['classes'])
  },
  methods: {
    ...mapActions('class', ['createClass']),
    async save() {
      if (!this.$refs.form.validate()) return

      const data = this.$refs.form.getData()
      if (await Class.count({ title: data.title })) {
        this.$alert.error('Tên lớp đã tồn tại')
        return
      }

      try {
        this.$loading.active = true
        await this.createClass({
          ...data,
          department: this.department.id,
          generation: this.currentGeneration.id,
          status: 'opened'
        })
        this.$alert.addSuccess()
        this.$refs.form.reset()
        this.dialog = false
      } catch (error) {
        this.$alert.addError()
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.$refs.form.reset()
      this.dialog = false
    }
  },

  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
