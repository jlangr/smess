export const normalizeName = name =>
  name
    |> trimName
    |> handleSuffix
    |> splitName
    |> initializeMiddleNames
    |> formatParsedName

const trimName = str =>
  str.trim().replace(/\s+/g, ' ')

const handleSuffix = str => {
  const [namePart, suffix] = str.split(',')
  return { name: namePart, suffix: suffix ? suffix.trim() : '' }
}

const splitName = ({ name, suffix }) => {
  const parts = name.split(' ')
  return {
    first: parts[0] || '',
    middle: parts.slice(1, -1),
    last: parts.length > 1 ? parts[parts.length - 1] : '',
    suffix
  }
}

const initializeMiddleNames = parsed =>
  ({
    ...parsed,
    middle: parsed.middle.map(n => n.length === 1 ? n : `${n[0]}.`)
  })

const formatParsedName = ({ first, middle, last, suffix }) =>
  !last
    ? first
    : `${last}, ${first}${middle.length ? ' ' + middle.join(' ') : ''}${suffix ? ', ' + suffix : ''}`
