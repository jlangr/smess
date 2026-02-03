const normalizeName = name =>
  isBlank(name)
    ? ''
    : reattachSuffix(
      formatNameParts(
        splitName(stripWhitespace(name))
      )
    )

const isBlank = s => s.trim().length === 0

const stripWhitespace = s => s.trim().replace(/\s+/g, ' ')

const splitName = name =>
  name.includes(',')
    ? splitWithSuffix(name)
    : [name, null]

const splitWithSuffix = name => {
  const [base, ...rest] = name.split(',')
  return [base, rest.join(',').trim()]
}

const formatNameParts = ([base, suffix]) =>
  attachSuffix(
    normalizeParts(base.split(' ')),
    suffix
  )

const normalizeParts = parts =>
  parts.length === 1
    ? parts[0]
    : formatFull(parts)

const formatFull = parts => {
  const [first, ...rest] = parts
  const last = rest.pop()
  const initials = rest.map(formatInitial).join(' ')
  return [last, ',', first, initials].filter(Boolean).join(' ')
}

const formatInitial = part =>
  part.length === 1 ? part : `${part[0]}.`

const attachSuffix = (normalized, suffix) =>
  suffix ? `${normalized}, ${suffix}` : normalized



describe('normalizeName', () => {
  it('returns empty string when input is empty', () => {
    expect(normalizeName('')).toBe('')
  })

  it('returns name unchanged for mononym', () => {
    expect(normalizeName('Plato')).toBe('Plato')
  })

  it('strips extra spaces', () => {
    expect(normalizeName('  Fadi Khoury \n\t\r')).toBe('Khoury, Fadi')
  })

  it('initializes middle name with period', () => {
    expect(normalizeName('Jeffrey John Langr')).toBe('Langr, Jeffrey J.')
  })

  it('preserves one-letter middle name without period', () => {
    expect(normalizeName('Harry S Truman')).toBe('Truman, Harry S')
  })

  it('handles multiple middle names', () => {
    expect(normalizeName('George Herbert Walker Bush')).toBe('Bush, George H. W.')
  })

  it('reattaches suffix after normalization', () => {
    expect(normalizeName('Martin Luther King, Jr.')).toBe('King, Martin L., Jr.')
  })
})
