const randomcode =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const maxIndex = 61
const minIndex = 0

module.exports = (shortenURL_Length) => {
  let result = ''

  for (let i = 0; i < shortenURL_Length; i++) {
    const randomIndex = Math.floor(
      Math.random() * (maxIndex - minIndex + 1) + minIndex
    )
    const chooseChar = randomcode[randomIndex]
    result = result + chooseChar
  }

  return result
}
