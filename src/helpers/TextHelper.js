export const textHelpers = {
  removeSpaces(str) {
    return (str || '').trim().replace(/\s+/g, ' ')
  },
  getNumber(str) {
    return (str || '').trim().replace(/[^0-9]/g, '')
  },
  getLastName(str) {
    return (str || '')
      .split(' ')
      .slice(-1)
      .join(' ')
  }
}
