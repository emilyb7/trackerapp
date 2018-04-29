const validateLength = isbn => isbn.length === 13

const validateChars = isbn => !/[^0-9]/.test(isbn)

const validateStart = isbn => isbn.startsWith('978')

// reference: https://en.wikipedia.org/wiki/International_Standard_Book_Number
const validateSequence = isbn => {
  const sum = isbn
    .split('')
    .slice(0, 12)
    .map((n, i) => parseInt(n, 10) * (i % 2 === 0 ? 1 : 3))
    .reduce((a, b) => a + b)

  const mod = sum % 10
  const checkDigit = parseInt(isbn[12], 10)
  return (mod === 0 ? 0 : 10 - mod) === checkDigit
}

const validator = (
  isbn,
  fns = [ validateLength, validateChars, validateStart, validateSequence, ]
) => {
  if (fns.length === 0) return true
  if (fns[0](isbn) === false) {
    console.log(isbn, fns[0].name) // eslint-disable-line no-console
    return false
  }
  return validator(isbn, fns.slice(1))
}

export default validator
