<template>
  <v-card class="mt-4 pa-4" elevation="0" outlined>
    <v-form>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="10">
          <v-row>
            <v-col md="4">
              <v-select
                v-model="senderMethod"
                :items="senderMethods"
                clear-icon="mdi-close"
                item-text="title"
                item-value="value"
                label="Hình thức gửi tin"
                outlined
                dense
                clearable
                hide-details
              />
            </v-col>
            <v-col md="4">
              <DateIOSPicker
                label="Từ ngày"
                outlined
                dense
                hide-details
                outline
                :date.sync="dateFrom"
                @onEnterPress="onFilterChanged"
              />
            </v-col>
            <v-col md="4">
              <DateIOSPicker
                label="Đến ngày"
                outlined
                dense
                hide-details
                outline
                :date.sync="dateTo"
                @onEnterPress="onFilterChanged"
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
                v-model="postType"
                item-text="title"
                item-value="value"
                label="Dạng tin"
                :items="postTypes"
                outlined
                clearable
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="content"
                label="Nội dung tin"
                return-object
                clearable
                flat
                outlined
                dense
                hide-details
                @keyup.enter="onFilterChanged"
              />
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
  </v-card>
</template>

<script>
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker'
import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/plugins/utils'

export default {
  components: { DateIOSPicker },
  data: () => ({
    dateFrom: '',
    dateTo: '',
    content: '',
    postType: '',
    senderMethod: '',
    senderMethods: [
      {
        title: 'APP',
        value: 'app'
      },
      {
        title: 'SMS',
        value: 'sms'
      }
    ]
  }),
  computed: {
    ...mapGetters('constant', ['postTypes'])
  },
  methods: {
    onFilterChanged() {
      let dateDataGte = ''
      let dateDataLte = ''
      if (this.dateFrom && this.dateTo) {
        dateDataGte = moment(this.dateFrom)
          .startOf('day')
          .toISOString()
        dateDataLte = moment(this.dateTo)
          .endOf('day')
          .toISOString()
      } else if (this.dateFrom) {
        dateDataGte = moment(this.dateFrom)
          .startOf('day')
          .toISOString()
        dateDataLte = moment().toISOString()
      } else if (this.dateTo) {
        dateDataLte = moment(this.dateTo)
          .endOf('day')
          .toISOString()
      }

      const params = {
        createdAt_gte: dateDataGte,
        createdAt_lte: dateDataLte,
        postType: this.postType,
        senderMethod: this.senderMethod,
        'post.keywords_contains': utils.clearUnicode(this.content)
      }

      this.$emit('onFilterChanged', { ...params })
    }
  }
}
</script>
