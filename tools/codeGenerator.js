function codeGenerator() {
  const collection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortCode = ""
  for (let i = 0; i < 5; i++) {
    shortCode += sample(collection)
  }
  return shortCode
}

function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = codeGenerator