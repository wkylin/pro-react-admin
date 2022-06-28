const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
module.exports = delay
