<template>
  <div ref="form" class="pa-2">
    <v-data-table :headers="headers" :items="configs">
      <template v-slot:item.action="{ item }">
        <v-btn small icon @click="onClickEditIcon(item)">
          <v-icon small>edit</v-icon>
        </v-btn>
      </template>
      <template v-slot:body.append>
        <tr style="border: none">
          <td colspan="100%">
            <v-btn small text @click="add">
              <v-icon class="mr-2">add</v-icon>
              <span>Thêm cấu hình điẻm</span>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="confirm.isOpen" max-width="548">
      <v-card>
        <v-toolbar color="#0D47A1" dense class="elevation-0" dark>
          <v-toolbar-title>Sửa điểm</v-toolbar-title>
          <v-spacer />
          <v-btn icon dark @click="confirm.isOpen = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text v-if="confirm.currentItem" class="pa-5">
          <v-text-field v-model="confirm.currentItem.title" :rules="titleRules" label="Tiêu đề" required></v-text-field>
          <v-text-field
            v-model="confirm.currentItem.multiplier"
            :rules="multiplierRules"
            type="number"
            label="Hệ số điểm"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirm.currentItem.minimum"
            :rules="minimumRules"
            type="number"
            label="Số Điểm Tối Thiểu"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-spacer />
          <v-btn color="primary" text @click="confirm.isOpen = false">Hủy</v-btn>
          <v-btn color="primary" @click="confirm.callback">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { get, cloneDeep } from 'lodash'
export default {
  data() {
    return {
      configs: [],
      headers: [
        {
          text: 'Tiêu đề',
          value: 'title'
        },
        {
          text: 'Hệ số điểm',
          value: 'multiplier',
          align: 'right'
        },
        {
          text: 'Điểm tối thiểu',
          value: 'minimum',
          align: 'right'
        },
        {
          text: 'Sửa điểm',
          value: 'action',
          align: 'center'
        }
      ],
      confirm: {
        isOpen: false,
        currentItem: null,
        callback: () => {}
      },
      defaultconfig: [
        {
          title: 'Kiểm Tra Miệng',
          multiplier: 1,
          minimum: 0,
          code: 1
        },
        {
          title: 'Kiểm tra 1 Tiết',
          multiplier: 2,
          minimum: 0,
          code: 2
        },
        {
          title: 'Kiểm tra 15 phút',
          multiplier: 1,
          minimum: 0,
          code: 6
        },
        {
          title: 'Thi Cuối Kỳ',
          multiplier: 3,
          minimum: 4,
          code: 3
        },
        {
          title: 'Dự án',
          multiplier: 3,
          minimum: 4,
          code: 4
        }
      ],
      titleRules: [v => !!v || 'Tiêu đề bắt buộc', v => v.length <= 15 || 'Tiêu đề phải nhỏ hơn 15 ký tự'],
      multiplierRules: [
        v => !!v || 'Hệ số điểm bắt buộc',
        v => parseInt(v) > 0 || 'Hệ số phải là số tự nhiên lớn hơn 0'
      ],
      minimumRules: [v => parseInt(v) < 10 || 'Hệ số phải là số tự nhiên nhỏ hơn 10']
    }
  },
  props: {
    course: Object
  },
  methods: {
    getData() {
      return this.configs.map(c => ({
        ...c,
        minimum: parseInt(c.minimum),
        multiplier: parseInt(c.multiplier)
      }))
    },
    reset() {
      this.configs = get(this.course, 'mark', [])
      if (!this.configs.length) {
        this.configs = this.defaultconfig
      }
    },
    remove(code) {
      this.configs = this.configs.filter(c => c.code !== code)
    },
    add() {
      this.configs.push({
        title: 'Tên đầu Điểm',
        multiplier: 1,
        minimum: 0,
        code: new Date().getTime()
      })
    },
    onClickEditIcon(item) {
      this.confirm.isOpen = true
      this.confirm.currentItem = cloneDeep(item)
      this.confirm.callback = () => {
        Object.assign(item, this.confirm.currentItem)
        this.confirm.currentItem = null
        this.confirm.isOpen = false
        this.$emit('change')
      }
    }
  },
  created() {
    this.reset()
  },
  watch: {
    course() {
      this.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .theme--light.v-data-table .v-data-footer {
    border: none;
  }
}
</style>
