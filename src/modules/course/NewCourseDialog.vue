<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn small v-on="on" color="primary"> <v-icon>add</v-icon>Thêm </v-btn>
    </template>
    <v-card>
      <v-toolbar dense class="elevation-0" color="#0D47A1" dark>
        <v-toolbar-title>Tạo Mới Môn Học</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-text-field
          :rules="[rules.required]"
          v-model="title"
          outlined
          dense
          label="Tên Khóa Học"
          placeholder="Nhập tên Khóa Học"
        ></v-text-field>
        <v-text-field
          :rules="[rules.required]"
          v-model="code"
          outlined
          dense
          label="Mã Khóa Học"
          placeholder="Nhập mã khóa học"
        ></v-text-field>
        <v-text-field
          :rules="[rules.required]"
          v-model="description"
          dense
          outlined
          label="Mô Tả Khóa Học"
          placeholder="Nhập mô tả mã khóa học"
        ></v-text-field>
        <v-select
          :items="statusList"
          label="Trạng Thái"
          item-value="value"
          item-text="text"
          v-model="status"
          dense
          outlined
        ></v-select>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" smalls @click="save" depressed>Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      title: '',
      description: '',
      code: '',
      statusList: [
        { text: 'Khóa', value: 'private' },
        { text: 'Mở', value: 'public' }
      ],
      status: 'public',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 8 characters'
      }
    }
  },
  props: {
    major: Object,
    selected: { type: Array, default: () => [] }
  },
  computed: {
    ...mapState('app', ['roles', 'department'])
  },
  methods: {
    ...mapActions('course', ['createCourse']),
    save() {
      this.createCourse({
        title: this.title,
        description: this.description,
        code: this.code,
        status: this.status,
        department: this.department.id,
        factor: 1,
        mark: [
          {
            title: 'Kiểm Tra số 1',
            multiplier: 1,
            minimum: 0,
            code: 1
          },
          {
            title: 'Kiểm Tra số 2',
            multiplier: 1,
            minimum: 0,
            code: 1
          }
        ]
      })
      this.dialog = false
      this.reset()
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    reset() {
      this.title = ''
      this.code = ''
      this.description = ''
      this.status = 'public'
    }
  }
}
</script>
