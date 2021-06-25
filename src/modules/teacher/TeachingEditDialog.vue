<template>
  <v-dialog v-model="dialog" width="620px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Sửa phân công giảng dạy
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-5">
        <div class="d-flex">
          <div class="mr-10">
            <p class="mb-0">Lớp</p>
            <p class="font-weight-bold">{{ selectedTeaching | _get('class.title') }}</p>
          </div>
          <div>
            <p class="mb-0">Môn học</p>
            <p class="font-weight-bold">{{ selectedTeaching | _get('subject.title') }}</p>
          </div>
        </div>

        <div>
          <span>Giáo viên hiện tại</span
          ><v-icon v-if="selectedTeaching && selectedTeaching.teacher" small color="red" @click="$emit('deleteState')"
            >close</v-icon
          >
        </div>
        <v-form ref="form">
          <v-row>
            <v-col cols="5" class="d-flex justify-start align-center">
              <p class="mb-0" v-if="selectedTeaching && !selectedTeaching.teacher">Chưa có phân công</p>
              <CardTeacherName v-else :teacher="selectedTeaching && selectedTeaching.teacher" class="mr-0" />
            </v-col>
            <v-col cols="1" class="d-flex justify-center align-center">
              <v-icon large>mdi-arrow-right</v-icon>
            </v-col>
            <v-col cols="6" class="py-0 d-flex justify-center align-center mr-0">
              <div>
                <div style="height:22px" />
                <AutocompleteTeacherCard
                  ref="autoCompleteTeacherCard"
                  v-model="teacher"
                  label="Chọn giáo viên mới"
                  outlined
                  dense
                  :displayGender="true"
                  class="required"
                  required
                  :rules="[$rules.required, ...rules]"
                />
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-text>
        <div>
          <span style="color:red">*</span> Sau khi chuyển phần công giảng dạy, giáo viên cũ sẽ không thể theo dõi thông
          tin của lớp học cũng như không có quyền xử lý các thông tin liên quan đến lớp trong môn học tương ứng. Thay
          vào đó, giáo viên mới sẽ tiếp nhận các quyền nêu trên. Vui lòng chú ý khi thực hiện thao tác này.
        </div>
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
import CardTeacherName from '@/components/basic/card/CardTeacherName.vue'
import AutocompleteTeacherCard from '@/components/basic/input/AutocompleteTeacherCard.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    CardTeacherName,
    AutocompleteTeacherCard
  },
  props: {
    state: Boolean,
    selectedTeaching: Object
  },
  data() {
    return {
      dialog: false,
      teacher: {},
      rules: [
        value => {
          if (!this.selectedTeaching || !this.teachings || !value) {
            return true
          }
          const subjectId = this.selectedTeaching.subject.id
          const classId = this.selectedTeaching.class.id
          return (
            !this.teachings.find(
              t => t.teacher && t.teacher.id === value.id && t.subject.id === subjectId && t.class.id === classId
            ) || 'Giáo viên này đã được phân công vào lớp trên'
          )
        }
      ]
    }
  },
  computed: {
    ...mapState('teaching', ['teachings']),
    ...mapGetters('app', ['commonQuery'])
  },

  methods: {
    ...mapActions('teaching', ['updateTeaching', 'createTeaching']),
    async save() {
      try {
        if (!this.$refs.form.validate()) {
          return
        }
        this.$loading.active = true
        if (this.selectedTeaching.id) {
          await this.updateTeaching({ id: this.selectedTeaching.id, teacher: this.teacher })
        } else {
          await this.createTeaching({ ...this.selectedTeaching, teacher: this.teacher, ...this.commonQuery })
        }
        this.$alert.success('Cập nhật thành công')
        this.dialog = false
        this.$emit('done')
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    },
    refeshAutoCompleteTeacher() {
      this.$refs.autoCompleteTeacherCard.fetchAllTeachers()
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.$refs.form && this.$refs.form.reset()
      this.dialog = true
    },
    selectedTeaching(selectedTeaching) {
      this.$refs.form && this.$refs.form.reset()
    }
  }
}
</script>
