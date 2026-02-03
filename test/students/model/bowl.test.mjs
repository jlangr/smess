
// newer
const maxFrames = 10

export const createGame = () => {
  const rolls = []

  const add = pins => rolls.push(pins)

  const score = () =>
    scoreUpToFrame(rolls, maxFrames)

  const scoreForFrame = frame =>
    scoreUpToFrame(rolls, frame)

  return { add, score, scoreForFrame }
}

const scoreUpToFrame = (rolls, target) =>
  walkFrames(rolls, target, 0, 0)

const walkFrames = (rolls, framesLeft, index, total) =>
  framesLeft === 0 || index >= rolls.length
    ? total
    : walkFrames(
      rolls,
      framesLeft - 1,
      nextIndex(rolls, index),
      total + frameScore(rolls, index)
    )

const frameScore = (rolls, index) =>
  isStrike(rolls, index)
    ? 10 + bonus(rolls, index + 1, 2)
    : isSpare(rolls, index)
      ? 10 + bonus(rolls, index + 2, 1)
      : bonus(rolls, index, 2)

const nextIndex = (rolls, index) =>
  isStrike(rolls, index) ? index + 1 : index + 2

const bonus = (rolls, index, count) =>
  rolls.slice(index, index + count).reduce((a, b) => a + b, 0)

const isStrike = (rolls, index) =>
  rolls[index] === 10

const isSpare = (rolls, index) =>
  bonus(rolls, index, 2) === 10

// tests

const addMany = (game, pins, times) =>
  Array.from({ length: times }).forEach(() => game.add(pins))

describe('Game scoring', () => {
  it('two normal throws', () => {
    const g = createGame()
    g.add(5)
    g.add(4)
    expect(g.score()).toBe(9)
  })

  it('four normal throws', () => {
    const g = createGame()
    g.add(5)
    g.add(4)
    g.add(7)
    g.add(2)
    expect(g.score()).toBe(18)
    expect(g.scoreForFrame(1)).toBe(9)
    expect(g.scoreForFrame(2)).toBe(18)
  })

  it('simple spare', () => {
    const g = createGame()
    g.add(3)
    g.add(7)
    g.add(3)
    expect(g.scoreForFrame(1)).toBe(13)
  })

  it('frame after spare', () => {
    const g = createGame()
    g.add(3)
    g.add(7)
    g.add(3)
    g.add(2)
    expect(g.scoreForFrame(1)).toBe(13)
    expect(g.scoreForFrame(2)).toBe(18)
    expect(g.score()).toBe(18)
  })

  it('simple strike', () => {
    const g = createGame()
    g.add(10)
    g.add(3)
    g.add(6)
    expect(g.scoreForFrame(1)).toBe(19)
    expect(g.score()).toBe(28)
  })

  it('perfect game', () => {
    const g = createGame()
    addMany(g, 10, 12)
    expect(g.score()).toBe(300)
  })

  it('end of array', () => {
    const g = createGame()
    Array.from({ length: 9 }).forEach(() => {
      g.add(0)
      g.add(0)
    })
    g.add(2)
    g.add(8)
    g.add(10)
    expect(g.score()).toBe(20)
  })

  it('sample game', () => {
    const g = createGame()
    const rolls = [
      1, 4, 4, 5, 6, 4, 5, 5, 10,
      0, 1, 7, 3, 6, 4, 10, 2, 8, 6
    ]
    rolls.forEach(g.add)
    expect(g.score()).toBe(133)
  })

  it('heartbreak', () => {
    const g = createGame()
    addMany(g, 10, 11)
    g.add(9)
    expect(g.score()).toBe(299)
  })

  it('tenth frame spare', () => {
    const g = createGame()
    addMany(g, 10, 9)
    g.add(9)
    g.add(1)
    g.add(1)
    expect(g.score()).toBe(270)
  })
})
