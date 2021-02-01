<template>
  <v-dialog v-model="dialog" width="360px">
    <v-card>
      <v-card-title class="headline primary lighten-1 white--text">
        Cài đặt
      </v-card-title>
      <v-card-text class="pa-4">
        <v-autocomplete
          class="mt-4"
          :items="subjects"
          v-model="subject"
          item-text="title"
          item-value="id"
          label="Môn"
          outlined
          return-object
          dense
          single-line
          clearable
        />
        <v-autocomplete
          :items="teachers"
          v-model="teacher"
          item-text="name"
          item-value="id"
          return-object
          label="Giáo viên"
          outlined
          dense
          single-line
          clearable
        />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" small @click="save">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { get } from 'lodash'
export default {
  data() {
    return {
      subject: {},
      teacher: {},
      dialog: false
    }
  },
  props: {
    slotData: Object,
    state: Boolean,
    classData: Object
  },
  computed: {
    ...mapGetters('search', ['teachers', 'subjects'])
  },
  created() {
    if (!this.slotData) return
    this.subject = this.slotData.subject
    this.teacher = this.slotData.teacher
  },
  methods: {
    ...mapActions('classDetail', ['createSlot', 'updateSlot']),
    async save() {
      this.loading = true
      if (!this.slotData.id) {
        await this.createSlot({
          ...this.slotData,
          class: get(this, 'classData.id'),
          subject: get(this, 'subject.id'),
          teacher: get(this, 'teacher.id')
        })
      } else {
        console.log({
          subject: get(this, 'subject.id'),
          teacher: get(this, 'teacher.id')
        })
        await this.updateSlot({
          id: this.slotData.id,
          subject: get(this, 'subject.id'),
          teacher: get(this, 'teacher.id')
        })
      }
      // await this.updateClass({ id: this.classData.id, schedule: this.slots })
      this.$alert.success('Cập nhật thành công')
      this.loading = false
      this.dialog = false
    },
    cancel() {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open() {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close() {}
  },
  filters: {
    getTeacher(slotData) {
      return get(slotData, 'teacher.name')
    },
    getSubject(slotData) {
      return get(slotData, 'subject.title')
    }
  },
  watch: {
    state() {
      this.dialog = true
      this.subject = get(this.slotData, 'subject')
      this.teacher = get(this.slotData, 'teacher')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep td div {
  height: 100%;
  background-color: red;
}
</style>
