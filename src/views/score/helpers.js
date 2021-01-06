export const mapPropObj = obj => fn => {
  const newObj = {}
  for (let key in obj) {
    newObj[key] = fn(obj[key])
  }
  return newObj
}
export const accumulateMark = marks => {
  return marks.reduce((acc, item) => {
    const { mark, ...info } = item
    return { ...info, marks: [...acc.marks, mark] }
  }, { marks: [] })
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
