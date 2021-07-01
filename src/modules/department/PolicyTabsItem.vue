<template>
  <div class="permission-setting">
    <div v-if="action.state === 'select'" class="permission-setting__selecting-board pa-5">
      <div class="permission-setting__title">Chọn loại phân quyền</div>
      <v-row>
        <v-col cols="6" md="3">
          <v-card @click="onClickCard('student')">
            <img :src="images.StudentSettingImage" alt="student-setting" />
            <v-card-title>Cài đặt học sinh</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card @click="onClickCard('class')">
            <img :src="images.ClassSettingImage" alt="class-setting" />
            <v-card-title>Cài đặt lớp học</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card @click="onClickCard('teacher')">
            <img :src="images.TeacherSettingImage" alt="teacher-setting" />
            <v-card-title>Cài đặt giáo viên</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card @click="onClickCard('staff')">
            <img :src="images.StaffSettingImage" alt="staff-setting" />
            <v-card-title>Cài đặt nhân viên</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="action.state !== 'select'" class="permission-setting__form-view pa-5">
      <v-flex xs12 sm3>
        <v-select
          :items="roles"
          :value="role"
          label="Chọn Role Muốn Phân Quyền"
          item-value="id"
          item-text="description"
          return-object
          @change="changeRole"
        ></v-select>
      </v-flex>
      <component
        :is="action.options[action.state]"
        :input="policy"
        :role="role || {}"
        @cancel="action.state = 'select'"
        @save="save"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'
import ClassPolicy from '@/modules/policy/ClassPolicyForm'
import StudentPolicy from '@/modules/policy/StudentPolicyForm'
import TeacherPolicy from '@/modules/policy/TeacherPolicyForm'
import StaffPolicy from '@/modules/policy/StaffPolicyForm'
import StudentSettingImage from '@/assets/student-setting.png'
import ClassSettingImage from '@/assets/class-setting.png'
import TeacherSettingImage from '@/assets/teacher-setting.png'
import StaffSettingImage from '@/assets/staff-setting.png'
export default {
  components: {
    ClassPolicy,
    TeacherPolicy,
    StudentPolicy,
    StaffPolicy
  },
  props: {
    department: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      images: {
        StudentSettingImage,
        ClassSettingImage,
        TeacherSettingImage,
        StaffSettingImage
      },
      action: {
        state: 'select',
        options: {
          select: null,
          studentForm: StudentPolicy,
          classForm: ClassPolicy,
          staffForm: StaffPolicy,
          teacherForm: TeacherPolicy
        }
      },
      policy: {},
      tab: null,
      description: ''
    }
  },
  async created() {
    await this.fetchRoles()
    this.changeRole(this.roles[0])
  },
  computed: {
    ...mapGetters('role', ['role', 'roles'])
  },
  methods: {
    ...mapActions('role', ['fetchRoles', 'setRole']),
    save(policy) {
      let data = {}
      data[this.role.id] = policy
      this.$emit('save', {
        ...this.department,
        policies: {
          ...this.department.policies,
          ...data
        }
      })
    },
    cancel() {
      this.name = this.department.title
      this.description = this.department.description
      this.metadata = this.department.metadata
      this.$emit('cancel')
    },
    reset() {},
    changeRole(role) {
      this.setRole(role)
      this.policy = get(this.department, 'policies.' + role.id)
    },
    onClickCard(nameState) {
      switch (nameState) {
        case 'student': {
          this.action.state = 'studentForm'
          break
        }
        case 'class': {
          this.action.state = 'classForm'
          break
        }
        case 'staff': {
          this.action.state = 'staffForm'
          break
        }
        case 'teacher': {
          this.action.state = 'teacherForm'
          break
        }
        default: {
          this.aciton.state = 'select'
        }
      }
    }
  },
  watch: {
    department(department) {
      this.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
.permission-setting__title {
  padding: 20px 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #212121;
  margin-bottom: 20px;
}
.v-card {
  cursor: pointer;
  img {
    max-width: 100%;
  }
}
.v-card__title {
  font-size: 14px;
  line-height: 16px;
  color: #212121;
}
</style>
