const isStrike = ([first]) => first === 10

const isSpare = ([first, second]) => first + second === 10

const scoreStrike = (frames, i) =>
  10 + getRoll(frames, i + 1, 0) + getRoll(frames, i + 1, 1)

const scoreSpare = (frames, i) =>
  10 + getRoll(frames, i + 1, 0)

const scoreNormal = ([first, second]) => first + second

const getRoll = (frames, i, j) =>
  frames[i]?.[j] ?? 0

const scoreFrame = (frames, i) =>
  isStrike(frames[i])
    ? scoreStrike(frames, i)
    : isSpare(frames[i])
      ? scoreSpare(frames, i)
      : scoreNormal(frames[i])

const flattenFrames = rolls =>
  rolls.reduce((acc, roll) => {
    if (acc.length < 9) return addFrame(acc, roll)
    return addToTenth(acc, roll)
  }, [])

const addFrame = (frames, roll) =>
  typeof roll === 'number'
    ? addRoll(frames, roll)
    : [...frames, roll]

const addRoll = (frames, roll) =>
  frames.length && frames.at(-1).length < 2
    ? [...frames.slice(0, -1), [...frames.at(-1), roll]]
    : [...frames, [roll]]

const addToTenth = (frames, roll) =>
  frames.length === 9
    ? [...frames, Array.isArray(roll) ? roll : [roll]]
    : [...frames.slice(0, -1), [...frames.at(-1), roll]]

export const scoreGame = (...rolls) =>
  flattenFrames(rolls)
    .slice(0, 10)
    .reduce((sum, _, i, frames) => sum + scoreFrame(frames, i), 0)
