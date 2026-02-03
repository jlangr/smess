describe('doubleAlpha', () => {
  it('doubles letters within single word', () => {
    expect(doubleAlpha('abc')).toBe('aabbcc')
  })

  it('doubles letters within each word', () => {
    expect(doubleAlpha('xy ab')).toBe('xxyy aabb')
  })

  it('does not double non alphabetic characters', () => {
    expect(doubleAlpha('x6y')).toBe('xx6yy')
  })
})

export const doubleAlpha = input =>
  input
    .split(' ')
    .map(doubleLetters)
    .join(' ')

const doubleLetters = word =>
  [...word]
    .map(doubleIfAlpha)
    .join('')

const doubleIfAlpha = char =>
  isAlpha(char) ? `${char}${char}` : char

const isAlpha = char =>
  /^[a-zA-Z]$/.test(char)
