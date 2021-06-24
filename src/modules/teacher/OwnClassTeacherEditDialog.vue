<template>
  <v-dialog v-model="dialog" width="620px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Sửa phân công chủ nhiệm
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-5">
        <div>
          <p class="mb-0">Lớp</p>
          <p>{{ ownClass | _get('title') }}</p>
        </div>

        <div>
          <span>Giáo viên chủ nhiệm hiện tại</span
          ><v-icon v-if="selectedTeacher" small color="red" @click="$emit('deleteState')">close</v-icon>
        </div>
        <v-form ref="form">
          <v-row>
            <v-col cols="5" class="d-flex justify-start align-center">
              <p class="mb-0" v-if="!selectedTeacher">Chưa có phân công</p>
              <CardTeacherName v-else :teacher="selectedTeacher" class="mr-0" />
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
                  label="Giáo viên mới"
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
import { mapActions } from 'vuex'
import { map } from 'lodash'

export default {
  components: {
    CardTeacherName,
    AutocompleteTeacherCard
  },
  props: {
    state: Boolean,
    selectedTeacher: Object,
    ownClass: Object
  },
  data() {
    return {
      dialog: false,
      loading: false,
      teacher: {},
      rules: [
        value => {
          return (
            !this.ownClass ||
            !value ||
            !map(this.ownClass.headTeachers, 'id').includes(value.id) ||
            'Giáo viên này đã được phân công chủ nhiệm cho lớp trên'
          )
        }
      ]
    }
  },
  computed: {},

  methods: {
    ...mapActions('ownClassTeacher', ['updateClass']),
    async save() {
      try {
        if (!this.$refs.form.validate()) {
          return
        }
        this.$loading.active = true
        var headTeachers = JSON.parse(JSON.stringify(this.ownClass.headTeachers))
        if (this.selectedTeacher) {
          const index = headTeachers.findIndex(item => item.id === this.selectedTeacher.id)
          headTeachers.splice(index, 1, this.teacher)
        } else {
          headTeachers.push(this.teacher)
        }
        await this.updateClass({ id: this.ownClass.id, headTeachers })
        this.$alert.success('Cập nhật thành công')
        this.dialog = false
        this.$emit('done')
      } catch (error) {
        this.$alert.updateError()
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
    selectedTeacher(selectedTeacher) {
      this.teacher = selectedTeacher
      this.$refs.form && this.$refs.form.reset()
    }
  }
}
</script>
