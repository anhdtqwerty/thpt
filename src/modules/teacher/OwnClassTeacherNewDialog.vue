<template>
  <v-dialog v-model="dialog" width="620px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Thêm phân công chủ nhiệm
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-5" style="margin-bottom: 100px">
        <OwnClassTeacherNewForm ref="form" :state="dialog" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn outlined class="grey--text" @click="cancel">HUỶ</v-btn>
        <v-btn color="primary" @click="save">LƯU</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import OwnClassTeacherNewForm from '@/components/basic/form/OwnClassTeacherNewForm'
import { mapActions } from 'vuex'
export default {
  components: {
    OwnClassTeacherNewForm
  },
  props: {
    state: Boolean,
    teacher: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions('ownClassTeacher', ['updateClass']),
    async save() {
      try {
        const data = this.$refs.form.getData()
        if (!data) return
        this.$loading.active = true
        const { classData, teacher } = data
        var headTeachers = JSON.parse(JSON.stringify(classData.headTeachers))
        headTeachers.unshift(teacher)

        await this.updateClass({ id: classData.id, headTeachers })
        this.$alert.success('Cập nhật thành công')
        this.dialog = false
        this.$emit('done')
      } catch (error) {
        this.$alert.updateError()
        this.$loading.active = false
      }
    },
    cancel() {
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
