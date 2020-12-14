<template>
    <page-layout page-title="Nhập điểm" class="input-score-page">
        <v-card>
             <v-card-text class="px-5">
               <div class="text-right">
                 <setting-table-header
                  :default-headers="originHeaders"
                  @change="headers = $event"
                />
                <KebapMenu v-if="!$vuetify.breakpoint.xs">
                  <v-list>
                    <v-list-item >
                      <export-excel :custom-header="headers" api="/classes/" />
                    </v-list-item>
                  </v-list>
                </KebapMenu>
               </div>
                 <v-row>
                    <v-col cols="12">
                      <v-row class="basic-filter">
                        <v-col cols="12" md="4">
                          <v-text-field
                          filled
                          :placeholder="filterInputs.className.label"
                          v-model="filterInputs.className.value"
                          append-icon="mdi-magnify"
                          dense
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                          filled
                          :placeholder="filterInputs.subject.label"
                          :items="filterInputs.subject.items"
                          dense
                        />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                          filled
                          :placeholder="filterInputs.factor.label"
                          :items="filterInputs.subject.items"
                          dense
                        />
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-btn color="primary" style="width: 100%">Tìm kiếm</v-btn>
                        </v-col>
                      </v-row>
                        <div class="text-right font-weight-medium" style="cursor: pointer" @click="onChangeFilterMode">
                          <span class="primary--text">{{ this.filterOptions[this.filterMode].label }}</span>
                          <v-icon color="primary">{{ this.filterOptions[this.filterMode].icon }}</v-icon>
                        </div>
                    </v-col>
                </v-row>

                <v-data-table
                  :headers="headers"
                  :items="items"
                  :loading="loading"
                >
                </v-data-table>
            </v-card-text>
        </v-card>
    </page-layout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import ExportExcel from '@/components/basic/ExportExcel'
import KebapMenu from '@/components/basic/menu/KebapMenu.vue'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  components: {
    PageLayout,
    SettingTableHeader,
    KebapMenu,
    ExportExcel,
  },
  data () {
    return {
      filterMode: 'normal',
      filterOptions: {
        normal: {
          label: 'Tìm kiếm nâng cao',
          icon: 'mdi-chevron-down'
        },
        advanced: {
          label: 'Ẩn tìm kiếm nâng cao',
          icon: 'mdi-chevron-up'
        }
      },
      filterInputs: {
        className: {
          label: 'Lớp học',
          value: '',
          placeholder: 'Nhập điểm để tìm kiếm',
        },
        subject: {
          label: 'Môn học',
          value: '',
          items: []
        },
        factor: {
          label: 'Đầu điểm',
          value: '',
          items: []
        }
      },
      originHeaders: [
        { text: 'STT', value: 'order', align: 'left', sortable: false, show: true },
        { text: 'Họ và tên', value: 'fullName', align: 'left', sortable: false, show: true },
        { text: 'Ngày sinh', value: 'dateOfBirth', align: 'left', sortable: false, show: true },
        { text: 'Điểm miệng', value: 'mark', align: 'left', sortable: false, show: true },
      ],
      headers: [],
      totalClass: 0,
      options: {},
      loading: false,
      filterQuery: {},
      items: []
    }
  },
  computed: {

  },
  watch: {
    filterInputs: {
      handler (data) {
        this.excutefilter(data)
      },
      deep: true
    }
  },
  methods: {
    debounce: _.debounce,
    onChangeFilterMode () {
      if (this.filterMode === 'normal') {
        this.filterMode = 'advanced'
      } else {
        this.filterMode = 'normal'
      }
    },
    onClickFilterButton () {
      const filterData = this.$refs['filter'].getFormData()
      console.log(filterData)
    },
    excutefilter: _.debounce((data) => {
      const className = _.get(data, 'className.value')
      const subject = _.get(data, 'subject.value')
      const factor = _.get(data, 'factor.value')
      console.log(className, subject, factor)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
</style>
