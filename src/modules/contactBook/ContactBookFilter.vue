<template>
  <v-form>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="10">
        <v-row>
          <v-col md="4">
            <autocomplete-grade
              v-model="grade"
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              label="Khối"
              outlined
              dense
              deletable-chips
              hide-details
            />
          </v-col>
          <v-col md="4">
            <autocomplete-class
              v-model="classes"
              clear-icon="mdi-close"
              label="Lớp"
              :disabled="!grade"
              :filter="classFilter"
              clearable
              flat
              outlined
              dense
              return-object
              hide-details
            />
          </v-col>
          <v-col md="4">
            <v-text-field
              v-model="studentNameOrCode"
              label="Học sinh"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2"> </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12" xs="12" sm="12" md="10">
        <v-row>
          <v-col md="4">
            <v-select
              v-model="status"
              item-text="title"
              item-value="status"
              label="Trạng thái"
              :items="statuses"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col md="4">
            <v-text-field
              v-model="phone"
              label="Số điện thoại đăng ký"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col md="4">
            <div class="d-flex justify-space-between align-center pt-1">
              <v-checkbox
                class="mt-0"
                label="Sử dụng SMS"
                v-model="isSms"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="isApp"
                class="mt-0"
                label="Sử dụng APP"
                hide-details
              ></v-checkbox>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2">
        <v-btn height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
export default {
  components: { AutocompleteClass, AutocompleteGrade },
  data: () => ({
    studentNameOrCode: '',
    phone: '',
    classes: null,
    grade: null,
    isSms: false,
    isApp: false,
    status: '',
    statuses: [
      {
        title: 'Chưa cài đặt',
        status: 'inactive',
      },
      {
        title: 'Đã khoá',
        status: 'locked',
      },
      {
        title: 'Hoạt động',
        status: 'active',
      },
    ],
  }),
  computed: {
    classFilter() {
      return this.grade ? { grade: this.grade } : {}
    },
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        grade: this.grade,
        classes: this.classes,
        student: this.studentNameOrCode,
        status: this.status,
        phone: this.phone,
        isSms: this.isSms,
        isApp: this.isApp,
        _sort: 'updatedAt:desc',
      })
    },
  },
}
</script>
