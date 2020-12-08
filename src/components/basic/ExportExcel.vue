<template>
  <v-list-item class="export-excel" @click="clickHandler" :loading="isFetching">Export excel</v-list-item>
</template>

<script>
import { APIRespository } from '@/plugins/api'
import { saveAs } from 'file-saver'
import { parse } from 'json2csv'
export default {
  props: {
    api: {
      type: String,
      default: ''
    },
    itemPerRequest: {
      type: Number,
      default: 100
    },
    customHeader: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      apiRepository: null,
      totalItem: 0,
      items: [],
      isFetching: false
    }
  },
  mounted () {
    this.createAPIRespository()
  },
  methods: {
    createAPIRespository () {
      if (!this.api) {
        return
      }
      this.apiRepository = APIRespository(this.api)
    },
    async clickHandler () {
      await this.getTotalItem()
      this.getItems(0, this.export)
    },
    async getTotalItem () {
      this.totalItem = await this.apiRepository.count()
    },
    getItems (start, onSuccess) {
      this.isFetching = true
      if (this.items.length === this.totalItem) {
        this.isFetching = false
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(this.items)
        }
        return
      }
      this.apiRepository.fetch({
        '_start': start,
        '_limit': this.itemPerRequest
      })
        .then((data) => {
          this.items = this.items.concat(data)
          this.getItems(start += this.itemPerRequest, onSuccess)
        })
        .catch((err) => {
          this.isFetching = false
          console.error(err)
        })
    },
    export (items) {
      try {
        const header = this.customHeader.length > 0 ? this.customHeader.map(item => item.text) : Object.keys(items[0])
        const headerValues = this.customHeader.length > 0 ? this.customHeader.map(item => item.value) : Object.keys(items[0])
        const collectedItems = items.map(item => {
          const newItem = {}
          headerValues.forEach(field => {
            newItem[field] = item[field]
          })
          return newItem
        })
        const csv = parse(collectedItems, {
          header: false,
          fields: headerValues
        })

        const csvFile = new Blob([header.join(',') + '\n' + csv], { type: 'text/csv' })
        saveAs(csvFile, `export-excel.csv`)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>
.export-excel {
  cursor: pointer;
}
</style>
