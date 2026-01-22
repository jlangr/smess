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
  Array.from({ length: 10 })
    .reduce(
      ([score, rollIndex]) =>
        isStrike(rolls, rollIndex)
          ? [score + strikeScore(rolls, rollIndex), rollIndex + 1]
          : isSpare(rolls, rollIndex)
            ? [score + spareScore(rolls, rollIndex), rollIndex + 2]
            : [score + frameScore(rolls, rollIndex), rollIndex + 2],
      [0, 0]
    )[0]

const isStrike = (rolls, i) =>
  rolls[i] === 10

const isSpare = (rolls, i) =>
  rolls[i] + rolls[i + 1] === 10

const strikeScore = (rolls, i) =>
  10 + rolls[i + 1] + rolls[i + 2]

const spareScore = (rolls, i) =>
  10 + rolls[i + 2]

const frameScore = (rolls, i) =>
  rolls[i] + rolls[i + 1]
