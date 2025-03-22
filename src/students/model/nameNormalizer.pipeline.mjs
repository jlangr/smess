export const normalizeName = name =>
  name
    |> trimName
    |> splitName
    |> initializeMiddleNames
    |> formatParsedName

const trimName = str =>
  str.trim().replace(/\s+/g, ' ')

const splitName = str => {
  const parts = str.split(' ')
  return {
    first: parts[0] || '',
    middle: parts.slice(1, -1),
    last: parts.length > 1 ? parts[parts.length - 1] : ''
  }
}

const initializeMiddleNames = parsed =>
  ({
    ...parsed,
    middle: parsed.middle.map(n => `${n[0]}.`)
  })

const formatParsedName = ({ first, middle, last }) =>
  !last
    ? first
    : `${last}, ${first}${middle.length ? ' ' + middle.join(' ') : ''}`
