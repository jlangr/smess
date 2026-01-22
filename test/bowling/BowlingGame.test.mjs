import BowlingGame from '../../src/bowling/BowlingGame.mjs'

const rollMany = (game, rolls) =>
  rolls.forEach(r => game.addRoll(r))

describe('BowlingGame scoring', () => {
  it('two rolls both gutter', () => {
    const game = new BowlingGame()
    rollMany(game, [0, 0])
    expect(game.scoreGame()).toBe(0)
  })

  it('two rolls no mark', () => {
    const game = new BowlingGame()
    rollMany(game, [6, 3])
    expect(game.scoreGame()).toBe(9)
  })

  it('two frames no mark', () => {
    const game = new BowlingGame()
    rollMany(game, [5, 4, 7, 1])
    expect(game.scoreGame()).toBe(17)
  })

  it('spare', () => {
    const game = new BowlingGame()
    rollMany(game, [3, 7, 4])
    expect(game.scoreGame()).toBe(18)
  })

  it('full frame after spare', () => {
    const game = new BowlingGame()
    rollMany(game, [7, 3, 3, 2])
    expect(game.scoreGame()).toBe(18)
  })

  it('simple strike', () => {
    const game = new BowlingGame()
    rollMany(game, [10, 3, 6])
    expect(game.scoreGame()).toBe(28)
  })

  it('perfect game', () => {
    const game = new BowlingGame()
    rollMany(game, Array(12).fill(10))
    expect(game.scoreGame()).toBe(300)
  })

  it('extra ball in 10th frame after spare', () => {
    const game = new BowlingGame()
    rollMany(game, [
      0,0, 0,0, 0,0, 0,0, 0,0,
      0,0, 0,0, 0,0, 0,0, 3,7,10
    ])
    expect(game.scoreGame()).toBe(20)
  })

  it('sample game', () => {
    const game = new BowlingGame()
    rollMany(game, [
      1,4, 4,5, 6,4, 5,5, 10,
      0,1, 7,3, 6,4, 10, 2,8,6
    ])
    expect(game.scoreGame()).toBe(133)
  })

  it('all but last ball', () => {
    const game = new BowlingGame()
    rollMany(game, [
      10,10,10,10,10,10,10,10,10,10,10,9
    ])
    expect(game.scoreGame()).toBe(299)
  })

  it('tenth frame spare', () => {
    const game = new BowlingGame()
    rollMany(game, [
      10,10,10,10,10,10,10,10,10,9,1,2
    ])
    expect(game.scoreGame()).toBe(272)
  })
})
