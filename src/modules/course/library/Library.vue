<template>
  <v-card>
    <v-card-title>
      <v-btn color="primary" dark class="mb-2" @click="dialog = !dialog">Upload tài liệu</v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="desserts" :search="search">
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
    <upload-dialog :state="dialog"></upload-dialog>
  </v-card>
</template>

<script>
import UploadDialog from '@/modules/course/library/UploadDialog'
export default {
  components: { UploadDialog },
  data() {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Tên',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Phân loại', value: 'type' },
        { text: 'Bài học', value: 'fat' },
        { text: 'Dung lượng', value: 'carbs' },
        { text: 'Người Upload', value: 'carbs' },
        { text: 'Ngày tạo', value: 'carbs' },
        { text: 'actions', value: 'action' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          type: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          type: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          type: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          type: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          type: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          type: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          type: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          type: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          type: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          type: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  }
}
</script>
