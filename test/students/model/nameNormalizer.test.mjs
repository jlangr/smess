import { normalizeName as normalizeNameUnstyled } from '../../../src/students/model/nameNormalizer.unstyled.mjs'
import { normalizeName as normalizeNameStyled } from '../../../src/students/model/nameNormalizer.styled.mjs'

const funcs = [['styled', normalizeNameStyled], ['unstyled', normalizeNameUnstyled]]

funcs.forEach(([description, normalizeName]) => {

  describe('normalizeName', () => {
    beforeEach(() => console.log(description))
    it('handles mononyms', () => {
      expect(normalizeName('Plato')).toBe('Plato')
    })

    it('handles duonyms', () => {
      expect(normalizeName('Clarence Ellis')).toBe('Ellis, Clarence')
    })

    it('trims spaces', () => {
      expect(normalizeName(' \n\n  Alan  \n\t\r\v\fMathison  Turing  ')).toBe('Turing, Alan M.')
    })

    it('initializes a single middle name', () => {
      expect(normalizeName('Donald Ervin Knuth')).toBe('Knuth, Donald E.')
    })

    it('initializes multiple middle names', () => {
      expect(normalizeName('Grace Brewster Murray Hopper')).toBe('Hopper, Grace B. M.')
    })

    it('retains suffixes', () => {
      expect(normalizeName('Martin Luther King, Jr.')).toBe('King, Martin L., Jr.')
    })
  })
})
