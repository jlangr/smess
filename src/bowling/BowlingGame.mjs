export default class BowlingGame {
  constructor() {
    this.rolls = []
  }

  addRoll(pins) {
    this.rolls.push(pins)
  }

  scoreGame() {
    return scoreFrames(this.rolls)
  }
}

const scoreFrames = rolls =>
  Array.from({ length: 10 }).reduce(
    ([score, i]) =>
      isStrike(rolls, i)
        ? [score + strikeScore(rolls, i), i + 1]
        : isSpare(rolls, i)
          ? [score + spareScore(rolls, i), i + 2]
          : [score + frameScore(rolls, i), i + 2],
    [0, 0]
  )[0]

const rollAt = (rolls, i) =>
  rolls[i] ?? 0

const isStrike = (rolls, i) =>
  rollAt(rolls, i) === 10

const isSpare = (rolls, i) =>
  rollAt(rolls, i) + rollAt(rolls, i + 1) === 10

const strikeScore = (rolls, i) =>
  10 + rollAt(rolls, i + 1) + rollAt(rolls, i + 2)

const spareScore = (rolls, i) =>
  10 + rollAt(rolls, i + 2)

const frameScore = (rolls, i) =>
  rollAt(rolls, i) + rollAt(rolls, i + 1)
