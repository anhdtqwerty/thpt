<template>
  <div>
    <v-card class="d-flex elevation-0 flex-column justify-center mx-8 pa-4">
      <p class="font-weight-bold">Danh sách học sinh không đủ điều kiện lên lớp</p>

      <div style="overflow-y: scroll; max-height: 400px">
        <v-card outlined flat>
          <v-data-table
            mobile-breakpoint="0"
            item-key="id"
            :headers="headers"
            :items="filteredClasses"
            :items-per-page="-1"
            hide-default-footer
          >
            <template slot="no-data">
              <div>Không có học sinh</div>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <v-card-actions class="pa-0">
        <v-spacer />
        <v-btn @click="done" depressed color="primary" class="px-6 mt-4  white--text">Tiếp tục</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Học sinh',
          value: 'student',
          align: 'left',
          sortable: false
        },
        {
          text: 'Lớp',
          value: 'currentClass.title',
          align: 'left',
          sortable: false
        },
        {
          text: 'Ghi chú',
          value: 'note',
          align: 'left',
          sortable: false
        },
        {
          text: 'Thao tác',
          value: 'actions',
          align: 'left',
          sortable: false
        }
      ],
      editDialog: false,
      selectedItem: {},
      filteredClasses: []
    }
  },
  async created() {
    // await this.refresh({})
  },
  computed: {
    ...mapGetters('Generation', ['classes'])
  },
  methods: {
    ...mapActions('Generation', ['fetchClasses']),
    async refresh(params) {},

    done() {
      this.$emit('approveStudentClass')
    }
  }
}
</script>

<style lang="scss" scoped></style>
