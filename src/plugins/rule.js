import moment from 'moment'
import { isEmpty } from 'lodash'

export const inputRules = {
  required: v => (!!v && (typeof v !== 'string' || !!v.trim())) || v === 0 || 'Trường này là bắt buộc',
  maxLength: length => v => (v && v.length <= length) || !v || `Tối đa ${length} ký tự`,
  minLength: length => v => (v && v.length >= length) || !v || `Tối thiểu ${length} ký tự`,
  max: number => v => (isEmptyString(v) || isEmptyString(number) || v <= number) || `Phải nhỏ hơn hoặc bằng ${number}`,
  min: number => v => (isEmptyString(v) || isEmptyString(number) || v >= number) || `Phải lớn hơn hoặc bằng ${number}`,
  email: v => (v && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v.trim())) || !v || 'Invalid email address',
  url: v => /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(v) || !v || 'Invalid URL',
  alphabet: v => !v || /^[a-z ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]+$/gi.test(v.trim()) || 'Contain a-z only',
  normal: v => !v || /^[a-z0-9 ._ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]+$/gi.test(v.trim()) || 'Contains invalid character',
  equal: (target, msg) => v => !v || target === v || msg || `Must be equal to ${target}`,
  phone: v => !v || (v.length >= 10 && /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/gi.test(v)) || 'Số điện thoại không hợp lệ',
  nospace: v => !v || !/ /.test(v) || 'Không được chứa khoảng trắng',
  notEmpty: v => !Array.isArray(v) || !!v.length || 'Required',
  date: v => moment(v, 'DD/MM/YYYY', true).isValid() || 'Ngày không hợp lệ',
  yearNotRequired: v => isEmpty(v) || moment(v, 'YYYY', true).isValid() || 'Năm không hợp lệ',
  dateFromNow: v => moment().isAfter(moment(v, 'DDMMYYYY').toISOString()) || 'Không nhập ngày tương lai',
  markInput: v => !v || (parseFloat(v) >= 0 && parseFloat(v) <= 10) || 'Điểm phải trong khoảng từ 0 đến 10',
  vnPhone: v => !v || (v.length >= 10 && /(0[3|5|7|8|9])+([0-9]{8})\b/gi.test(v)) || 'Số điện thoại không hợp lệ'
}
function isEmptyString(value) {
  return value == null || value === ''
}
