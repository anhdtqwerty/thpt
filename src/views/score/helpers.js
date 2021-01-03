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
