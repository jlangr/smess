export const normalizeName = (name) => {
  console.log('unstyled')
  if (!name.trim()) return ''

  const [main, suffix] = name.split(',').map(part => part.trim())
  const parts = main.split(/\s+/).filter(Boolean)

  if (parts.length === 1) return parts[0]

  const [first, ...middles] = parts
  const last = middles.pop()
  const initials = middles.map(m => `${m[0]}.`).join(' ')

  return [last + ',', first, initials, suffix].filter(Boolean).join(' ')
}
