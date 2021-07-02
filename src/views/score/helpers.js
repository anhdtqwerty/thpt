import { get } from 'lodash'

export const mapPropObj = obj => fn => {
  const newObj = {}
  for (let key in obj) {
    newObj[key] = fn(obj[key])
  }
  return newObj
}
export const evaluateAvgMark = marks => {
  let markNumber = 0
  let sumMark = 0
  marks.forEach(mark => {
    markNumber += mark.multiply
    sumMark += mark.multiply * mark.value
  })
  const avg = sumMark / markNumber
  return Math.floor(avg * 100) / 100
}

export const toggle = (onValue, offValue) => value => {
  if (value !== onValue && value !== offValue) throw new Error('Can not toggle')
  return value === onValue ? offValue : onValue
}

export const getMultiplePath = paths => obj => paths.map(path => get(obj, path))

export const pipe = (...fns) => x => fns.reduce((f, g) => g(f), x)

export const trace = label => value => {
  console.log(`${label}: `, value)
  return value
}
