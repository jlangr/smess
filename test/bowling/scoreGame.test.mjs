import { scoreGame } from '../../src/bowling/scoreGame.mjs'

describe('scoreGame', () => {
  it('two rolls both gutter', () => {
    expect(scoreGame(0, 0)).toBe(0)
  })

  it('two rolls no mark', () => {
    expect(scoreGame(6, 3)).toBe(9)
  })

  it('two frames no mark', () => {
    expect(scoreGame(5, 4, 7, 1)).toBe(17)
  })

  it('spare', () => {
    expect(scoreGame([3, 7], 4)).toBe(18)
  })

  it('full frame after spare', () => {
    expect(scoreGame([7, 3], [3, 2])).toBe(18)
  })

  it('simple strike', () => {
    expect(scoreGame([10], [3, 6])).toBe(28)
  })

  it('perfect game', () => {
    expect(scoreGame(
      [10], [10], [10], [10], [10],
      [10], [10], [10], [10], [10, 10, 10]
    )).toBe(300)
  })

  it('extra ball in 10th frame after spare', () => {
    expect(scoreGame(
      [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
      [0, 0], [0, 0], [0, 0], [0, 0], [3, 7, 10]
    )).toBe(20)
  })

  it('sample game', () => {
    expect(scoreGame(
      [1, 4], [4, 5], [6, 4], [5, 5], [10],
      [0, 1], [7, 3], [6, 4], [10], [2, 8, 6]
    )).toBe(133)
  })

  it('all but last ball', () => {
    expect(scoreGame(
      [10], [10], [10], [10], [10],
      [10], [10], [10], [10], [10, 10, 9]
    )).toBe(299)
  })

  it('tenth frame spare', () => {
    expect(scoreGame(
      [10], [10], [10], [10], [10],
      [10], [10], [10], [10], [9, 1, 2]
    )).toBe(272)
  })
})
