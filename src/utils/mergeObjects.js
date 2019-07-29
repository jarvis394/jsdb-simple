module.exports = (original, given) => {
  if (!given) return original

  for (const key in original) {
    if (!Object.prototype.hasOwnProperty.call(given, original) || !given[key]) {
      given[key] = original[key]
    } else if (given[key] === Object(given[key])) {
      given[key] = module.exports(original[key], given[key])
    }
  }

  return given
}
