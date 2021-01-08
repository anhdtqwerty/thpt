<template>
  <v-edit-dialog @save="save" @cancel="cancel" @open="open" @close="close">
    <div style="display: block; position:relative">
      <span v-if="data" class="primary--text subtitle-1">
        {{ data | getSubject }}</span
      >
      <br />
      <span v-if="data" class="primary--text caption">
        {{ data | getTeacher }}</span
      >
      <div
        v-if="!data"
        style="position: absolute; width: 100%; height: 100; background-color: red; top: 0; left: 0 "
      ></div>
    </div>
    <template v-slot:input>
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
        @change="save"
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
        @change="save"
      />
    </template>
  </v-edit-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
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
    data: Object
  },
  computed: {
    ...mapGetters('search', ['teachers', 'subjects'])
  },
  created() {
    if (!this.data) return
    this.subject = this.data.subject
    this.teacher = this.data.teacher
  },
  methods: {
    save() {
      this.$emit('update:data', {
        subject: {
          title: get(this.subject, 'title'),
          id: get(this.subject, 'id')
        },
        teacher: {
          name: get(this.teacher, 'name'),
          id: get(this.teacher, 'id')
        }
      })
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
    getTeacher(data) {
      return get(data, 'teacher.name')
    },
    getSubject(data) {
      return get(data, 'subject.title')
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
