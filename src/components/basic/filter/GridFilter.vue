<template>
  <v-form class="grid-form" v-model="valid">
    <v-row>
        <template v-if="inputs.length > 0">
        <v-col v-for="(input, index) in inputs" :key="index" cols="12" :md="evalWidthCol(colNumber, input.span)">
          <component class="ma-0" :is="input.tag" v-bind="input.props" v-model="input.data[input.key]" />
        </v-col>
        </template>
        <v-col v-if="!hideAction" style="display: flex; align-items: center" cols="12" :md="evalWidthCol(colNumber, 1)">
          <slot name="action">
            <v-btn style="width: 100%" color="primary">
              <v-icon>mdi-filter</v-icon>
              <span>Lọc</span>
            </v-btn>
          </slot>
        </v-col>
      </v-row>
  </v-form>
</template>

<script>
/**
 * Props Meta sample
 * {
 * title: 'Form title',
        inputs: [
          {
            type: 'text',
            config: {
              key: 'text',
              label: 'Text input',
              defaultValue: '',
              rules: ['required'],
              span: 2
            }
          },
          {
            type: 'dropdown',
            config: {
              key: 'dropdown',
              label: 'Dropdown input',
              defaultValue: [],
              rules: [],
              items: ['Foo', 'Bar', 'Fizz', 'Buzz']
            }
          },
          {
            type: 'checkbox',
            config: {
              key: 'dropdown',
              label: 'Dropdown input',
              defaultValue: 'jonh',
              rules: []
            }
          }
        ]
 * }
 */
export default {
  props: {
    colNumber: {
      type: [String, Number],
      default: 1
    },
    hideDetails: {
      type: Boolean,
      default: true
    },
    meta: {
      type: Object,
      default () {
        return {
          title: '',
          inputs: []
        }
      }
    },
    hideAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valid: false,
      inputs: [],
      inputTypes: {
        text: {
          tag: 'v-text-field',
          props: {
            filled: true,
            dense: true
          }
        },
        dropdown: {
          tag: 'v-select',
          props: {
            filled: true,
            dense: true
          }
        },
        checkbox: {
          tag: 'v-checkbox',
          props: {}
        }
      }
    }
  },
  watch: {
    meta: {
      handler (val) {
        if (val.length === 0) {
          this.inputs = []
        } else {
          this.inputs = val.inputs
            .map(item => {
              const compInfo = JSON.parse(JSON.stringify(this.inputTypes[item.type]))

              if (item.config.items) {
                compInfo.props.itemText = item.config.itemText || 'text'
                compInfo.props.itemValue = item.config.itemValue || 'value'
                compInfo.props.items = item.config.items
              }
              if (item.config.rules) compInfo.props.rules = item.config.rules.map(this.convertRule).filter(this.ruleIsFunction)
              if (item.config.label) compInfo.props.label = item.config.label
              compInfo.props.hideDetails = this.hideDetails

              const { tag, props } = compInfo
              return {
                tag,
                props,
                span: item.config.span || 1,
                key: item.config.key,
                data: {
                  [item.config.key]: item.config.defaultValue
                }
              }
            })
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    formData () {
      if (this.inputs.length === 0) return {}
      return this.inputs.reduce((acc, input) => Object.assign(acc, input.data), {})
    }
  },
  methods: {
    ruleIsFunction (rule) {
      return typeof rule === 'function'
    },
    convertRule (ruleValue) {
      if (typeof ruleValue === 'string') return this.$rules[ruleValue]
      if (typeof ruleValue === 'function') return ruleValue
      return undefined
    },
    evalWidthCol (colNumber, span = 1) {
      if (colNumber === 0) return 12
      if (span < colNumber) {
        return (12 / colNumber) * span
      }
      return 12
    },
    getFormData () {
      return this.formData
    },
    onClickFilter () {
      this.$emit('filter')
    }
  }
}
</script>

<style>

</style>
