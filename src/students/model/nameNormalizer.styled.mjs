export const normalizeName = name =>
  formatName(processName(name))

const processName = name =>
  extractNameParts(splitWithSuffix(normalizeWhitespace(name)))

const normalizeWhitespace = name =>
  name.trim().replace(/\s+/g, ' ')

const splitWithSuffix = name => {
  const parts = name.split(/\s*,\s*/)
  return parts.length > 1
    ? { names: parts[0].split(' '), suffix: parts.slice(1).join(', ') }
    : { names: name.split(' '), suffix: null }
}

const extractNameParts = ({ names, suffix }) =>
  names.length === 1
    ? { first: names[0], middleInitials: '', last: '', suffix: null }
    : { first: names[0], middleInitials: extractMiddleInitials(names), last: names.at(-1), suffix }

const extractMiddleInitials = names =>
  names.slice(1, -1).map(name => shouldInitialize(name) ? `${name[0]}.` : name).join(' ')

const shouldInitialize = name =>
  !(name.length === 1 || (name.length === 2 && name.endsWith('.')))

const getInitial = name =>
  `${name[0]}.`

const formatName = ({ first, middleInitials, last, suffix }) =>
  last
    ? formatFullName(first, middleInitials, last, suffix)
    : first // mononym case

const formatFullName = (first, middleInitials, last, suffix) => {
  const baseName = middleInitials ? `${last}, ${first} ${middleInitials}` : `${last}, ${first}`
  return suffix ? `${baseName}, ${suffix}` : baseName
}
