<template>
  <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="white--text primary"
        >SỬA LỚP HỌC {{ classData.title }}
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <ClassInfoForm v-if="classData.id" :classData="classData" ref="form" />
      <v-row class="pr-6 pb-6 mt-n7" no-gutters>
        <v-spacer></v-spacer>
        <v-btn class="px-6" depressed color="primary" @click="save">Lưu</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassInfoForm from '@/components/basic/form/ClassInfoForm'
import { mapActions, mapState } from 'vuex'
import { Class } from '@/plugins/api'

export default {
  components: {
    ClassInfoForm
  },
  props: {
    state: Boolean,
    classData: Object,
    slots: Array
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('classDetail', ['updateClass']),
    async save() {
      if (!this.$refs.form.validate()) return
      this.$loading.active = true

      const data = this.$refs.form.getData()
      const classesFilter = await Class.fetch({ id_ne: this.classData.id })
      if (classesFilter.find(c => c.title === data.title)) {
        this.$alert.error('Tên lớp đã tồn tại')
        this.$loading.active = false
        return
      }

      try {
        const data = this.$refs.form.getData()
        await this.updateClass({ id: this.classData.id, ...data })
        this.dialog = false
        this.$alert.updateSuccess()
      } catch (error) {
        this.$alert.updateError()
      } finally {
      }
      this.$loading.active = false
    },
    cancel() {
      this.dialog = false
      this.$refs.form.resetDefault()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
